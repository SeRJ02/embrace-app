# EMBRACE — Dating / Social App

## Overview
Mobile-first (390×844 px) landing page faithful to Figma designs. The app scrolls vertically through two pages — a hero section and an "Our Formula" section — all centered in a dark viewport that simulates a phone screen.

## Tech Stack
- **Frontend**: React 18 + Wouter + TanStack Query v5 + Tailwind CSS + shadcn/ui
- **Backend**: Express 5 + TypeScript + Drizzle ORM (PostgreSQL)
- **Build**: Vite (dev) / esbuild (prod)
- **SSR**: `server/vite.ts` calls `entry-server.tsx` to pre-render `<LandinPage />` for fast first contentful paint; client always mounts with `createRoot` (no `hydrateRoot`) to avoid provider-mismatch issues

## Architecture
```
client/
  src/
    pages/LandinPage.tsx  — main page (inline styles, Figma pixel values)
    entry-server.tsx      — SSR render entry (renderToString of LandinPage)
    main.tsx              — CSR entry (createRoot)
    App.tsx               — React Router (wouter) + QueryClientProvider
  public/assets/
    p2-wave.svg           — wave decoration (SVG)
    p2-ellipse.svg        — portrait shadow ellipse (SVG)
    p2-portrait.png       — model portrait (JPEG)
    p2-banner.png         — bottom quote banner (JPEG)
  index.html              — contains <!--app-html--> SSR placeholder
server/
  vite.ts                 — dev server + SSR pre-render
  index.ts                — Express entry
  routes.ts               — API routes
  storage.ts              — IStorage CRUD interface
shared/
  schema.ts               — Drizzle models + Zod schemas
```

## Key Design Decisions
- **All page layout uses inline `style={}`** (not Tailwind) because the Figma design uses absolute pixel values
- **Fonts**: Abhaya Libre, Archivo Black, Caveat, Playfair Display (loaded from Google Fonts in index.html)
- **Sticky navbar** transitions: transparent + white text over hero → solid white + brown text over page 2
- **SVG assets** (wave, ellipse) were originally saved with `.png` extension from Figma export; re-copied as `.svg` files to fix broken rendering
- **SSR pattern**: server pre-renders page HTML → client uses `createRoot` (not `hydrateRoot`) to avoid mismatch with Radix UI / React Query providers that don't support `getServerSnapshot`

## Pages
| Section | Description |
|---------|-------------|
| Hero | Full-bleed couple photo, tagline "Find who you love. / Everyday♡" |
| Our Formula | Heading with gold gradient, body text, portrait photo, wave SVG, JOIN NOW button, bottom banner quote |
| Form placeholder | Dashed border placeholder section with "Registration Form — Coming Soon" copy and a JOIN NOW CTA |

## Running
`npm run dev` starts Express + Vite on port 5000. The "Start application" workflow handles this.
