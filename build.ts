import { file, write, $ } from "bun";
import { assemblePage } from "./utils/assemble-page";
import { mkdir, rm } from "node:fs/promises";

const distDir = "./dist";

const build = async () => {
  try {
    await rm(distDir, { recursive: true, force: true });
  } catch {}

  await mkdir(distDir);

  await $`cp -R ./src/app ./dist/`;

  const pages = ["home", "playground"];
  for (const page of pages) {
    const html = await assemblePage(page);
    const outputFile = `${distDir}/${page}.html`;
    await write(outputFile, html);
    console.log(`Generated: ${outputFile}`);
  }
};

build().catch(console.error);
