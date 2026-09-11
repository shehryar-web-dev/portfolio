import { writeFileSync } from "node:fs";

// ============================================================
// RESUME DATA
// ============================================================

const resume = {
  name: "Shehryar Naeem",

  title: "Full Stack Developer",

  location: "Lahore, Pakistan",

  contact:
    "+92 311 1404107  |  shehryarwebdev@gmail.com",

  links: {
    portfolio: "https://shehryar-web-dev.vercel.app/",
    github: "https://github.com/shehryar-web-dev/",
    linkedin: "https://www.linkedin.com/in/shehryar-naeem-831691213/",
  },

  summary:
    "Full Stack Developer with 3+ years of experience solving concrete production problems: acknowledging third-party webhook events within milliseconds so a slow downstream call never drops data, preventing duplicate or lost payments with a write-ahead-log disbursement engine on an at-least-once blockchain primitive, and fixing real authorization and data-integrity bugs left in existing codebases, such as an access-control guard silently rejecting every request to a public route. Comfortable owning a feature end-to-end, from redesigning how a system stores and serves data to building the frontend integration layer that consumes it, and has independently delivered multiple production systems from architecture through launch.",

  experience: [
    {
      role: "Full Stack Software Engineer",

      company: "Weiblocks",

      location: "Lahore, Pakistan (Remote)",

      period: "Jan 2023 - Present",

      bullets: [
        "Engineered and shipped 8 production full-stack systems across fintech, blockchain, AI, and social/marketplace domains using React, Next.js, TypeScript, Node.js, NestJS, and Solana/XRPL blockchain integrations.",
        "Architected event-driven, distributed backend pipelines (Redis Streams, BullMQ) that decouple latency-critical webhook ingestion from asynchronous processing, eliminating data loss from third-party API timeouts.",
        "Designed exactly-once transaction guarantees for financial and blockchain operations using write-ahead logs, conditional atomic database updates, and signature-derived idempotency keys.",
        "Implemented wallet-based cryptographic authentication (Ed25519 signature verification) and JWT/role-based authorization across multiple trust levels, removing stored passwords and enforcing server-verified access.",
        "Built and maintained REST APIs (150+ endpoints across 25+ NestJS/Express modules) backed by PostgreSQL, MongoDB, and Redis, with automated test coverage (239+ tests) and technical documentation.",
        "Authored 4 Solana Anchor/Rust smart contracts and integrated XRPL token rewards, and established a reusable frontend architecture (single HTTP client, typed service layer) adopted across multiple projects.",
      ],
    },

    {
      role: "Frontend Developer Intern",

      company: "Excellence Code Solution",

      location: "Lahore, Pakistan",

      period: "2023 - 2 Months",

      bullets: [
        "Built responsive user interfaces and reusable React components for production web applications.",
        "Collaborated with senior developers to refine layouts, resolve UI issues, and follow production development practices.",
      ],
    },
  ],

  projects: [
    {
      name: "TWQ",

      tech: "Node.js, Express, MongoDB, Redis, BullMQ, Next.js",

      summary:
        "Solo-built real-time Solana token intelligence platform with webhook ingestion, alerting, and AI-grounded trading insights across 8 external integrations.",

      bullets: [
        "Architected a two-process, event-driven pipeline (Redis Streams + BullMQ) that acknowledges webhook events in milliseconds, then processes them asynchronously with retry, backoff, and priority queues.",
        "Implemented passwordless Ed25519 wallet authentication and a technical-analysis engine (8 indicators computed from raw price data) with a rule-based AI fallback for continuous feature uptime.",
        "Established a single Next.js data-fetching boundary (one HTTP client, service-layer type conversion, volatility-tuned cache lifetimes) and designed alert filters that treat missing market data as \"skip this check\" rather than a rejection, so early-stage tokens are not silently filtered out.",
      ],
    },

    {
      name: "Dibzi",

      tech: "Node.js, Express, MongoDB, React Native, React",

      summary:
        "NFC-triggered on-chain loyalty platform enabling merchants to update already-issued rewards at zero blockchain cost.",

      bullets: [
        "Owned 90% of commits (237/264) across 4 codebases (API, mobile app, 2 dashboards) over a 6-month build; redesigned NFT metadata to be editable with no re-mint cost.",
        "Built a 3-tier, database-verified authorization system and authored a ranked defect audit (6 critical, 5 high, 12 medium) that drove real security and data-integrity fixes.",
        "Resolved a Node/browser dependency incompatibility that was blocking the admin dashboard build with a custom polyfill configuration, and migrated live check-in history across three schema formats with zero downtime and no data loss.",
      ],
    },

    {
      name: "FinTrust",

      tech: "NestJS, PostgreSQL/Prisma, Redis, Anchor (Rust)",

      summary:
        "Non-custodial Solana staking, rewards, and ICO platform backed by a custom Anchor smart contract and a 25-module NestJS backend.",

      bullets: [
        "Designed a write-ahead-log disbursement engine guaranteeing exactly-once on-chain token transfers, closing the double-pay/lost-pay failure class by construction.",
        "Built 157 REST endpoints over 37 Prisma models and a 2,430-line Anchor program (27 instructions), backed by 239 automated tests and a 34-flow manual QA runbook.",
        "Split every wallet-signed action into a prepare/confirm request pair so the database is only written after on-chain confirmation, and hardened reward-claim instructions by re-verifying every attacker-suppliable account on-chain.",
      ],
    },

    {
      name: "SocialFi Trading",

      tech: "NestJS, PostgreSQL, Anchor (Rust), React Native",

      summary:
        "Content-as-assets social trading platform pricing posts and comments on a Solana bonding curve, with a mobile app and admin console.",

      bullets: [
        "Migrated the trading engine from a custodial database ledger to a non-custodial, wallet-signed model, closing custodial fund risk and a stale-price slippage bug class.",
        "Authored 4 Rust/Anchor smart contracts and remediated 2 security weaknesses (plaintext secrets, a shared encryption key) with a migration path that did not disrupt existing users.",
        "Built a resilient mobile wallet-signing flow with ephemeral session keys that survive OS-level app suspension, and implemented a transactional-outbox notification pipeline so a trade event can never be recorded without also being delivered.",
      ],
    },

    {
      name: "Flyverr",

      tech: "Next.js, TypeScript, TanStack Query, Stripe Connect",

      summary:
        "Staged resale marketplace for digital products with multi-round pricing and Stripe Connect payouts.",

      bullets: [
        "Established the frontend's core architecture (auth context, route guards, typed API layer) from an empty scaffold, later extended by another engineer for unrelated features.",
        "Built a reusable Stripe-readiness HOC and shared admin table/pagination primitives, replacing per-screen readiness checks and one-off table implementations.",
        "Enforced route-level access control with a live, server-verified user query instead of a cached role flag, and built the admin moderation console (product approval with auto-suggested staged pricing) on shared table and pagination primitives.",
      ],
    },
  ],

  additionalProjects:
    "Additional Projects: Lindo Mart (internal operations platform - NestJS, MongoDB, React, Socket.IO; fixed 6 authorization and data-integrity defects), Mindful Oasis (XRPL wellness rewards platform - React, Node.js), and Social Locket (real-estate social marketplace - React, Stripe, PayPal, Web3Modal).",

  skills: [
    "Languages: JavaScript, TypeScript",
    "Frontend: React, Next.js, React Native, TanStack Query, Tailwind CSS",
    "Backend: Node.js, Express, NestJS, RESTful APIs, Socket.IO",
    "Databases: PostgreSQL (Prisma), MongoDB, Redis",
    "Blockchain: Solana (Web3.js, Anchor), XRPL, Wallet Auth, SPL Tokens, NFTs",
    "AI: OpenAI API, Prompt Engineering, AI-Powered Applications, RAG",
    "Architecture: Event-Driven Systems, Distributed Systems, Message Queues (BullMQ, Redis Streams)",
    "Cloud & DevOps: AWS (S3), Docker, Git/GitHub, Nginx, Jest (Automated Testing)",
  ],

  education: {
    university: "University of Education, Lahore",

    degree: "Bachelor's Degree - Information Technology",
  },
};


