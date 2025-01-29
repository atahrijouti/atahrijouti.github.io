import { write, $ } from "bun"
import { assemblePage } from "./utils/assemble-page"

const distDir = "./dist"

const build = async () => {
  await $`rm -rf ${distDir}`
  await $`mkdir ${distDir}`
  await $`cp -R ./src/app ${distDir}/`

  const pages = ["home", "playground"]
  for (const page of pages) {
    const html = await assemblePage(page)
    const outputFile = `${distDir}/${page}.html`
    await write(outputFile, html)
    console.log(`Generated: ${outputFile}`)
  }
}

build().catch(console.error)
