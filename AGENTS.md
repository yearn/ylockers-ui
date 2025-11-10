# Repository Guidelines

## Project Structure & Module Organization
The monorepo is managed with Bun workspaces under `packages/`. `packages/--lib/` is the shared Next 14 UI library that exposes reusable components, hooks, fonts, and Tailwind presets for every locker app. Product UIs such as `packages/prisma/` and `packages/crv/` layer their `app/`, `components/`, and `public/` assets on top of the shared library. Generate additional locker apps with `bun create-ylockers-ui-app.ts {BASE_TOKEN_NAME}`; the scaffold lands in `packages/{BASE_TOKEN_NAME}/` with ready-to-edit `.env` stubs and Tailwind config overrides.

## Build, Test, and Development Commands
Install dependencies once with `bun install`. Run local development servers via `bun dev:{token}` (for example `bun dev:prisma`) or `bun dev:--lib` when working on the shared library. Use `bun build:{token}` to produce production-ready Next builds, and `bun lint:{token}` or `bun lint:--lib` before every commit to confirm ESLint compliance. The `clean` script (`bun run clean`) removes workspace artifacts when caches misbehave.

## Coding Style & Naming Conventions
TypeScript is mandatory across the codebase. ESLint enforces single quotes, mandatory semicolons, one-true-brace style, and dense object/array spacing. Keep imports sorted automatically (`simple-import-sort`), remove unused imports (`unused-imports`), and prefer type-only imports (`@typescript-eslint/consistent-type-imports`). Naming rules require camelCase for variables, PascalCase or camelCase for functions, boolean variables prefixed with `is/has/should`, interfaces prefixed with `I`, and generic types prefixed with `T`. Tailwind is organized through `tailwind.config.ts`; extend rather than rewrite palettes, and always compose utility classes instead of hard-coded styles.

## Testing Guidelines
No dedicated test runner ships yet, so document any new test tooling in your PR. Co-locate unit or component tests beside the feature (`*.test.ts(x)`), and wire an accompanying `bun test` script when you introduce a framework. Minimum expectation today is thorough manual QA: exercise the locker flows under `packages/{token}/app/app/[tab]/page.tsx` in development mode and capture regression notes in the PR description.

## Commit & Pull Request Guidelines
Follow the existing Git history pattern: `type: summary` in the imperative (`feat: add curve drop claims`, `fix: chain id indicator`). Squash small fixup commits before opening the PR. Each PR should include a concise changelog, screenshots or screen recordings for UI updates, documented `.env` additions, and links to related issues or specs. State the manual test steps you performed so reviewers can reproduce them quickly.
