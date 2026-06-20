import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "@/data/profile";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot field — bots fill it, humans don't */
  company?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: ContactPayload) {
  const errors: string[] = [];
  if (!body.name || body.name.trim().length < 2)
    errors.push("Name is required.");
  if (!body.email || !emailRegex.test(body.email))
    errors.push("A valid email is required.");
  if (!body.message || body.message.trim().length < 10)
    errors.push("Message must be at least 10 characters.");
  return errors;
}

/**
 * Builds a Nodemailer transport.
 * - In production set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS.
 * - In dev with no SMTP config, falls back to an Ethereal test inbox and
 *   logs a preview URL to the server console.
 */
async function getTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept to avoid tipping off bots.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  try {
    const transport = await getTransport();
    const to = process.env.CONTACT_TO ?? profile.email;
    const subject = body.subject?.trim()
      ? `Portfolio contact: ${body.subject.trim()}`
      : "New portfolio contact message";

    const info = await transport.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER ?? "no-reply@portfolio.dev"}>`,
      to,
      replyTo: `${body.name} <${body.email}>`,
      subject,
      text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(body.name!)} &lt;${escapeHtml(body.email!)}&gt;</p>
        ${body.subject ? `<p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>` : ""}
        <p style="white-space:pre-wrap">${escapeHtml(body.message!)}</p>
      `,
    });

    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log("📨 Contact email preview:", preview);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please email me directly." },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
