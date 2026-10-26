export type ProjectMedia = {
  kind: "application" | "terminal" | "diagram";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  capturedAt: string;
  sourceRevision: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  category: "Web" | "Desktop" | "Infrastructure" | "Contribution";
  context: string;
  status: string;
  contribution: string;
  tech: string[];
  source: { label: string; href?: string; revision: string };
  links: { label: string; href: string }[];
  sections: ProjectSection[];
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "stockscope",
    number: "01",
    title: "StockScope",
    eyebrow: "Tokenized stock research",
    summary: "A research terminal that joins issuer identity, sourced market observations, comparisons, cited reports, and unsigned trade plans.",
    category: "Web",
    context: "Independent product",
    status: "Development project",
    contribution: "Built the research workflows and guarded testnet execution path in the project repository.",
    tech: ["Next.js", "TypeScript", "Firebase", "Supabase", "Solidity"],
    source: { label: "Source repository", href: "https://github.com/alexcsl/stockscope", revision: "9b5ecae00e7bf7783e3d4016d0a154989620ed0c" },
    links: [],
    sections: [
      { heading: "Problem", body: "Tokenized stock research mixes issuer facts, market observations, and trade ideas that need clear sources and boundaries." },
      { heading: "Workflows", body: "Public research is available without an account. Email accounts can save private research. Comparisons and cited reports expose source context, while trade plans remain unsigned." },
      { heading: "Engineering choices", body: "Provider gaps and unsupported routes stay unavailable instead of presenting invented history. Wallet actions require user approval; guarded execution is limited to configured testnets." },
      { heading: "Scope", body: "Trade plans are unsigned, with guarded execution limited to configured testnets. Public stock settlement is not part of the demonstrated product." },
    ],
    media: [],
  },
  {
    slug: "rusa",
    number: "02",
    title: "RUSA",
    eyebrow: "Remote Universe Space Administration",
    summary: "A coursework desktop system for operations across a fictional space administration, organized around twelve departmental subsystems.",
    category: "Desktop",
    context: "Coursework team project",
    status: "Coursework team project",
    contribution: "Contributed to a team implementation of a departmental operations system for a fictional space administration.",
    tech: ["Tauri", "Rust", "SvelteKit", "PostgreSQL", "Supabase"],
    source: { label: "Source repository", href: "https://github.com/alexcsl/RUSA-Desktop-Application", revision: "15181c03bc107aa2b62be44e6583fc6b46e40e52" },
    links: [],
    sections: [
      { heading: "Problem", body: "A fictional agency needs distinct workflows for engineering, research, missions, medical care, station operations, and administration." },
      { heading: "Workflows", body: "The repository documents twelve departmental subsystems, including missions, research proposals, inventory, incident reports, and personnel administration." },
      { heading: "Engineering choices", body: "The desktop application combines Tauri, a SvelteKit interface, Rust command handlers, and PostgreSQL-backed operational records." },
    ],
    media: [],
  },
  {
    slug: "warung-cek-harga",
    number: "03",
    title: "Warung Cek Harga",
    eyebrow: "Community procurement intelligence",
    summary: "An Indonesian team project for price references, private contributions, and group purchasing by small shops.",
    category: "Web",
    context: "ITECHNO CUP 2026 team submission",
    status: "Team competition project",
    contribution: "Worked on Kulakan Bareng integration and demo readiness with the project team, as recorded in the repository's team table.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    source: { label: "Reviewed repair candidate", href: "https://github.com/WarungTechnoCup/WarungMonorepo/pull/2", revision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18" },
    links: [{ label: "Team repository", href: "https://github.com/WarungTechnoCup/WarungMonorepo" }],
    sections: [
      { heading: "Problem", body: "Small shops need useful purchase price references without exposing a contributor's identity, address, or receipt." },
      { heading: "Workflows", body: "The MVP combines Harga Wajar, private price contribution, and Kulakan Bareng group purchasing. Public price references require at least five independent contributors." },
      { heading: "Engineering choices", body: "Private purchasing commitments and public aggregate views use separate access boundaries. Price references require enough independent contributors to protect individual shops." },
      { heading: "Scope", body: "Harga Wajar and Kulakan Bareng form the core experience. Admin and offline routes remain incomplete, and hosted authentication and storage are not presented as production-validated services." },
    ],
    media: [],
  },
  {
    slug: "beetip",
    number: "04",
    title: "BeeTip",
    eyebrow: "Neighborhood jastip marketplace",
    summary: "A browser-local Venture Creation prototype for requesting and fulfilling small purchases around BINUS Alam Sutera.",
    category: "Web",
    context: "Venture Creation coursework",
    status: "Synthetic local demo",
    contribution: "Developed the local marketplace prototype and order workflows with fictional records.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    source: { label: "Private source", revision: "6d96dd8726a5edd0a89798f409f59de8c7d32e08" },
    links: [],
    sections: [
      { heading: "Problem", body: "A campus neighborhood needs a clear way to request a purchase or offer a jastip trip while keeping terms visible to both sides." },
      { heading: "Workflows", body: "The local demo covers listings, offers, accepted terms, purchases, handover, disputes, and fictional payout and refund reconciliation." },
      { heading: "Engineering choices", body: "One member model supports both requesting and fulfilling. Persona switching is a test control, and all records remain in the browser." },
      { heading: "Prototype scope", body: "Authentication, connected storage, real payments, and deployment are unimplemented. The prototype has no official campus endorsement." },
    ],
    media: [],
  },
  {
    slug: "aegis",
    number: "05",
    title: "Aegis",
    eyebrow: "Behavioral authorization middleware",
    summary: "A Go policy service and TypeScript and Python SDKs for evaluating an agent's tool calls against session behavior.",
    category: "Infrastructure",
    context: "Independent open-source project",
    status: "Open-source development project",
    contribution: "Implemented the Go authorization core and SDK integration surfaces in the project repository.",
    tech: ["Go", "PostgreSQL", "TypeScript", "Python"],
    source: { label: "Reviewed repair candidate", href: "https://github.com/alexcsl/aegis/pull/2", revision: "957700f28285d69544e0c4adfdee83ba27a3bf58" },
    links: [{ label: "Source repository", href: "https://github.com/alexcsl/aegis" }],
    sections: [
      { heading: "Problem", body: "A registered agent tool can still be risky when its arguments and preceding session actions change the meaning of a call." },
      { heading: "Workflows", body: "A client sends a tool call to the intercept endpoint. The service evaluates session history and policy, then returns an authorization decision." },
      { heading: "Engineering choices", body: "A Go service centralizes policy evaluation while TypeScript and Python SDKs connect it to application tool calls. Session history gives each call context beyond an individual allowlist entry." },
    ],
    media: [],
  },
  {
    slug: "recordly-contribution",
    number: "06",
    title: "Recordly",
    eyebrow: "Open-source contribution",
    summary: "A merged editor repair for clip cuts, deletion, and preview playback in the Recordly desktop application.",
    category: "Contribution",
    context: "Open-source contribution to Recordly",
    status: "Merged open-source contribution",
    contribution: "Authored merged PR 1029, which changes clip selection after splitting, middle-clip deletion, paused preview during source seeks, and audio resume after seeking.",
    tech: ["Electron", "TypeScript", "React"],
    source: { label: "Merged contribution", href: "https://github.com/webadderallorg/Recordly/pull/1029", revision: "547278ddc9ec470019eaae334db4d99fd3c3bd07" },
    links: [],
    sections: [
      { heading: "Problem", body: "Clip editing needs predictable selection, deletion, and preview behavior after timeline cuts." },
      { heading: "Contribution", body: "The merged change addresses selection after splitting, deletion of the intended middle clip, paused preview while seeking, and resuming source audio once the seek completes." },
      { heading: "Engineering choices", body: "The work stays within Recordly's existing editor. The product and its broader feature set belong to the upstream project." },
      { heading: "Contribution scope", body: "PR 1029 is merged upstream. A separate recording-control accessibility proposal, PR 1028, remains unmerged." },
    ],
    media: [],
  },
];

export const projectBySlug = new Map(projects.map((project) => [project.slug, project]));
export const projectCategories = ["All", "Web", "Desktop", "Infrastructure", "Contribution"] as const;
