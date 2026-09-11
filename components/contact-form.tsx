"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[320px] flex-col items-center justify-center text-center"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground">
          <Check className="h-4 w-4" />
        </div>
        <h3 className="mt-4 text-base font-semibold">Message sent</h3>
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll reply from {" "}
          <span className="whitespace-nowrap">shehryarwebdev@gmail.com</span>.
        </p>
        <Button variant="outline" size="sm" className="mt-5" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <p className="label mb-5">Send a message</p>

      {/* Honeypot — hidden from humans, catches naive bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
          Subject <span className="font-normal text-faint">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          placeholder="Backend role at…"
          className={inputClasses}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="A little about the role or the problem you're working on…"
          className={`${inputClasses} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
