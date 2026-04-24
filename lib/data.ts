export const SITE = {
  name: "Alexander Christian",
  fullName: "Alexander Christian Suryanto Linggodigdo",
  handle: "alexcsl",
  tagline: "Blockchain & AI Developer",
  location: "Tangerang Selatan, Indonesia",
  email: "alexandercsl32@gmail.com",
  github: "https://github.com/alexcsl",
  linkedin: "https://linkedin.com/in/alexcsl",
  twitter: "https://x.com/alexcsl10",
  cv: "/Alexander_CV.pdf",
};

export const ABOUT = {
  intro: "Hi, I'm Alex.",
  body: `Computer Science student at BINUS University shipping fullstack on-chain applications across L2 ecosystems including Base and Lisk. I'm proficient in Solidity, Foundry, and modern web frameworks, and I'm currently expanding into AI/ML with practical applications for Indonesian market intelligence.`,
  highlights: [
    { label: "Hackathons shipped", value: "3+" },
    { label: "Students mentored", value: "200+" },
  ],
};

export type ProjectPreviewVariant =
  | "freelancing"
  | "gamefi"
  | "chatbot"
  | "desktop"
  | "social"
  | "workshop"
  | "generic";

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  tags: ("Blockchain" | "AI" | "Web" | "Game")[];
  year: string;
  team?: boolean;
  links?: { label: string; href: string }[];
  preview: ProjectPreviewVariant;
};

export const PROJECTS: Project[] = [
  {
    title: "On-Chain Freelancing Platform",
    subtitle: "Base Indonesia Hackathon",
    description:
      "Fullstack decentralized freelancing platform built on Base L2 with on-chain reputation scoring. Integrated IDRX stablecoin for IDR-denominated payments and Ponder for real-time blockchain event indexing.",
    tech: ["Solidity", "Onchainkit", "Ponder", "Next.js", "Supabase", "IDRX"],
    tags: ["Blockchain", "Web"],
    year: "2025",
    team: true,
    preview: "freelancing",
  },
  {
    title: "On-Chain GameFi",
    subtitle: "Lisk Builders Challenge",
    description:
      "Growtopia-inspired blockchain game with on-chain asset ownership and game mechanics powered by smart contracts on Lisk. Built the Web3 integration layer connecting Unity gameplay to on-chain state.",
    tech: ["Unity", "C#", "Solidity", "Ponder"],
    tags: ["Blockchain", "Game"],
    year: "2025",
    team: true,
    preview: "gamefi",
  },
  {
    title: "Hyperlocal AI Market Chatbot",
    subtitle: "Startup Village Bogor 2026",
    description:
      "AI-powered chatbot helping Indonesian SMEs (UMKMs) simulate local market conditions and gain actionable business insights. Built as a working demo for the ideathon competition.",
    tech: ["React", "Hono.js", "AI/LLM"],
    tags: ["AI", "Web"],
    year: "2026",
    team: true,
    preview: "chatbot",
  },
  {
    title: "RUSA Desktop Application",
    subtitle: "Personal Project",
    description:
      "Cross-platform desktop application built with the Rust-Tauri-Svelte stack, exploring BAD (Brutalist-Adjacent Design) principles and native OS integration.",
    tech: ["Rust", "Tauri", "Svelte", "TypeScript"],
    tags: ["Web"],
    year: "2025",
    links: [{ label: "GitHub", href: "https://github.com/alexcsl/RUSA-Desktop-Application" }],
    preview: "desktop",
  },
  {
    title: "hoshibmatchi",
    subtitle: "Instagram clone in Go",
    description:
      "Instagram-style social application built in Go, exploring idiomatic Go patterns, media storage, and social graph modeling.",
    tech: ["Go", "PostgreSQL", "Redis", "MinIO", "gORM", "Docker", "Traefik"],
    tags: ["Web"],
    year: "2025",
    links: [{ label: "GitHub", href: "https://github.com/alexcsl/hoshibmatchi" }],
    preview: "social",
  },
  {
    title: "fish-it",
    subtitle: "BlockDevId Workshop",
    description:
      "Collaborative Web3 project developed during the BlockDevId workshop, exploring smart contract patterns and dApp integration.",
    tech: ["TypeScript", "Solidity"],
    tags: ["Blockchain"],
    year: "2024",
    team: true,
    links: [{ label: "GitHub", href: "https://github.com/alexcsl/fish-it" }],
    preview: "workshop",
  },
];

export const SKILLS = [
  {
    category: "Blockchain",
    items: [
      "Solidity",
      "Foundry",
      "Hardhat",
      "OpenZeppelin",
      "Ponder",
      "Onchainkit",
      "Ethers.js",
      "ERC-20 / 721 / 1155",
      "ZK Proofs",
    ],
  },
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Rust", "Go", "Java", "C", "SQL", "C#"],
  },
  {
    category: "Web & Desktop",
    items: [
      "React",
      "Next.js",
      "Svelte",
      "Vue.js",
      "Tauri",
      "Tailwind CSS",
      "Elysia",
      "Hono.js",
      "Vite",
      "HTML, CSS, JS",
    ],
  },
  {
    category: "Data & DevOps",
    items: [
      "PostgreSQL",
      "SQLite",
      "Indexers",
      "TensorFlow",
      "NumPy",
      "Pandas",
      "Supabase",
      "Drizzle ORM",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Azure",
      "Git",
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Fullstack Developer Intern",
    company: "Kruuu Pte. Ltd.",
    period: "Dec 2025 – Mar 2026",
    points: [
      "Architected the Admin Dashboard with TypeScript, Elysia, and Tailwind.",
      "Designed Drizzle ORM schemas optimizing query performance and data integrity.",
      "Built CI/CD pipelines with Git and Kubernetes, reducing deployment downtime.",
    ],
  },
  {
    role: "Software Laboratory Assistant",
    company: "Universitas Bina Nusantara",
    period: "Jan 2025 – Present",
    points: [
      "Facilitate lab sessions across 9 courses for 200+ students.",
      "Develop assignments and assessments aligned with course objectives.",
      "Mentor students on debugging and software development best practices.",
    ],
  },
];
