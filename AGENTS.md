# AGENTS.md

## Project Overview

`vue-temp-var` is a single-component Vue library for defining temporary variables inside a template with full type inference: `<TempVar v-slot="{ x }" :define="{ x: … }">` passes the `define` prop through a scoped slot, so destructured values keep their types and stay reactive (see vuejs/rfcs#505). Published as dual ESM/CJS with a `vue >=3.3` peer dependency.

**Repository structure:**
```
src/TempVar.vue       # The entire component (generic script-setup + slot passthrough)
src/index.ts          # Re-exports the component as default
vite.config.ts        # vite lib build (es + cjs) + vite-plugin-dts + d.cts copy hook
tsconfig.lib.json     # Library sources (extends @deviltea/tsconfig/dom)
tsconfig.node.json    # vite.config.* (extends @deviltea/tsconfig/node)
pnpm-workspace.yaml   # pnpm supply-chain security settings only (single-package repo)
.github/workflows/    # release.yml (CI release), security-audit.yml (weekly pnpm audit)
```

## Setup Commands

```bash
# Install dependencies
pnpm install

# Build (runs type-check + vite build in parallel -> dist/)
pnpm build

# Rebuild on change during development
pnpm dev

# Type check only (vue-tsc over tsconfig.lib.json)
pnpm type-check

# Lint / lint and fix
pnpm lint
pnpm lint:fix
```

## Code Style

- TypeScript strict mode via `@deviltea/tsconfig` (`/dom` for src, `/node` for vite config)
- ESLint flat config extending `@deviltea/eslint-config` (tabs, single quotes, no semicolons)
- The whole library is `src/TempVar.vue` — keep it a single generic component with zero runtime dependencies (peer `vue` only)

## Testing

No test suite — validation is `pnpm build` (includes vue-tsc type-check) + `pnpm lint`.

## Release

- Releases run in CI: trigger the `Release` workflow (workflow_dispatch) with a `bump_type` (patch/minor/major). It validates (`pnpm build && pnpm lint`), bumps the version with `bumpp` (pushes the release commit + `v*` tag), publishes to npm via trusted publishing (OIDC — no token secret), then generates GitHub release notes with `changelogithub`.
- The local `pnpm release` script bypasses CI validation and produces no GitHub release notes — prefer the workflow.
- `prepublishOnly` builds automatically before publish

## Gotchas

- vite-plugin-dts >=5 emits declarations directly into `dist/` (custom `outDir` is no longer supported); the `afterBuild` hook copies `dist/index.d.ts` to `dist/index.d.cts` so the `require` export condition passes publint — keep package.json `exports` paths in sync with this layout
- `pnpm-workspace.yaml` exists only to hold pnpm supply-chain security settings; `strictDepBuilds` is on (only `esbuild` is in `ignoredBuiltDependencies`) — new deps that need build scripts must be reviewed into the lists
- `shellEmulator: true` — keep any glob in package.json scripts quoted
- Node >= 24 required (`engines`)
- A weekly `security-audit.yml` workflow runs `pnpm audit --audit-level=moderate` (Sundays 21:00 UTC)
