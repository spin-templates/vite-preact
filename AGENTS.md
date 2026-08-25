# AGENTS.md

This is a **Spin template** for Vite + Preact. This file is for agents
working on the template itself (`spin.toml`, `_base/`). Projects scaffolded
from it carry their own AGENTS.md, rendered from `_base/AGENTS.md`.

## What a Spin template is

- `spin.toml` — manifest: metadata, `[params]`, `[[include]]` rules,
  `[[post]]` hooks, `exclude`.
- `_base/` — file tree. `*.tmpl` files are rendered through Go's
  `text/template` (suffix stripped on write); everything else copies
  verbatim. Binary assets are never `.tmpl`.

Docs: `https://spincli.pages.dev/docs/templates/anatomy`.

## Params

| param           | type     | default     | used in                        |
| --------------- | -------- | ----------- | ------------------------------ |
| variant         | select   | typescript  | most `.tmpl` files, includes   |
| package_manager | select   | npm         | install hook, Dockerfile.tmpl  |
| use_docker      | bool     | false       | Dockerfile / .dockerignore     |
| git_init        | bool     | true        | git post-hook (conditional)    |
| description     | textarea | ""          | README.md.tmpl, app.tsx        |
| include_agents_md | bool     | true        | AGENTS.md (include rule)            |
| include_demo     | bool     | true        | starter UI ({{ if .include_demo }}) gating     |
| tailwind         | bool     | false       | package.json.tmpl, vite.config.*.tmpl, demo UI, CSS |

## File tree rules

- `src/app.tsx` is `src/app.tsx.tmpl` (renders `{{ .name }}`,
  `{{ if .description }}`). JSX single braces (`{count}`) do not collide
  with Go's `{{ }}`.
- Variant files gated by `[[include]]` on `{{ eq .variant "..." }}`:
  `app.tsx.tmpl`/`app.jsx.tmpl`, `main.tsx`/`main.jsx`, `vite.config.ts`/`.js`,
  tsconfigs (TS only).
- `App` is a named export (`export function App`), imported as `{ App }` in
  `main.tsx`. Keep that contract.
- Include rule paths match the stripped output name. Files not in any rule
  are still copied (verified implementation behavior).
- `exclude` drops `node_modules/`, `.git/`, `dist/`.

## Hooks

1. Git init gated on `git_init` via `{{ if .git_init }}...{{ end }}` in the
   `run` string — rendered empty commands are no-ops (verified).
2. `{{ .package_manager }} install`.

## Iteration loop

```sh
spin new tmp ./templates/vite-preact --print-params
spin new tmp ./templates/vite-preact --dry-run
spin new tmp ./templates/vite-preact --dest /tmp/x --no-hooks --param variant=typescript
cd /tmp/x && bun install && bun run build   # tsc -b && vite build for TS
```

## Preact-specific notes

- Build is `tsc -b && vite build` (TS) or `vite build` (JS).
- Hooks come from `preact/hooks` — never `react`. The JSX pragma is handled
  by `@preact/preset-vite`.
- Component styles in `src/app.css`; global styles + palette in
  `src/index.css`. Native CSS nesting, no preprocessor.
- Bump pins in `package.json.tmpl` (`preact`, `@preact/preset-vite`,
  `vite`, `typescript`, `@types/node`) from create-vite releases.

## Branding

Spin look shared by all templates: `src/assets/spin.png`, the palette in
`src/index.css` (`--accent: #ff5a1f`, `--bg: #fff7ed` / `#1c1b19` dark), and
the starter UI in `app.tsx.tmpl` — a hero with a file-tree showcase and the
SPIN brand footer, driven by `src/site.ts.tmpl`. The showcase is gated on
`{{ if .include_demo }}`; blank scaffolds render a minimal project-name
block instead. Community links: `github.com/sam0uly/spin`,
`discord.gg/DTGm9MaEKH`, `x.com/sam0uly`; docs: `spincli.pages.dev`.

## Publishing

Plain git repo: `spin new myapp https://github.com/spin-templates/vite-preact`.
`tags` + `repository` in `spin.toml` feed search. See spin-docs
`5.templates/5.publish.md` for registry publishing.
