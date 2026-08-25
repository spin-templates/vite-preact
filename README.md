# Spin Template: Vite + Preact

A [Spin](https://spincli.pages.dev) template for scaffolding **Vite + Preact** projects with HMR and TypeScript support.

## Usage

```bash
# From the official Spin registry
spin new myapp official/vite-preact

# Directly from the template repository
spin new myapp https://github.com/spin-templates/vite-preact
```

## Parameters

| Parameter       | Type     | Description                              | Default     |
| --------------- | -------- | ---------------------------------------- | ----------- |
| project_name    | text     | Project name (auto-injected by Spin)     | —           |
| variant         | select   | Which language variant?                  | typescript  |
| package_manager | select   | Which package manager?                   | npm         |
| use_docker      | bool     | Include Docker support?                  | false       |
| git_init        | bool     | Initialize a git repository?             | true        |
| description     | textarea | What is your project description?        | —           |
| include_agents_md | bool     | Include AGENTS.md with agent instructions? | true        |
| include_demo     | bool     | Include the showcase UI?                  | true        |
| tailwind         | bool     | Include Tailwind CSS v4?                  | false       |

## Variants

- **javascript**: Preact with `vite.config.js`, `src/app.jsx`, `src/main.jsx`
- **typescript**: Preact + TypeScript with `vite.config.ts`, `tsconfig*.json`, `src/app.tsx`, `src/main.tsx`

## Hooks

### Post-hooks

- `git init && git add -A && git commit -m "Initial commit - Spin"` — initializes git repo (when git_init is true)

- `{{ .package_manager }} install` — installs project dependencies

License [MIT](./LICENSE)