// ============================================================
// A4 PDF CONFIGURATION
// ============================================================

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

const MARGIN_X = 38;

const TOP = 812;
const BOTTOM = 22;

const usableWidth =
  PAGE_WIDTH - MARGIN_X * 2;


// ============================================================
// COLORS
// ============================================================

const PRIMARY_COLOR =
  "0.12 0.20 0.32";

const ACCENT_COLOR =
  "0.18 0.36 0.60";

const TEXT_COLOR =
  "0.15 0.15 0.15";

const MUTED_COLOR =
  "0.38 0.42 0.47";


// ============================================================
// HELPERS
// ============================================================

const escapePdf = (value) =>
  String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll("\r", "")
    .replaceAll("\n", "");


// ============================================================
// TEXT WRAPPING
// ============================================================

function wrapText(text, maxChars) {

  const words =
    text.split(/\s+/);

  const lines = [];

  let current = "";

  for (const word of words) {

    if (!current) {

      current = word;

    } else if (
      `${current} ${word}`.length <= maxChars
    ) {

      current += ` ${word}`;

    } else {

      lines.push(current);

      current = word;
    }
  }

  if (current) {

    lines.push(current);
  }

  return lines;
}


// ============================================================
// PDF RESUME CLASS
// ============================================================

class ResumePdf {

