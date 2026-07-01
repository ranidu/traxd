# Traxd API — Backend Conventions for Claude Code

This is `@traxd/api`, the Express + Prisma backend for Traxd. Read the root `CLAUDE.md` first for overall project context.

> **Reminder:** the point of this backend is to brush up Node.js/backend skills, not just to ship a working API. When in doubt between "fastest implementation" and "implementation that teaches a proper pattern," favor the latter and explain the reasoning.

## Folder Structure (feature-based)

```
src/modules/<feature>/
  <feature>.controller.ts
  <feature>.service.ts
  <feature>.repo.ts
  <feature>.public.routes.ts     (if mixed public/protected endpoints)
  <feature>.protected.routes.ts
```

**Layering rule:** controller → service → repo.
- **Controller** — handles req/res, calls service, passes errors via `next(err)`
- **Service** — business logic, no direct Prisma calls
- **Repo** — the ONLY layer that talks to Prisma. This decouples the ORM from business logic intentionally — do not let services or controllers call `prisma.*` directly, and do not collapse this layer "for simplicity."

## Routing Pattern — Two Router Instances

Each module that has both public and protected endpoints splits into two router files, both mounted under the same base path. Example for `users`:

- `user.public.routes.ts` — register, login (no auth middleware)
- `user.protected.routes.ts` — `/me` and future protected endpoints (auth middleware applied)
- Both mounted under `/api/users`

This is a deliberate pattern, not an oversight — don't merge them into a single router.

## Error Handling

- Custom `AppError` class extends `Error`, uses `Object.setPrototypeOf` to preserve correct `instanceof` behavior through the prototype chain
- Caught by a global `errorMiddleware`, which must be registered **after all routes**
- **Controllers must forward errors via `next(err)`** — errors thrown synchronously or rejected in async handlers without `next(err)` will NOT reach `errorMiddleware`. This was an open bug being diagnosed — double check this when touching any controller, especially around Prisma calls (Prisma throws on its own error types, e.g. `PrismaClientKnownRequestError`).

## Auth

- JWT verification via `jose`'s `jwtVerify` (not `jsonwebtoken` — chosen for modern ESM compatibility)
- Middleware attaches a **minimal payload** to `req.user`: just `userId` and `email`. Don't bloat this with extra DB lookups in the middleware itself.
- Password hashing via `bcrypt`

## Prisma v7 — Critical Notes

Training data on Prisma v7 is frequently outdated. Verify against official docs (prisma.io/docs) before implementing anything Prisma-related. Known v7 breaking changes already hit in this project:

- `prisma generate` does **not** run automatically after `migrate dev` anymore — must run it explicitly
- `prisma-client` generator provider requires an explicit `output` path in the schema
- `PrismaClient` requires a driver adapter — this project uses `@prisma/adapter-pg`. Omitting it will break client instantiation.
- Schema lives at `prisma/` (repo root of `apps/api`)
- Generated client output goes to `src/generated/prisma` (chosen to satisfy the TypeScript `rootDir` constraint)
- `src/generated/` is gitignored — do not commit generated client output, and don't assume it exists on a fresh clone without running generate

## Data Model Notes

- `User` model: uses `uuid` as ID, `name` is required (not optional), soft delete via `deletedAt` (don't hard-delete users)

## Dev Workflow

- Hot reload via `tsx watch` — the `watch` flag must be explicit in the dev script, this is easy to drop accidentally when copying commands
- DB browsing via TablePlus (GUI), not psql by habit
- Local Postgres via Docker — container name `traxd-postgres`, image `postgres:17`. Docker Compose files should NOT include `version: '3.8'` — that key is obsolete in Compose V2 and may cause confusion/warnings.

## Working Style Notes

- The project owner (Ranidu) reviews architectural suggestions critically and verifies against official docs — treat pushback as signal to double-check, not as something to placate. Several past mistakes were corrected this way (missing adapter-pg, skipping the repo layer, dismissing the two-router pattern, missing the watch flag). Don't repeat these.
- When you discover a new useful command or Node.js/Prisma finding, surface it back to the user so it can be added to the project's Notion knowledge base — don't just silently use it and move on.
