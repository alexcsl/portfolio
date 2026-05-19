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
  body: `Computer Science student at BINUS University shipping fullstack on-chain applications across L2 ecosystems including Base and Lisk. Proficient in Solidity, Foundry, and modern web frameworks. Currently expanding into AI/ML with practical applications for Indonesian market intelligence.`,
};

export type ProjectPreviewVariant =
  | "freelancing"
  | "gamefi"
  | "chatbot"
  | "desktop"
  | "social"
  | "workshop"
  | "mobile"
  | "generic";

export type Project = {
  evidence: string;          // e.g. "01"
  title: string;
  subtitle: string;
  type: string;              // e.g. "Hackathon Build", "Personal Project"
  description: string;       // short, used on card
  mission: string;           // full brief for overlay
  intervention?: string;     // role/contribution
  tech: string[];
  tags: ("Blockchain" | "AI" | "Web" | "Game")[];
  year: string;
  client?: string;
  time?: string;
  context?: "Professional" | "Student" | "Personal" | "Hackathon";
  team?: boolean;
  links?: { label: string; href: string }[];
  preview: ProjectPreviewVariant;
  /** Optional cover image (path under /public). Falls back to a generated
   *  gradient visual if absent. Drop a file in /public and reference it here. */
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    evidence: "01",
    title: "On-Chain Freelancing Platform",
    subtitle: "Base Indonesia Hackathon",
    type: "Hackathon Build",
    description:
      "Decentralized freelancing on Base L2 with on-chain reputation and IDRX-denominated payments.",
    mission:
      "A fullstack decentralized freelancing platform on Base L2 with on-chain reputation scoring, IDR-stablecoin payments via IDRX, and real-time blockchain event indexing through Ponder. Submission for the Base Indonesia Hackathon. The goal was to make trustless freelancing viable for the Indonesian SME market.",
    intervention:
      "Architected the smart contracts (escrow + reputation), wired Onchainkit auth, integrated IDRX, and stitched the Next.js frontend to Ponder for live data.",
    tech: ["Solidity", "Onchainkit", "Ponder", "Next.js", "Supabase", "IDRX"],
    tags: ["Blockchain", "Web"],
    year: "2025",
    client: "Base Indonesia",
    time: "3 days",
    context: "Hackathon",
    team: true,
    preview: "freelancing",
  },
  {
    evidence: "02",
    title: "On-Chain GameFi",
    subtitle: "Lisk Builders Challenge",
    type: "Hackathon Build",
    description:
      "Growtopia-inspired blockchain game with on-chain asset ownership powered by Lisk smart contracts.",
    mission:
      "Reimagine Growtopia-style sandbox gameplay with true on-chain asset ownership. Players mint, trade, and stake game items via smart contracts on Lisk. Built for the Lisk Builders Challenge. It was a stress test of Web3 bridging real-time game state.",
    intervention:
      "Built the Web3 integration layer connecting Unity gameplay to on-chain state, indexed via Ponder. Handled the wallet-side UX and the tx-batching for high-frequency game actions.",
    tech: ["Unity", "C#", "Solidity", "Ponder"],
    tags: ["Blockchain", "Game"],
    year: "2025",
    client: "Lisk",
    time: "2 weeks",
    context: "Hackathon",
    team: true,
    preview: "gamefi",
  },
  {
    evidence: "03",
    title: "Hyperlocal AI Market Chatbot",
    subtitle: "Startup Village Bogor 2026",
    type: "Ideathon Demo",
    description:
      "AI chatbot helping Indonesian UMKMs simulate local market conditions and surface business insights.",
    mission:
      "An AI-powered chatbot helping Indonesian SMEs (UMKMs) simulate local market conditions and gain actionable business insights. Built as a working demo for the Startup Village Bogor ideathon. The wedge was hyperlocal data the global LLMs simply don't have.",
    intervention:
      "Designed the LLM orchestration layer in Hono.js and the React conversational UI. Curated the hyperlocal dataset that grounds the model.",
    tech: ["React", "Hono.js", "AI/LLM"],
    tags: ["AI", "Web"],
    year: "2026",
    client: "Startup Village Bogor",
    time: "1 week",
    context: "Hackathon",
    team: true,
    preview: "chatbot",
  },
  {
    evidence: "04",
    title: "RUSA Desktop Application",
    subtitle: "Personal Project",
    type: "Personal Project",
    description:
      "Cross-platform desktop app on the Rust-Tauri-Svelte stack with brutalist-adjacent design.",
    mission:
      "A cross-platform desktop application built with the Rust, Tauri, and Svelte stack. An experiment in brutalist-adjacent design (BAD), native OS integration, and how fast a productivity tool can feel when the runtime is Rust.",
    intervention:
      "Designed and shipped solo. Wrote the Rust backend bindings, the Svelte UI, and the install pipeline for Windows and macOS.",
    tech: ["Rust", "Tauri", "Svelte", "TypeScript"],
    tags: ["Web"],
    year: "2026",
    context: "Personal",
    time: "Ongoing",
    links: [
      { label: "GitHub", href: "https://github.com/alexcsl/RUSA-Desktop-Application" },
    ],
    preview: "desktop",
  },
  {
    evidence: "05",
    title: "hoshibmatchi",
    subtitle: "Instagram clone in Go",
    type: "Backend Experiment",
    description:
      "Instagram-style social app in Go. Idiomatic patterns, media storage, social-graph modeling.",
    mission:
      "An Instagram-style social application built in Go. An exercise in idiomatic Go patterns, media storage with MinIO, social graph modeling in Postgres, and end-to-end deployment behind Traefik.",
    intervention:
      "Solo build. Wrote the API, the storage layer, the auth flow, and the Docker/Traefik deploy pipeline.",
    tech: ["Go", "PostgreSQL", "Redis", "MinIO", "gORM", "Docker", "Traefik"],
    tags: ["Web"],
    year: "2025",
    context: "Personal",
    time: "1 month",
    links: [{ label: "GitHub", href: "https://github.com/alexcsl/hoshibmatchi" }],
    preview: "social",
  },
  {
    evidence: "06",
    title: "TasKalender",
    subtitle: "Android productivity app",
    type: "Mobile Application",
    description:
      "Native Android app combining tasks, expense ledger, and quick notes. Auth and sync via Firebase.",
    mission:
      "A native Android productivity app combining a task tracker, an expense and income ledger, and quick notes. Firebase auth, password reset, and cross-device sync. Built in Kotlin/Java with XML layouts in Android Studio.",
    intervention:
      "Solo build. Architected the offline-first sync, the Firebase schema, and the entire UI.",
    tech: ["Kotlin", "Java", "XML", "Android Studio", "Firebase"],
    tags: ["Web"],
    year: "2025",
    context: "Personal",
    time: "3 weeks",
    preview: "mobile",
  },
  {
    evidence: "07",
    title: "fish-it",
    subtitle: "BlockDevId Workshop",
    type: "Workshop Project",
    description:
      "Collaborative Web3 project exploring smart contract patterns and dApp integration.",
    mission:
      "A collaborative Web3 project developed during the BlockDevId workshop. Explored smart contract patterns, gas optimization, and dApp integration with a frontend team.",
    intervention:
      "Worked on smart contract architecture and TypeScript integration with the team.",
    tech: ["TypeScript", "Solidity"],
    tags: ["Blockchain"],
    year: "2025",
    client: "BlockDevId",
    time: "1 week",
    context: "Hackathon",
    team: true,
    links: [{ label: "GitHub", href: "https://github.com/alexcsl/fish-it" }],
    preview: "workshop",
  },
];

export const SKILLS_FLAT: string[] = [
  "Solidity",
  "Foundry",
  "Hardhat",
  "TypeScript",
  "React",
  "Next.js",
  "Rust",
  "Tauri",
  "Go",
  "Python",
  "Hono.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "Drizzle",
  "Docker",
  "Kubernetes",
  "Ponder",
  "Onchainkit",
  "TensorFlow",
];

export const SOFT_SKILLS: string[] = [
  "Problem Solving",
  "System Design",
  "Mentorship",
  "Rapid Iteration",
  "Cross-team Communication",
];

export const EDUCATION = [
  {
    school: "BINUS University",
    period: "2023 – Present",
    degree: "B.Sc. Computer Science",
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
