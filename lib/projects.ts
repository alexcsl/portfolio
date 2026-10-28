export type ProjectMedia = {
  kind: "application" | "terminal" | "diagram" | "video-still";
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
  category: "Web" | "Desktop" | "Infrastructure" | "Contribution" | "Mobile" | "Game" | "Product strategy";
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
    source: { label: "Project contribution", href: "https://github.com/alexcsl/stockscope/pull/2", revision: "473b7e1e22e386a12e7ecee85d0758ab952055ed" },
    links: [],
    sections: [
      { heading: "Problem", body: "Tokenized stock research mixes issuer facts, market observations, and trade ideas that need clear sources and boundaries." },
      { heading: "Workflows", body: "Public research is available without an account. Email accounts can save private research. Comparisons and cited reports expose source context, while trade plans remain unsigned." },
      { heading: "Engineering choices", body: "Source-aware market data, explicit issuer identity, and user-approved wallet actions connect the research experience to a guarded testnet execution workflow." },
    ],
    media: [
      { kind: "application", src: "/assets/projects/stockscope/01-overview.jpg", width: 1440, height: 1000, alt: "StockScope homepage with research terminal entry and source boundaries.", caption: "Research terminal overview. Demo data.", capturedAt: "2026-10-27", sourceRevision: "473b7e1e22e386a12e7ecee85d0758ab952055ed" },
      { kind: "application", src: "/assets/projects/stockscope/02-terminal.jpg", width: 1440, height: 1000, alt: "StockScope terminal with three synthetic instruments and a recoverable xStocks catalog warning.", caption: "Market research terminal. Demo data.", capturedAt: "2026-10-27", sourceRevision: "473b7e1e22e386a12e7ecee85d0758ab952055ed" },
      { kind: "application", src: "/assets/projects/stockscope/03-watchlist.jpg", width: 1440, height: 1000, alt: "StockScope saved desk with a watched Apple token and evidence alert controls.", caption: "Personal watchlist. Demo data.", capturedAt: "2026-10-27", sourceRevision: "473b7e1e22e386a12e7ecee85d0758ab952055ed" },
      { kind: "application", src: "/assets/projects/stockscope/04-comparison.jpg", width: 1440, height: 1000, alt: "StockScope comparison with two synthetic Robinhood records and unavailable venue evidence.", caption: "Side-by-side issuer comparison. Demo data.", capturedAt: "2026-10-27", sourceRevision: "473b7e1e22e386a12e7ecee85d0758ab952055ed" },
      { kind: "application", src: "/assets/projects/stockscope/05-research-record.jpg", width: 1440, height: 1000, alt: "Apple token research record with fixture bid and ask references and exact issuer and contract identity.", caption: "Token research record and price references. Demo data.", capturedAt: "2026-10-27", sourceRevision: "473b7e1e22e386a12e7ecee85d0758ab952055ed" },
    ],
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
      { heading: "Desktop experience", body: "The medical workspace brings inventory, supply entry, quantity updates, assigned shifts, and treatment history into one departmental interface." },
    ],
    media: [
      { kind: "application", src: "/assets/projects/rusa/01-medical-inventory.png", width: 1920, height: 1200, alt: "Native RUSA medical department showing fictional medicines, equipment and supplies with an item quantity panel.", caption: "Medical inventory and item details. Coursework demo.", capturedAt: "2026-10-28", sourceRevision: "15181c03bc107aa2b62be44e6583fc6b46e40e52; source-manifest:d9dc3061a53f9eacd301037013b80ce821eb8cc7aa45bc85c25e9f416d029848" },
      { kind: "application", src: "/assets/projects/rusa/02-add-inventory.png", width: 1920, height: 1200, alt: "Native RUSA inventory form populated with a fictional supply name, type, quantity and unit.", caption: "New supply item form. Coursework demo.", capturedAt: "2026-10-28", sourceRevision: "15181c03bc107aa2b62be44e6583fc6b46e40e52; source-manifest:d9dc3061a53f9eacd301037013b80ce821eb8cc7aa45bc85c25e9f416d029848" },
      { kind: "application", src: "/assets/projects/rusa/03-quantity-update.png", width: 1920, height: 1200, alt: "Native RUSA item details showing a fictional medicine kit updated to thirty packs.", caption: "Updated inventory quantity. Coursework demo.", capturedAt: "2026-10-28", sourceRevision: "15181c03bc107aa2b62be44e6583fc6b46e40e52; source-manifest:d9dc3061a53f9eacd301037013b80ce821eb8cc7aa45bc85c25e9f416d029848" },
      { kind: "application", src: "/assets/projects/rusa/04-work-schedule.png", width: 1920, height: 1200, alt: "Native RUSA work schedule showing two fictional upcoming medical shifts and a training specialty.", caption: "Assigned medical shifts. Coursework demo.", capturedAt: "2026-10-28", sourceRevision: "15181c03bc107aa2b62be44e6583fc6b46e40e52; source-manifest:d9dc3061a53f9eacd301037013b80ce821eb8cc7aa45bc85c25e9f416d029848" },
      { kind: "application", src: "/assets/projects/rusa/05-patient-record.png", width: 1920, height: 1200, alt: "Native RUSA patient panel showing a fictional training record with synthetic treatment and follow-up entries.", caption: "Patient treatment history. Coursework demo.", capturedAt: "2026-10-28", sourceRevision: "15181c03bc107aa2b62be44e6583fc6b46e40e52; source-manifest:d9dc3061a53f9eacd301037013b80ce821eb8cc7aa45bc85c25e9f416d029848" },
    ],
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
    source: { label: "Project contribution", href: "https://github.com/WarungTechnoCup/WarungMonorepo/pull/2", revision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18" },
    links: [{ label: "Team repository", href: "https://github.com/WarungTechnoCup/WarungMonorepo" }],
    sections: [
      { heading: "Problem", body: "Small shops need useful purchase price references without exposing a contributor's identity, address, or receipt." },
      { heading: "Workflows", body: "The MVP combines Harga Wajar, private price contribution, and Kulakan Bareng group purchasing. Public price references require at least five independent contributors." },
      { heading: "Engineering choices", body: "Private purchasing commitments and public aggregate views use separate access boundaries. Price references require enough independent contributors to protect individual shops." },
      { heading: "Product experience", body: "Harga Wajar helps shops compare local price references, while Kulakan Bareng organizes pooled quantities, supplier quotes, and delivery terms for group purchasing." },
    ],
    media: [
      { kind: "application", src: "/assets/projects/warung-cek-harga/01-overview.jpg", width: 1440, height: 1000, alt: "Warung Cek Harga homepage with Indonesian procurement guidance and a clearly labeled demo benchmark.", caption: "Harga Wajar and group purchasing. Demo data.", capturedAt: "2026-10-27", sourceRevision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18; source-manifest:05eada4796ef48a351d54dcb2f8bc795ed2d8e0914fe43fff6e9877debb1986e" },
      { kind: "application", src: "/assets/projects/warung-cek-harga/02-price-benchmark.jpg", width: 1440, height: 1000, alt: "Product search showing a synthetic six-contributor benchmark, price interval, confidence and observation date.", caption: "Neighborhood price benchmark. Demo data.", capturedAt: "2026-10-27", sourceRevision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18; source-manifest:05eada4796ef48a351d54dcb2f8bc795ed2d8e0914fe43fff6e9877debb1986e" },
      { kind: "application", src: "/assets/projects/warung-cek-harga/03-contribution-threshold.jpg", width: 1440, height: 1000, alt: "Cooking oil benchmark withheld because only three fictional contributors are available against the five-contributor threshold.", caption: "Contributor privacy threshold. Demo data.", capturedAt: "2026-10-27", sourceRevision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18; source-manifest:05eada4796ef48a351d54dcb2f8bc795ed2d8e0914fe43fff6e9877debb1986e" },
      { kind: "application", src: "/assets/projects/warung-cek-harga/04-group-buying.jpg", width: 1440, height: 1000, alt: "Group purchasing list with a fictional noodle opportunity, 37 of 50 cartons and a target wholesale price.", caption: "Group purchasing and pooled volume. Demo data.", capturedAt: "2026-10-27", sourceRevision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18; source-manifest:05eada4796ef48a351d54dcb2f8bc795ed2d8e0914fe43fff6e9877debb1986e" },
      { kind: "application", src: "/assets/projects/warung-cek-harga/05-opportunity-details.jpg", width: 1440, height: 1000, alt: "Fictional group purchasing detail separates the initial target price from the supplier quote and shows pooled quantity and delivery terms.", caption: "Supplier quote, target price, and delivery terms. Demo data.", capturedAt: "2026-10-27", sourceRevision: "acbebe79927aa0a7d2db11ecea1b2f399283ab18; source-manifest:05eada4796ef48a351d54dcb2f8bc795ed2d8e0914fe43fff6e9877debb1986e" },
    ],
  },
  {
    slug: "beetip",
    number: "04",
    title: "BeeTip",
    eyebrow: "Neighborhood jastip marketplace",
    summary: "A browser-local Venture Creation prototype for requesting and fulfilling small purchases around BINUS Alam Sutera.",
    category: "Web",
    context: "Venture Creation coursework",
    status: "Interactive prototype",
    contribution: "Developed the local marketplace prototype and order workflows with fictional records.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    source: { label: "Private source", revision: "777cbac3017fa8108ee80e137da50df0d63b8c0b" },
    links: [],
    sections: [
      { heading: "Problem", body: "A campus neighborhood needs a clear way to request a purchase or offer a jastip trip while keeping terms visible to both sides." },
      { heading: "Workflows", body: "The local demo covers listings, offers, accepted terms, purchases, handover, disputes, and fictional payout and refund reconciliation." },
      { heading: "Engineering choices", body: "One member model supports both requesting and fulfilling. Persona switching is a test control, and all records remain in the browser." },
      { heading: "Prototype experience", body: "A browser-local prototype lets participants explore the complete order journey with sample listings and simulated payment records." },
    ],
    media: [
      { kind: "application", src: "/assets/projects/beetip/01-marketplace.jpg", width: 1440, height: 1000, alt: "BeeTip marketplace with fictional Indonesian jastip listings, rupiah fees, and campus area filters.", caption: "Neighborhood marketplace. Interactive prototype.", capturedAt: "2026-10-27", sourceRevision: "777cbac3017fa8108ee80e137da50df0d63b8c0b" },
      { kind: "application", src: "/assets/projects/beetip/02-request.jpg", width: 1440, height: 1000, alt: "BeeTip fictional coffee purchase request with item details, handover area, and offer terms.", caption: "Purchase request and offer terms. Interactive prototype.", capturedAt: "2026-10-27", sourceRevision: "777cbac3017fa8108ee80e137da50df0d63b8c0b" },
      { kind: "application", src: "/assets/projects/beetip/03-accepted-order.jpg", width: 1440, height: 1000, alt: "BeeTip accepted fictional coffee order with cost allocation and simulated funding instructions.", caption: "Accepted order and cost breakdown. Interactive prototype.", capturedAt: "2026-10-27", sourceRevision: "777cbac3017fa8108ee80e137da50df0d63b8c0b" },
      { kind: "application", src: "/assets/projects/beetip/04-handover.jpg", width: 1440, height: 1000, alt: "BeeTip fictional order handover with customer inspection and a local confirmation code.", caption: "Checked handover and confirmation code. Interactive prototype.", capturedAt: "2026-10-27", sourceRevision: "777cbac3017fa8108ee80e137da50df0d63b8c0b" },
      { kind: "application", src: "/assets/projects/beetip/05-reconciliation.jpg", width: 1440, height: 1000, alt: "BeeTip simulated order reconciliation with fictional completed payout and an audit trail.", caption: "Simulated payout reconciliation. Prototype with simulated payments.", capturedAt: "2026-10-27", sourceRevision: "777cbac3017fa8108ee80e137da50df0d63b8c0b" },
    ],
  },
  {
    slug: "recordly-contribution",
    number: "05",
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
      { heading: "Engineering choices", body: "The repair coordinates timeline selection, source seeking, and audio playback within Recordly's existing editor architecture." },
    ],
    media: [
      { kind: "application", src: "/assets/projects/recordly-contribution/01-editor.png", width: 2541, height: 1475, alt: "Native Recordly editor showing one timeline clip of synthetic color-bar test footage.", caption: "Recordly timeline editor. Sample footage.", capturedAt: "2026-10-27", sourceRevision: "e4a9d04860f4cbad3358bda3ac4a2307489f1d03; source-manifest:e63fdccbfd4dcb03587cc4008aefdac9ecb63de467cbb43a1b73c1007c79a00a" },
      { kind: "application", src: "/assets/projects/recordly-contribution/02-first-cut.png", width: 2541, height: 1475, alt: "Native Recordly timeline with two clips after the first cut in synthetic test footage.", caption: "First timeline cut. Sample footage.", capturedAt: "2026-10-27", sourceRevision: "e4a9d04860f4cbad3358bda3ac4a2307489f1d03; source-manifest:e63fdccbfd4dcb03587cc4008aefdac9ecb63de467cbb43a1b73c1007c79a00a" },
      { kind: "application", src: "/assets/projects/recordly-contribution/03-middle-selected.png", width: 2541, height: 1475, alt: "Three synthetic footage clips in the native Recordly editor with the middle clip selected for deletion.", caption: "Three clips before middle deletion. Sample footage.", capturedAt: "2026-10-27", sourceRevision: "e4a9d04860f4cbad3358bda3ac4a2307489f1d03; source-manifest:e63fdccbfd4dcb03587cc4008aefdac9ecb63de467cbb43a1b73c1007c79a00a" },
      { kind: "application", src: "/assets/projects/recordly-contribution/04-middle-deleted.png", width: 2541, height: 1475, alt: "Two retained clips in the native Recordly timeline after deleting the selected middle segment.", caption: "Retained clips after middle deletion. Sample footage.", capturedAt: "2026-10-27", sourceRevision: "e4a9d04860f4cbad3358bda3ac4a2307489f1d03; source-manifest:e63fdccbfd4dcb03587cc4008aefdac9ecb63de467cbb43a1b73c1007c79a00a" },
      { kind: "application", src: "/assets/projects/recordly-contribution/05-retained-source.png", width: 2541, height: 1475, alt: "Native Recordly preview displaying the retained synthetic source frame at the timeline seek position.", caption: "Seeking into retained source footage. Sample footage.", capturedAt: "2026-10-27", sourceRevision: "e4a9d04860f4cbad3358bda3ac4a2307489f1d03; source-manifest:e63fdccbfd4dcb03587cc4008aefdac9ecb63de467cbb43a1b73c1007c79a00a" },
    ],
  },
  {
    slug: "hoshibmatchi",
    number: "06",
    title: "Hoshibmatchi",
    eyebrow: "Social workflows and service architecture",
    summary: "A solo coursework social application centered on Instagram-style workflows, real-time chat, and a service-based backend architecture.",
    category: "Web",
    context: "Solo coursework project",
    status: "Coursework prototype",
    contribution: "Built the application independently, spanning the frontend, backend services, and service integration.",
    tech: ["Vue", "TypeScript", "Go", "PostgreSQL", "Redis", "RabbitMQ"],
    source: { label: "Frontend build repair", href: "https://github.com/alexcsl/hoshibmatchi/pull/2", revision: "24d492eff76a49ae246227662fd2ca0a0957693b" },
    links: [{ label: "Source repository", href: "https://github.com/alexcsl/hoshibmatchi" }],
    sections: [
      { heading: "Product workflows", body: "The source separates accounts, posts, stories, messaging, notifications, and media, with frontend routes for feed, explore, reels, messages, and profiles." },
      { heading: "Architecture", body: "A Vue interface connects to separate backend services. The local stack includes PostgreSQL, Redis, RabbitMQ, and MinIO, making service boundaries and integration a central part of the project." },
    ],
    media: [],
  },
  {
    slug: "pulsar",
    number: "07",
    title: "Pulsar",
    eyebrow: "Networking and infrastructure coursework",
    summary: "A solo network coursework project combining an application stack with Cisco networking and onsite infrastructure work using Terraform and Kubernetes.",
    category: "Infrastructure",
    context: "Solo coursework project",
    status: "Coursework project",
    contribution: "Built the project independently, including the application and its networking and infrastructure work.",
    tech: ["Cisco", "Terraform", "Kubernetes", "HAProxy", "Next.js"],
    source: { label: "Source repository", href: "https://github.com/XL25-2/TPA_Pulsar", revision: "602b55bc7365dbae8edf2827195402450159efb2" },
    links: [],
    sections: [
      { heading: "Project focus", body: "The case study centers on Cisco networking techniques and onsite infrastructure work, alongside the application delivered for the coursework." },
      { heading: "Source structure", body: "The repository separates the Next.js frontend, backend services, Kubernetes manifests, scripts, and an HAProxy configuration." },
    ],
    media: [],
  },
  {
    slug: "taskalender",
    number: "08",
    title: "TasKalender",
    eyebrow: "Android organizer technical test",
    summary: "An Android organizer combining tasks, notes and folders, and income and expense records, built as a technical test for a full-time Lab Assistant role.",
    category: "Mobile",
    context: "Solo technical test project",
    status: "Technical test project",
    contribution: "Built the entire project independently for the technical test.",
    tech: ["Kotlin", "Android", "MVVM", "Firebase", "Firestore"],
    source: { label: "Source repository", href: "https://github.com/alexcsl/TasKalender", revision: "2c3faa0d30e534dab7c92cb4e122a699ce444673" },
    links: [],
    sections: [
      { heading: "Workflows", body: "The source includes user-scoped task records, notes organized in folders, transaction records, categories, and user profiles." },
      { heading: "Engineering choices", body: "Kotlin view models connect Android XML screens to Firebase Authentication and Firestore-backed repositories." },
    ],
    media: [],
  },
  {
    slug: "hwixel",
    number: "09",
    title: "Hwixel",
    eyebrow: "Student project coordination",
    summary: "An Android team coursework application for coordinating student projects through tasks, membership, attendance, peer evaluation, and shared resources.",
    category: "Mobile",
    context: "Team coursework project",
    status: "Coursework prototype",
    contribution: "Worked full stack with a teammate across assigned phases, implementing Android screens and their data and persistence layers.",
    tech: ["Kotlin", "Android", "Firebase", "Room", "WorkManager"],
    source: { label: "Source repository", href: "https://github.com/alexcsl/Hwixel", revision: "091e8aadf73ebeaf11165aa540138a162a86ebe8" },
    links: [
      { label: "Project and task management contribution", href: "https://github.com/alexcsl/Hwixel/pull/2" },
      { label: "Attendance and UI redesign contribution", href: "https://github.com/alexcsl/Hwixel/pull/4" },
      { label: "Peer evaluation contribution", href: "https://github.com/alexcsl/Hwixel/pull/5" },
      { label: "Shared files contribution", href: "https://github.com/alexcsl/Hwixel/pull/6" },
      { label: "Notifications contribution", href: "https://github.com/alexcsl/Hwixel/pull/7" },
    ],
    sections: [
      { heading: "Phased full-stack work", body: "The pull requests document work on phases 4 and 5 for project hubs, members and task management; phase 7 attendance and a UI redesign; phase 8 peer evaluation; phase 9 shared links; and phase 10 notifications." },
      { heading: "UI and data layers", body: "The changes pair fragments, view models and XML layouts with repositories, Firebase sources, local persistence and scheduled reminders. Both teammates worked across the stack in different phases." },
    ],
    media: [],
  },
  {
    slug: "lively",
    number: "10",
    title: "Lively",
    eyebrow: "Family companion hackathon prototype",
    summary: "A family-companion prototype with a mobile app and backend for configuring a companion persona and reviewing a parent's routines and conversation context.",
    category: "Mobile",
    context: "Garuda Hacks 7.0 project",
    status: "Hackathon prototype",
    contribution: "Built frontend and backend functionality for the project.",
    tech: ["React Native", "Expo", "TypeScript", "REST APIs"],
    source: { label: "Mobile source repository", href: "https://github.com/LivelyHub/lively-mobile", revision: "6e1321a631997a4122aab3165ababf062c6bb7ad" },
    links: [{ label: "Backend source repository", href: "https://github.com/LivelyHub/lively-backend" }],
    sections: [
      { heading: "Product context", body: "The mobile app is designed for an adult child to configure a companion persona for a parent and review conversation context, routine records, and alerts." },
      { heading: "Engineering choices", body: "An Expo and React Native app communicates through the backend API rather than accessing the database or WhatsApp directly." },
      { heading: "Hackathon context", body: "Built for the Health track at Garuda Hacks 7.0 as a family-companion prototype." },
    ],
    media: [],
  },
  {
    slug: "backr",
    number: "11",
    title: "Backr",
    eyebrow: "Athlete-support platform",
    summary: "A team Solana project exploring athlete campaigns, recurring supporter subscriptions, and reward tiers.",
    category: "Web",
    context: "Team project",
    status: "Development prototype",
    contribution: "Implemented the frontend and contributed to business-development pitch preparation with the team.",
    tech: ["React", "TypeScript", "Solana", "FastAPI", "PostgreSQL"],
    source: { label: "Team source repository", href: "https://github.com/kls028/backr", revision: "4964ec51ec70a565baa278c154fe467eae780762" },
    links: [],
    sections: [
      { heading: "Product context", body: "The project requirements describe athlete profiles, campaign publication, supporter subscriptions, funding thresholds, reward tiers, and fulfillment." },
      { heading: "Frontend contribution", body: "The contribution centers on the user-facing application and pitch support. The on-chain program and backend are part of the team's wider architecture." },
    ],
    media: [],
  },
  {
    slug: "fishit",
    number: "12",
    title: "FishIt",
    eyebrow: "Fishing-themed Web3 prototype",
    summary: "A gamified staking prototype that connects fishing mechanics, bait selection, and virtual fish collectibles.",
    category: "Game",
    context: "Web3 project",
    status: "GameFi prototype",
    contribution: "Implemented frontend and backend functionality across the project.",
    tech: ["Web3", "ERC-20", "ERC-721", "IPFS"],
    source: { label: "Source repository", href: "https://github.com/muhamadisro27/fish-it", revision: "f67dffbc14f8b20956765d5a770d94f12b147675" },
    links: [],
    sections: [
      { heading: "Game concept", body: "The project describes a stake-to-fish loop with bait selection, casting, a timed reaction, and fish collectibles." },
      { heading: "Full-stack contribution", body: "The work spans the frontend experience and backend functionality for the fishing-themed prototype." },
    ],
    media: [],
  },
  {
    slug: "octora",
    number: "13",
    title: "Octora",
    eyebrow: "Product strategy and business development",
    summary: "Product requirements and business-development work for a team project focused on Meteora liquidity-provider execution on Solana.",
    category: "Product strategy",
    context: "Team hackathon project",
    status: "National Campus Hackathon second place",
    contribution: "Worked on business development, authored product requirements, and helped define the overall business structure.",
    tech: ["Product strategy", "PRDs", "Solana", "Meteora"],
    source: { label: "Colosseum project entry", href: "https://colosseum.com/arena/projects/octora", revision: "public-submission-observed-2026-10-28" },
    links: [
      { label: "Official second-place result", href: "https://superteam.fun/earn/feed/submission/58c616a1-2ce9-432b-8994-34b55391d71d" },
      { label: "Canva pitch deck", href: "https://canva.link/3iw69gecfdzhfv4" },
      { label: "Pitch video", href: "https://www.loom.com/share/1606d6000d1c4fa2a4aaac0ed7ec402a" },
      { label: "Product demo", href: "https://www.loom.com/share/30689bda0596451b92cea59008e08234" },
    ],
    sections: [
      { heading: "Product and business work", body: "The requirements and pitch frame the liquidity-provider problem, target users, product workflows, business model, and the structure of the proposed offering." },
      { heading: "Hackathon result", body: "The official Superteam Indonesia results list Alexander Christian's Octora submission in second place at the Indonesia National Campus Hackathon." },
      { heading: "Pitch and demo", body: "The Colosseum entry links to the team's public pitch and product-demo videos. The gallery contains a still from that pitch presentation." },
    ],
    media: [
      { kind: "video-still", src: "/assets/projects/octora/01-public-pitch-cover.png", width: 1416, height: 765, alt: "Octora title slide shown in the team's public pitch video with the presenter and Canva deck link.", caption: "Octora pitch presentation.", capturedAt: "2026-10-28", sourceRevision: "loom:1606d6000d1c4fa2a4aaac0ed7ec402a; frame:1s; observed:2026-10-28" },
    ],
  },
  {
    slug: "tpaxl",
    number: "14",
    title: "Arcane Ring",
    eyebrow: "Elden Ring-inspired Unity game",
    summary: "An Elden Ring-inspired game prototype built in Unity.",
    category: "Game",
    context: "Game-development project",
    status: "Game prototype",
    contribution: "Built an Elden Ring-inspired Unity game prototype.",
    tech: ["Unity", "C#"],
    source: { label: "Local Unity project", revision: "local-build:BuildTPA/TPAXL.exe; identity-confirmed-2026-10-28" },
    links: [],
    sections: [
      { heading: "Game context", body: "An Elden Ring-inspired Unity game-development project." },
    ],
    media: [
      { kind: "application", src: "/assets/projects/arcane-ring/01-main-menu.jpg", width: 1707, height: 1067, alt: "Arcane Ring title screen with gold typography over a rocky fantasy environment.", caption: "Arcane Ring title screen. Unity development build.", capturedAt: "2026-10-28", sourceRevision: "local-build:BuildTPA/TPAXL.exe; native-capture:2026-10-28" },
    ],
  },
];
