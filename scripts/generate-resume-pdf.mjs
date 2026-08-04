import { writeFileSync } from "node:fs";

const resume = {
  name: "Shehryar",
  title: "Full Stack Developer | Blockchain & AI Product Engineer",
  contact:
    "shehryarwebdev@gmail.com | +92 311 1404107 | Remote, Available worldwide | github.com/shehryar-web-dev | linkedin.com/in/shehryar-naeem-831691213",
  summary:
    "Full-stack developer with 3+ years of experience building modern frontend, backend, and blockchain-based product experiences. Skilled in React, Next.js, TypeScript, Node.js, NestJS, REST APIs, wallet authentication, Web3 integrations, and responsive UI systems. Strong focus on shipping production-ready dashboards, dApps, marketplaces, loyalty systems, staking workflows, and AI-assisted product features.",
  experience: [
    {
      role: "Full Stack Developer",
      company: "Weiblocks",
      period: "2023 - 2026",
      bullets: [
        "Worked on blockchain-based web applications across frontend, backend, API integration, wallet flows, and production-ready product interfaces.",
        "Built responsive dashboards and dApp screens using React, Next.js, TypeScript, Tailwind CSS, and modern component patterns.",
        "Integrated backend services, REST APIs, authentication flows, and Web3 functionality for staking, rewards, marketplace, and loyalty products.",
        "Collaborated with product and backend teams to turn requirements into scalable full-stack features.",
      ],
    },
    {
      role: "Frontend Developer Intern",
      company: "Excellence Code Solution",
      period: "2023 - 2 months",
      bullets: [
        "Completed a two-month frontend development internship focused on building responsive web interfaces.",
        "Practiced React, JavaScript, HTML, CSS, and component-based UI development through real project tasks.",
        "Worked with senior developers to improve page layouts, fix UI issues, and understand production frontend workflows.",
      ],
    },
  ],
  projects: [
    {
      name: "TWQ",
      summary:
        "Event-driven cryptocurrency analytics platform for Solana traders with wallet authentication, market analytics, rug checks, GPT-4 insights, and personalized Telegram alerts.",
      bullets: [
        "Built responsive market dashboard interfaces and user preference management.",
        "Integrated CoinGecko and Birdeye APIs plus Phantom, Solflare, MetaMask, and WalletConnect flows.",
        "Implemented contract risk analysis including liquidity and holder distribution checks.",
      ],
    },
    {
      name: "FinTrust",
      summary:
        "Full-stack decentralized staking and rewards platform on Solana with token purchases, staking tiers, cashback, referrals, KYC-enabled ICO participation, and admin controls.",
      bullets: [
        "Developed staking, rewards, transaction history, and reward visualization interfaces.",
        "Connected frontend workflows with backend APIs and Solana smart contract interactions.",
      ],
    },
    {
      name: "NFC Loyalty System",
      summary:
        "Customer loyalty platform using NFC check-ins, NFT rewards, membership tiers, mobile app flows, merchant dashboards, admin dashboard, and backend services.",
      bullets: [
        "Built merchant/admin dashboard interfaces, REST API integrations, Privy wallet authentication, NFT minting flows, and tier upgrade experiences.",
      ],
    },
    // {
    //   name: "Flyverr",
    //   summary:
    //     "Digital marketplace for limited downloadable products with creator selling tools, licensing-aware resale flows, dashboards, reviews, analytics, and payments.",
    //   bullets: [
    //     "Implemented marketplace, product detail, dashboard, profile, authentication, and responsive UI screens using Next.js, TypeScript, Tailwind CSS, ShadCN UI, and Axios.",
    //   ],
    // },
  ],
  skills: [
    "Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, ShadCN UI, Framer Motion, Redux, Zustand",
    "Backend: Node.js, Express.js, NestJS, REST APIs, Prisma, PostgreSQL, MongoDB, Redis, BullMQ",
    "Blockchain: Solana, Web3, Wallet Adapter, WalletConnect, Phantom, Solflare, MetaMask, Anchor, SPL Token, Metaplex NFT, Privy",
    "AI & Tools: OpenAI API, GPT-4, RAG concepts, Docker, Git, AWS, Vite, Supabase, Stripe",
  ],
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN_X = 48;
const TOP = 746;
const BOTTOM = 48;
const usableWidth = PAGE_WIDTH - MARGIN_X * 2;

const escapePdf = (value) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll("\r", "")
    .replaceAll("\n", " ");

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

class ResumePdf {
  constructor() {
    this.pages = [[]];
    this.y = TOP;
  }

  page() {
    return this.pages[this.pages.length - 1];
  }

  newPage() {
    this.pages.push([]);
    this.y = TOP;
  }

  ensure(space) {
    if (this.y - space < BOTTOM) this.newPage();
  }

  text(value, { x = MARGIN_X, size = 10, font = "regular", leading = size + 4 } = {}) {
    this.ensure(leading);
    const safe = escapePdf(value);
    const fontName = font === "bold" ? "F2" : "F1";
    this.page().push(`BT /${fontName} ${size} Tf ${x} ${this.y} Td (${safe}) Tj ET`);
    this.y -= leading;
  }

  rule() {
    this.ensure(8);
    this.page().push(`${MARGIN_X} ${this.y + 2} m ${PAGE_WIDTH - MARGIN_X} ${this.y + 2} l S`);
    this.y -= 10;
  }

  gap(value = 6) {
    this.y -= value;
  }

  section(title) {
    this.ensure(28);
    this.gap(3);
    this.text(title.toUpperCase(), { size: 10, font: "bold", leading: 12 });
    this.rule();
  }

  paragraph(text, options = {}) {
    const size = options.size ?? 9.5;
    const indent = options.indent ?? 0;
    const chars = Math.floor((usableWidth - indent) / (size * 0.48));
    for (const line of wrapText(text, chars)) {
      this.text(line, {
        x: MARGIN_X + indent,
        size,
        leading: options.leading ?? size + 3,
        font: options.font ?? "regular",
      });
    }
  }

  bullet(text, options = {}) {
    const size = options.size ?? 9.2;
    const indent = options.indent ?? 14;
    const chars = Math.floor((usableWidth - indent) / (size * 0.48));
    const lines = wrapText(text, chars);

    lines.forEach((line, index) => {
      this.text(`${index === 0 ? "- " : "  "}${line}`, {
        x: MARGIN_X + indent,
        size,
        leading: size + 3,
      });
    });
  }

  role(role, company, period) {
    this.ensure(34);
    this.text(`${role} - ${company}`, { size: 11, font: "bold", leading: 13 });
    this.text(period, { size: 9, font: "bold", leading: 12 });
  }
}

function buildContent() {
  const pdf = new ResumePdf();

  pdf.text(resume.name, { size: 24, font: "bold", leading: 28 });
  pdf.text(resume.title, { size: 11, font: "bold", leading: 15 });
  pdf.paragraph(resume.contact, { size: 8.6, leading: 11 });
  pdf.gap(3);

  pdf.section("Professional Summary");
  pdf.paragraph(resume.summary, { size: 9.4, leading: 12.6 });

  pdf.section("Experience");
  for (const item of resume.experience) {
    pdf.role(item.role, item.company, item.period);
    for (const bullet of item.bullets) pdf.bullet(bullet);
    pdf.gap(5);
  }

  pdf.section("Selected Projects");
  for (const project of resume.projects) {
    pdf.ensure(44);
    pdf.text(project.name, { size: 10.5, font: "bold", leading: 13 });
    pdf.paragraph(project.summary, { size: 9.1, leading: 12 });
    for (const bullet of project.bullets) pdf.bullet(bullet, { size: 8.9 });
    pdf.gap(4);
  }

  pdf.section("Technical Skills");
  for (const skill of resume.skills) {
    pdf.bullet(skill, { size: 8.9, indent: 0 });
  }

  return pdf.pages;
}

function makePdf(pages) {
  const objects = [];
  const add = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = add("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = add("");
  const fontRegularId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];

  for (const commands of pages) {
    const stream = commands.join("\n");
    const contentId = add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    const pageId = add(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  }

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let output = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(output));
    output += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(output);
  output += `xref\n0 ${objects.length + 1}\n`;
  output += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    output += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  output += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(output, "binary");
}

writeFileSync("public/resume.pdf", makePdf(buildContent()));
console.log("Generated public/resume.pdf");