  constructor() {

    this.pages = [
      {
        commands: [],
        links: [],
      },
    ];

    this.y = TOP;
  }


  page() {

    return this.pages[
      this.pages.length - 1
    ];
  }


  commands() {

    return this.page().commands;
  }


  newPage() {

    this.pages.push({
      commands: [],
      links: [],
    });

    this.y = TOP;
  }


  ensure(space) {

    if (
      this.y - space < BOTTOM
    ) {

      this.newPage();
    }
  }


  gap(value = 3) {

    this.y -= value;
  }


  // ==========================================================
  // NORMAL TEXT
  // ==========================================================

  text(
    value,
    {
      x = MARGIN_X,
      size = 10,
      font = "regular",
      leading = size + 2.5,
      color = TEXT_COLOR,
    } = {},
  ) {

    this.ensure(leading);

    const safe =
      escapePdf(value);

    const fontName =
      font === "bold"
        ? "F2"
        : "F1";

    this.commands().push(
      `BT ` +
      `/${fontName} ${size} Tf ` +
      `${color} rg ` +
      `${x} ${this.y} Td ` +
      `(${safe}) Tj ` +
      `ET`,
    );

    this.y -= leading;
  }


  // ==========================================================
  // CENTERED TEXT
  // ==========================================================

  centeredText(
    value,
    {
      size = 10,
      font = "regular",
      leading = size + 2.5,
      color = TEXT_COLOR,
    } = {},
  ) {

    const estimatedWidth =
      String(value).length *
      size *
      0.50;

    const x =
      Math.max(
        MARGIN_X,
        (PAGE_WIDTH - estimatedWidth) / 2,
      );

    this.text(
      value,
      {
        x,
        size,
        font,
        leading,
        color,
      },
    );
  }


  // ==========================================================
  // RIGHT ALIGNED TEXT
  // ==========================================================

  rightText(
    value,
    {
      size = 9,
      font = "regular",
      color = MUTED_COLOR,
      right = PAGE_WIDTH - MARGIN_X,
    } = {},
  ) {

    const estimatedWidth =
      String(value).length *
      size *
      0.50;

    const x =
      right - estimatedWidth;

    const safe =
      escapePdf(value);

    const fontName =
      font === "bold"
        ? "F2"
        : "F1";

    this.commands().push(
      `BT ` +
      `/${fontName} ${size} Tf ` +
      `${color} rg ` +
      `${x} ${this.y} Td ` +
      `(${safe}) Tj ` +
      `ET`,
    );
  }


  // ==========================================================
  // CLICKABLE LINKS
  // ==========================================================

