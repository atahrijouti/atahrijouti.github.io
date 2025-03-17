import { write, $ } from "bun"
import { assemblePage } from "./assemble-page"

const outDir = "./out"

const build = async () => {
  await $`rm -rf ${outDir}`
  await $`mkdir ${outDir}`
  await $`cp -R ./src/app ${outDir}/`

  const pages = ["home", "playground"]
  for (const page of pages) {
    const { html } = await assemblePage(page)
    const outputFile = `${outDir}/${page}.html`
    await write(outputFile, html)
    console.log(`Generated: ${outputFile}`)
  }
}

build().catch(console.error)
