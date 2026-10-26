# ANJORYX Technologies — Frontend

Vite + React + Tailwind CSS + Framer Motion frontend for ANJORYX Technologies,
wired to the Spring Boot `/api/contact` endpoint in `anjoryx-backend`.

## What's in this version

- **Light-first design system** — mist canvas, azure + aqua accents, coral highlight and
  pastel tints, all defined as CSS variables in `src/index.css`. Dark mode is an opt-in
  remap of the same tokens (toggle in the navbar, persisted, no flash on load).
- **3D stack roller** (`src/components/StackRoller.jsx`) — a real CSS-3D drum in the hero:
  idles on its own, speeds up as you scroll, drag it with the mouse (it keeps its
  momentum), and it leans toward the pointer. No WebGL / no extra dependency.
- Motion used with intent: hero entrance, roller, scroll-drawn process line, pausable
  technology ticker, animated borrow/return lifecycle. Everything respects
  `prefers-reduced-motion`.
- Real pages: Home, Services, Projects + case study, Pricing, Contact (client + server
  validation). Solutions / About / FAQ / legal pages are honest placeholders.
- Accessible by default: skip link, focus rings, labelled form errors, `aria-live` status.

## Local setup

```bash
npm install
cp .env.example .env      # set VITE_API_BASE_URL etc.
npm run dev               # http://localhost:5173
npm run build             # production build in dist/
npm run lint
```

## Environment variables

See `.env.example`. All are public (`VITE_` prefix) — no secrets belong here.

## Structure

```
src/
├── components/   Navbar, Footer, Button, Logo, Reveal, SEO, StackRoller, PriceCard, ProjectCard…
├── layouts/      MainLayout (skip link, ScrollManager, Navbar, Footer)
├── sections/     Home sections (Hero, TechMarquee, Values, Services, Technology, HowWeWork…)
├── pages/        Home, ServicesPage, ProjectsPage, ProjectDetail, PricingPage, Contact, ComingSoon, NotFound
├── data/         services.js, technologies.js, projects.js, pricing.js
├── hooks/        useTheme.js
├── utils/        config.js
└── services/     contactApi.js (Axios client)
```

## Tuning the roller

Constants at the top of `StackRoller.jsx`: `LAYERS` (panels), `FACE_W/FACE_H` (panel size),
`IDLE_SPEED` (deg/ms). Add or remove layers freely — the radius is computed from the count.
