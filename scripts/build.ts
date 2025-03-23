import { $ } from "bun"
import { readdirSync } from "fs"
import { assemblePage } from "./assemble-page"
import { listAllFiles, transpileOrCopyFiles } from "./transpile"

const OUT_DIR = "./out"
const SRC_FOLDER = "./src"
const DIST_FOLDER = "./dist"
const PUBLIC_FOLDER = "./public"

const pages = readdirSync("./src/app")

const build = async () => {
  await $`rm -rf ${OUT_DIR}`
  await $`mkdir ${OUT_DIR}`

  try {
    await transpileOrCopyFiles(listAllFiles(SRC_FOLDER))
  } catch (err) {
    console.error("Error during transpilation:", err)
  }

  await $`cp -r ${PUBLIC_FOLDER}/* ${OUT_DIR}/`
  await $`cp -r ${DIST_FOLDER}/* ${OUT_DIR}/`

  for (const page of pages) {
    const { html } = await assemblePage(page)
    const fileName = page === "home" ? "index" : page
    const outputFile = `${OUT_DIR}/${fileName}.html`
    await Bun.write(outputFile, html)
    console.log(`Generated: ${outputFile}`)
  }
}

build().catch(console.error)
