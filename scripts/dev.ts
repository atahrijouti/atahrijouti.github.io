import { $ } from "bun"

await Promise.all([
  $`bun run scripts/transpile.ts`, //
  $`bun run scripts/server.ts`, //
])