  linkRow(
    links,
    {
      size = 9.1,
      leading = 10.6,
      color = ACCENT_COLOR,
    } = {},
  ) {

    this.ensure(leading);

    const items = [
      {
        label: "Portfolio",
        url: links.portfolio,
      },
      {
        label: "GitHub",
        url: links.github,
      },
      {
        label: "LinkedIn",
        url: links.linkedin,
      },
    ];


    const separator =
      "  |  ";


    const separatorWidth =
      separator.length *
      size *
      0.50;


    const itemWidths =
      items.map(
        (item) =>
          item.label.length *
          size *
          0.50,
      );


    const totalWidth =
      itemWidths.reduce(
        (total, width) =>
          total + width,
        0,
      ) +
      separatorWidth *
      (items.length - 1);


    let x =
      (PAGE_WIDTH - totalWidth) / 2;


    const startY =
      this.y;


    items.forEach(
      (item, index) => {

        const width =
          itemWidths[index];


        // Display link text
        this.commands().push(
          `BT ` +
          `/F1 ${size} Tf ` +
          `${color} rg ` +
          `${x} ${startY} Td ` +
          `(${escapePdf(item.label)}) Tj ` +
          `ET`,
        );


        // Add clickable PDF area
        this.page().links.push({
          x,
          y: startY - 2,
          width,
          height: size + 4,
          url: item.url,
        });


        x += width;


        // Add separator
        if (
          index < items.length - 1
        ) {

          this.commands().push(
            `BT ` +
            `/F1 ${size} Tf ` +
            `${MUTED_COLOR} rg ` +
            `${x} ${startY} Td ` +
            `(${escapePdf(separator)}) Tj ` +
            `ET`,
          );

          x += separatorWidth;
        }
      },
    );


    this.y -= leading;
  }


  // ==========================================================
  // HORIZONTAL LINE
  // ==========================================================

  line(
    {
      y = this.y,
      width = 0.65,
      color = ACCENT_COLOR,
    } = {},
  ) {

    this.commands().push(
      `${color} RG ` +
      `${width} w ` +
      `${MARGIN_X} ${y} m ` +
      `${PAGE_WIDTH - MARGIN_X} ${y} l ` +
      `S`,
    );
  }


  // ==========================================================
  // SECTION HEADER
  // ==========================================================

  section(title) {

    this.ensure(38);

    this.gap(3);


    this.text(
      title.toUpperCase(),
      {
        size: 11.6,
        font: "bold",
        leading: 13,
        color: PRIMARY_COLOR,
      },
    );


    // Divider close to heading
    const lineY =
      this.y + 5.3;


    this.line({
      y: lineY,
      width: 0.7,
      color: ACCENT_COLOR,
    });


    // Gap between line and paragraph
    this.y =
      lineY - 11.5;
  }


  // ==========================================================
  // PARAGRAPH
  // ==========================================================

  paragraph(
    text,
    {
      size = 10,
      indent = 0,
      leading = 11.7,
      font = "regular",
      color = TEXT_COLOR,
    } = {},
  ) {

    const chars =
      Math.floor(
        (usableWidth - indent) /
        (size * 0.50),
      );

    const lines =
      wrapText(
        text,
        chars,
      );

    for (const line of lines) {

      this.text(
        line,
        {
          x:
            MARGIN_X + indent,

          size,
          leading,
          font,
          color,
        },
      );
    }
  }


  // ==========================================================
  // BULLET
  // ==========================================================

  bullet(
    text,
    {
      size = 9.4,
      indent = 13,
      leading = 10.9,
    } = {},
  ) {

    const chars =
      Math.floor(
        (usableWidth - indent - 10) /
        (size * 0.50),
      );

    const lines =
      wrapText(
        text,
        chars,
      );

    lines.forEach(
      (line, index) => {

        const prefix =
          index === 0
            ? "• "
            : "   ";

        this.text(
          `${prefix}${line}`,
          {
            x:
              MARGIN_X + indent,

            size,
            leading,
            color: TEXT_COLOR,
          },
        );
      },
    );
  }


  // ==========================================================
  // EXPERIENCE HEADER
  // ==========================================================

  role(
    role,
    company,
    period,
    location,
  ) {

    this.ensure(35);

    const startY =
      this.y;


    this.text(
      role,
      {
        size: 11.2,
        font: "bold",
        leading: 12.8,
        color: PRIMARY_COLOR,
      },
    );


    this.y =
      startY;

    this.rightText(
      period,
      {
        size: 9.1,
        color: MUTED_COLOR,
      },
    );


    this.y =
      startY - 14;

    this.text(
      company,
      {
        size: 9.9,
        font: "bold",
        leading: 11.3,
        color: ACCENT_COLOR,
      },
    );


    this.y =
      startY - 14;

    this.rightText(
      location,
      {
        size: 9,
        color: MUTED_COLOR,
      },
    );


    this.y =
      startY - 26.5;
  }


