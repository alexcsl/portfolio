# alexcsl.dev — Personal Portfolio

Minimalist, glassmorphism portfolio for Alexander C.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Glassmorphism aesthetic with animated gradient orbs
- Electric blue accent on black/white base
- Fixed dark presentation set by the root layout
- Scroll-triggered reveal animations on every section
- 3D tilt on project cards (mouse-tracking, spring-damped)
- Filterable project grid (Blockchain / AI / Web / Game)
- Fully responsive (mobile ≥ 360px through 4K)
- Downloadable CV (`/Alexander_CV.pdf`)
- Security headers and a content security policy configured in `next.config.mjs`
- SEO metadata, Open Graph, robots.txt, SVG favicon

## Local development

```bash
npm ci
npm run dev
```

Use Node.js 24.22.1 or newer within the 24.x line. The production content security policy excludes `unsafe-eval`; development mode permits it for Next.js tooling.

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run check
npm start
```

## Deploying to Vercel

### Option A — Connect via GitHub (recommended)

1. Create a new GitHub repository (e.g. `portfolio` under `github.com/alexcsl`).
2. From this folder, initialize git and push:

   ```bash
   git init
   git add .
   git commit -m "chore: initial portfolio"
   git branch -M main
   git remote add origin https://github.com/alexcsl/portfolio.git
   git push -u origin main
   ```

3. Go to [vercel.com/new](https://vercel.com/new), pick the repo, and click **Deploy**.
   Vercel auto-detects Next.js — no configuration needed.
4. Every `git push` to `main` triggers an auto-deploy.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # link project and deploy a preview
vercel --prod   # promote to production
```

## Editing content

All content lives in **[`lib/data.ts`](./lib/data.ts)**:

- `SITE` — name, email, social URLs, CV path
- `ABOUT` — bio and highlight stats
- `PROJECTS` — project list with tags, tech, links
- `SKILLS` — tech stack groups
- `EXPERIENCE` — work history (not currently displayed; add a component if desired)

Edit the file, save, and the site updates. No markdown files to manage.

## Swapping the CV

Replace `public/Alexander_CV.pdf` with a new PDF (same filename) and redeploy.

## Tech

| Area       | Tool                   |
| ---------- | ---------------------- |
| Framework  | Next.js 16 App Router  |
| Styling    | Tailwind CSS 3.4       |
| Animation  | Framer Motion 14       |
| Icons      | lucide-react           |
| Theming    | next-themes            |
| Fonts      | Inter + JetBrains Mono |
| Deploy     | Vercel                 |

## License

© Alexander Christian Suryanto Linggodigdo. Source code is yours to use, modify, and
redeploy for your own portfolio — credit appreciated, not required.
