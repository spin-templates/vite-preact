# AGENTS.md

Scaffolded with [Spin](https://spincli.pages.dev). This file helps agentic
tools work in this project without being told the obvious twice.

## Stack

Vite + Preact. Version pins live in `package.json`. The scaffold was
generated in either the JavaScript or TypeScript variant — read
`package.json` and `vite.config.ts` before assuming what is installed.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — `tsc -b && vite build` (TS variant) or `vite build`
  (JS variant)
- `npm run lint` — `eslint .` (config in `eslint.config.js`)
- `npm run preview` — serve the production build locally

If the project uses bun/pnpm/yarn (check for `bun.lock` / `pnpm-lock.yaml`),
use that package manager instead of npm.

## Layout

- `src/main.tsx` — entry point; calls `initTheme()` then renders `<App />`
- `src/app.tsx` — the blueprint-sheet showcase: a bordered sheet with corner
  ticks, a dimension line (framework label), display headline, tagline, CTA
  buttons (GitHub + Registry, each with a 14px `.btn-icon` SVG), docs and
  community refs, and a 4-cell title block (Project/Stack/Scaffold/License).
  Gated on the `include_demo` scaffold option — blank scaffolds render a
  minimal project-name block (`.blank` in `src/app.css`) instead. Replace
  this file as the app grows.
- `src/site.ts` — the content the starter renders from (name, description,
  links, tool rows, toggles). Edit this before touching `app.tsx`.
- `src/theme.ts` — theme preference resolution (see below); `initTheme()`
  runs in `src/main.tsx` before render
- `src/ThemeSwitcher.tsx` — the segmented Light/Dark/System control,
  absolutely positioned at the sheet's top right
- `src/app.css` — sheet and blank styles; `src/index.css` — global styles
  and the design tokens (see below)
- `public/` — static assets served at `/` (favicon)

## Design tokens

`src/index.css` defines the palette as CSS custom properties (light in
`:root`, dark in `:root[data-theme='dark']`). Use them instead of hardcoded
colors:

- `--ui-bg`, `--ui-bg-muted`, `--ui-bg-elevated`, `--ui-bg-accented`,
  `--ui-bg-inverted` — surfaces
- `--ui-text`, `--ui-text-muted`, `--ui-text-dimmed`, `--ui-text-highlighted`,
  `--ui-text-inverted` — text
- `--ui-border`, `--ui-border-muted`, `--ui-border-accented` — borders
- `--ui-primary` — orange accent

Semantic role vars sit on top: `--page-bg`, `--sheet-bg`, `--sheet-border`,
`--sheet-shadow`, `--btn-secondary-border`. If you add colors, add both
light and dark sides. Fonts: Space Grotesk (display), Inter (body), JetBrains
Mono (labels/refs) via Google Fonts in `index.html`.

Themes: `src/theme.ts` resolves the preference (localStorage key `theme`;
`system` follows `prefers-color-scheme`) and sets `data-theme` on `<html>`.
The `ThemeSwitcher` component (segmented Light/Dark/System at the sheet's
top right) controls it; `initTheme()` runs in `src/main.tsx` before render.

## Conventions

- Import hooks from `preact/hooks` (`useState`, `useEffect`, ...) — not from
  `react`.
- `App` is a named export from `src/app.tsx`; `main.tsx` imports it as
  `{ App }`.
- One component per file under `src/`.
- Styles use native CSS nesting (Vite handles it; no preprocessor).
- Keep the starter minimal: no state management library unless the feature
  genuinely needs it.