  // ==========================================================
  // PROJECT HEADER
  // ==========================================================

  projectHeader(
    name,
    tech,
  ) {

    this.ensure(25);

    const startY =
      this.y;


    this.text(
      name,
      {
        size: 10.9,
        font: "bold",
        leading: 12,
        color: PRIMARY_COLOR,
      },
    );


    this.y =
      startY;

    this.rightText(
      tech,
      {
        size: 8.8,
        color: MUTED_COLOR,
      },
    );


    this.y =
      startY - 12.8;
  }
}


// ============================================================
// BUILD PDF CONTENT
// ============================================================

function buildContent() {

  const pdf =
    new ResumePdf();


  // ==========================================================
  // HEADER
  // ==========================================================

  pdf.centeredText(
    resume.name,
    {
      size: 23,
      font: "bold",
      leading: 25.5,
      color: PRIMARY_COLOR,
    },
  );


  pdf.centeredText(
    resume.title,
    {
      size: 11.8,
      font: "bold",
      leading: 13.5,
      color: ACCENT_COLOR,
    },
  );


  pdf.centeredText(
    `${resume.location}  |  ${resume.contact}`,
    {
      size: 9.1,
      leading: 10.6,
      color: MUTED_COLOR,
    },
  );


  // ==========================================================
  // CLICKABLE PORTFOLIO / GITHUB / LINKEDIN
  // ==========================================================

  pdf.linkRow(
    resume.links,
    {
      size: 9.1,
      leading: 10.6,
      color: ACCENT_COLOR,
    },
  );


  pdf.gap(2);


  // ==========================================================
  // PROFESSIONAL SUMMARY
  // ==========================================================

  pdf.section(
    "Professional Summary",
  );


  pdf.paragraph(
    resume.summary,
    {
      size: 10,
      leading: 11.7,
    },
  );


  pdf.gap(1);


  // ==========================================================
  // TECHNICAL SKILLS
  // ==========================================================

  pdf.section(
    "Technical Skills",
  );


  for (
    const skill of resume.skills
  ) {

    pdf.paragraph(
      skill,
      {
        size: 9.5,
        leading: 10.9,
      },
    );

    pdf.gap(0.2);
  }


  // ==========================================================
  // PROFESSIONAL EXPERIENCE
  // ==========================================================

  pdf.section(
    "Professional Experience",
  );


  for (
    const item of resume.experience
  ) {

    pdf.role(
      item.role,
      item.company,
      item.period,
      item.location,
    );


    for (
      const bullet of item.bullets
    ) {

      pdf.bullet(
        bullet,
        {
          size: 9.4,
          leading: 10.9,
        },
      );

      pdf.gap(0.2);
    }


    pdf.gap(2);
  }


  // ==========================================================
  // KEY PROJECTS
  // ==========================================================

  pdf.section(
    "Key Projects",
  );


  for (
    const project of resume.projects
  ) {

    pdf.projectHeader(
      project.name,
      project.tech,
    );


    pdf.paragraph(
      project.summary,
      {
        size: 9.5,
        leading: 10.9,
      },
    );


    pdf.gap(0.3);


    for (
      const bullet of project.bullets
    ) {

      pdf.bullet(
        bullet,
        {
          size: 9.1,
          leading: 10.4,
        },
      );

      pdf.gap(0);
    }


    pdf.gap(1.6);
  }


  if (resume.additionalProjects) {

    pdf.paragraph(
      resume.additionalProjects,
      {
        size: 9.2,
        leading: 10.6,
      },
    );

    pdf.gap(2);
  }


  // ==========================================================
  // EDUCATION
  // ==========================================================

  pdf.section(
    "Education",
  );


  pdf.text(
    resume.education.university,
    {
      size: 10.6,
      font: "bold",
      leading: 11.8,
      color: PRIMARY_COLOR,
    },
  );


  pdf.text(
    resume.education.degree,
    {
      size: 9.4,
      leading: 10.6,
      color: MUTED_COLOR,
    },
  );


  return pdf.pages;
}


// ============================================================
// CREATE PDF
// ============================================================

