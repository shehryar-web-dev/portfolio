import { writeFileSync } from "node:fs";

// ============================================================
// RESUME DATA
// ============================================================

const resume = {
  name: "Shehryar Naeem",

  title: "Senior Full Stack Engineer | Blockchain & AI",

  location: "Lahore, Pakistan",

  contact:
    "+92 311 1404107  |  shehryarwebdev@gmail.com",

  links: {
    portfolio: "https://shehryar-web-dev.vercel.app/",
    github: "https://github.com/shehryar-web-dev/",
    linkedin: "https://www.linkedin.com/in/shehryar-naeem-831691213/",
  },

  summary:
    "Full Stack Engineer with 3+ years of experience building scalable web applications, backend services, and blockchain products. Experienced in React, Next.js, TypeScript, Node.js, NestJS, REST APIs, databases, Solana integrations, and AI-powered applications. Delivered production-ready dashboards, dApps, staking and rewards platforms, loyalty systems, Web3 integrations, and maintainable full-stack solutions.",

  experience: [
    {
      role: "Full Stack Developer",

      company: "Weiblocks",

      location: "Lahore, Pakistan",

      period: "2023 - 2026",

      bullets: [
        "Developed and shipped production-ready web applications across frontend, backend, APIs, databases, and blockchain integrations.",
        "Built scalable applications using React, Next.js, and TypeScript with reusable component architecture.",
        "Developed REST APIs and integrated authentication and Web3 workflows for staking, rewards, marketplace, and loyalty products.",
        "Collaborated with product and engineering teams to translate business requirements into maintainable production features.",
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

      tech:
        "Next.js, NestJS, Redis, OpenAI API",

      summary:
        "Solana analytics and AI-powered trading platform featuring wallet authentication, token risk analysis, real-time market insights, personalized dashboards, and automated Telegram alerts for monitoring trading opportunities and blockchain activity.",

      bullets: [
        "Built responsive analytics dashboards and personalized user preference workflows.",
        "Integrated market data APIs, wallet authentication, and token risk analysis using liquidity and holder-distribution data.",
        "Implemented AI-powered insights and automated alert workflows to help users monitor tokens and important market activity.",
      ],
    },

    {
      name: "FinTrust",

      tech:
        "Next.js, PostgreSQL, Prisma, Redis",

      summary:
        "Decentralized staking and rewards platform supporting token staking, cashback, referrals, ICO participation, transaction tracking, reward visualization, and administrative controls for managing platform operations and user activity.",

      bullets: [
        "Developed staking, rewards, transaction history, and reward visualization workflows.",
        "Connected frontend workflows with backend APIs and Solana smart-contract interactions.",
        "Built administrative functionality for managing users, platform rewards, transactions, and operational workflows.",
      ],
    },

    {
      name: "NFC Loyalty System",

      tech:
        "React, Node.js, MongoDB",

      summary:
        "Customer loyalty platform featuring NFC-based check-ins, NFT rewards, membership tiers, merchant and admin dashboards, authentication workflows, and backend services for managing customers and loyalty programs.",

      bullets: [
        "Built merchant and admin dashboards with REST API and authentication integrations.",
        "Implemented NFT reward flows and membership-tier upgrade workflows.",
        "Developed backend services for managing customers, loyalty activity, rewards, merchants, and membership data.",
      ],
    },
  ],

  skills: [
    "Languages: JavaScript, TypeScript, Python",
    "Frontend: React, Next.js, React Native",
    "Backend: Node.js, NestJS, REST APIs",
    "Databases: PostgreSQL, MongoDB, Redis",
    "Blockchain: Solana, Web3, Wallet Authentication, SPL Tokens, NFTs",
    "AI: OpenAI API, AI-Powered Applications, RAG",
    "Cloud & DevOps: AWS, Docker, Git, GitHub, Nginx",
  ],

  education: {
    university: "University of Education",

    degree: "Bachelor's Degree",
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


if (pages.length > 1) {

  console.warn(
    `Warning: Resume generated ${pages.length} pages.`,
  );

} else {

  console.log(
    "Resume fits successfully on one A4 page.",
  );
}


writeFileSync(
  "../public/resume.pdf",
  makePdf(pages),
);


console.log(
  "Resume PDF generated successfully with clickable links!",
);