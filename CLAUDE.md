# Traxd — Project Context for Claude Code

Traxd ("Trax-Day") is a personal side project: a mobile app with two core features —
1. **Place/food tracker** — log visited locations, tag items as good/bad for future reference
2. **Bill/reminder tracker** — with push notifications

## Why This Project Exists (read this first)

This project's primary purpose is **brushing up backend knowledge**. The owner (Ranidu) works a frontend-focused day job (React) and uses Traxd specifically to rebuild and deepen Node.js/backend skills that don't get exercised at work. A secondary purpose is experimenting with newer tools (Prisma v7, Turborepo, etc.).

**This changes how Claude Code should behave on `apps/api`:**
- Prioritize explaining *why*, not just generating working code. The goal is understanding, not just a shipped feature.
- Don't silently "fix" or simplify backend architecture decisions (repo layer, two-router pattern, custom error handling) — these exist on purpose as learning exercises in proper patterns, even when a simpler shortcut exists.
- When implementing something non-trivial in the backend, surface the reasoning/tradeoffs rather than just writing the code and moving on.
- The mobile app (`apps/mobile`) is comparatively lower-stakes — it exists to consume the backend and is fine to move through faster, since React/RN is closer to Ranidu's existing strength.

## Tech Stack

- **Mobile:** React Native with Expo (managed workflow)
- **Backend:** Node.js with Express
- **Database:** PostgreSQL — Docker locally (container: `traxd-postgres`, postgres:17), Supabase free tier for Phase 1, AWS RDS for Phase 2
- **ORM:** Prisma v7 with `@prisma/adapter-pg` (required in v7 — `PrismaClient` will not work without a driver adapter)
- **Monorepo:** Turborepo + pnpm
- **Auth:** `jose` for JWT (`jwtVerify`), `bcrypt` for password hashing
- **Hot reload (API):** `tsx watch` (not nodemon — must include `watch` flag explicitly in dev script)
- **DB GUI:** TablePlus
- **Local mobile builds:** `eas build --local` (unlimited, free); Xcode + Android Studio installed
- **Styling (mobile):** NativeWind (Tailwind for React Native)

## Monorepo Structure

```
apps/mobile          → @traxd/mobile (Expo, TypeScript, NativeWind)
apps/api             → @traxd/api (Express, Prisma, jose)
packages/types       → @traxd/types (shared TS types between api/mobile)
packages/eslint-config       (planned)
packages/typescript-config   (planned)
packages/prettier-config     (planned)
```

See `apps/api/CLAUDE.md` and `apps/mobile/CLAUDE.md` for package-specific conventions.

## Cross-Cutting Principles

- **Verify, don't assume** — especially for Prisma v7 specifics. Training knowledge has been outdated on Prisma v7 multiple times during this project. When in doubt, check official docs (prisma.io/docs) before implementing.
- **Architecture decisions are intentional, not accidental.** Don't "simplify away" patterns like the repo layer or two-router split without raising it first — they were chosen deliberately (see `apps/api/CLAUDE.md` for reasoning).
- **TypeScript config differs by package:**
  - `apps/api`: `module: "NodeNext"` + `moduleResolution: "NodeNext"`
  - `apps/mobile`: `module: "ESNext"` + `moduleResolution: "Bundler"`
- Project decisions and longer-form documentation also live in Notion (parent page: "Traxd"). This file is the fast-loading summary Claude Code should trust as ground truth for conventions; Notion has more narrative detail if needed.

## PR Conventions

- **Title:** conventional-commit style — `type: short description` (e.g. `feat: add place/visit tracking models and mobile auth screens`). Common types: `feat`, `fix`, `chore`, `refactor`, `docs`. If a PR bundles unrelated concerns (e.g. backend models + mobile screens), a single umbrella title is fine for this solo project — no need to split into multiple PRs just for title cleanliness.
- **Description template:**
  ```
  ## Summary
  - Bullet per logical change, grouped by area (api / mobile / packages)

  ## Test plan
  - [ ] Have you run `pnpm tsc-check` to detect any lint errors
  - [ ] Checklist of what to verify (commands to run, screens to click through)
  ```
- Apply this automatically when creating or editing PRs — no need to ask each time unless the change set is unusual.

## Commands Reference (keep updated)

- `pnpm install` — install all workspace deps from root
- `eas build --local` — local Expo build (mobile)
- New commands discovered during sessions should be added here AND to the Notion "Commands Reference" page.