function makePdf(pages) {

  const objects = [];


  const add = (content) => {

    objects.push(content);

    return objects.length;
  };


  const catalogId =
    add(
      "<< /Type /Catalog /Pages 2 0 R >>",
    );


  const pagesId =
    add("");


  const fontRegularId =
    add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    );


  const fontBoldId =
    add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    );


  const pageIds = [];


  for (
    const pageData of pages
  ) {

    const stream =
      pageData.commands.join("\n");


    const contentId =
      add(
        `<< /Length ${Buffer.byteLength(stream)} >>\n` +
        `stream\n` +
        `${stream}\n` +
        `endstream`,
      );


    // ========================================================
    // CREATE CLICKABLE LINK ANNOTATIONS
    // ========================================================

    const annotationIds = [];


    for (
      const link of pageData.links
    ) {

      const annotationId =
        add(
          `<< ` +
          `/Type /Annot ` +
          `/Subtype /Link ` +
          `/Rect [` +
          `${link.x} ` +
          `${link.y} ` +
          `${link.x + link.width} ` +
          `${link.y + link.height}` +
          `] ` +
          `/Border [0 0 0] ` +
          `/A << ` +
          `/S /URI ` +
          `/URI (${escapePdf(link.url)}) ` +
          `>> ` +
          `>>`,
        );


      annotationIds.push(
        annotationId,
      );
    }


    // ========================================================
    // ADD ANNOTATIONS TO PAGE
    // ========================================================

    const annotations =
      annotationIds.length > 0
        ? `/Annots [` +
          annotationIds
            .map(
              (id) =>
                `${id} 0 R`,
            )
            .join(" ") +
          `] `
        : "";


    const pageId =
      add(
        `<< ` +
        `/Type /Page ` +
        `/Parent ${pagesId} 0 R ` +
        `/MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +

        `/Resources << ` +

        `/Font << ` +
        `/F1 ${fontRegularId} 0 R ` +
        `/F2 ${fontBoldId} 0 R ` +
        `>> ` +

        `>> ` +

        `${annotations}` +

        `/Contents ${contentId} 0 R ` +

        `>>`,
      );


    pageIds.push(
      pageId,
    );
  }


  // ==========================================================
  // PAGES OBJECT
  // ==========================================================

  objects[
    pagesId - 1
  ] =
    `<< ` +
    `/Type /Pages ` +
    `/Kids [` +

    `${pageIds
      .map(
        (id) =>
          `${id} 0 R`,
      )
      .join(" ")}` +

    `] ` +

    `/Count ${pageIds.length} ` +

    `>>`;


  // ==========================================================
  // BUILD PDF
  // ==========================================================

  let output =
    "%PDF-1.4\n";


  const offsets =
    [0];


  objects.forEach(
    (object, index) => {

      offsets.push(
        Buffer.byteLength(output),
      );


      output +=
        `${index + 1} 0 obj\n`;


      output +=
        `${object}\n`;


      output +=
        `endobj\n`;
    },
  );


  const xrefOffset =
    Buffer.byteLength(output);


  output +=
    `xref\n` +
    `0 ${objects.length + 1}\n`;


  output +=
    "0000000000 65535 f \n";


  for (
    let i = 1;
    i < offsets.length;
    i += 1
  ) {

    output +=
      `${String(offsets[i])
        .padStart(10, "0")} ` +
      `00000 n \n`;
  }


  output +=
    `trailer\n` +

    `<< ` +
    `/Size ${objects.length + 1} ` +
    `/Root ${catalogId} 0 R ` +
    `>>\n` +

    `startxref\n` +
    `${xrefOffset}\n` +

    `%%EOF\n`;


  return Buffer.from(
    output,
    "binary",
  );
}


// ============================================================
// GENERATE PDF
// ============================================================

const pages =
  buildContent();


if (pages.length <= 2) {

  console.log(
    `Resume generated successfully on ${pages.length} page(s).`,
  );

} else {

  console.warn(
    `Warning: Resume generated ${pages.length} pages (target is 2 pages).`,
  );
}


writeFileSync(
  "../public/resume.pdf",
  makePdf(pages),
);


console.log(
  "Resume PDF generated successfully with clickable links!",
);