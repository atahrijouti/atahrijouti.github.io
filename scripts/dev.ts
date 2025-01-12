import { $ } from "bun";

await Promise.all([
  $`bun run server.ts`, //
  $`bun run scripts/transpile.ts`, //
]);
