import { $ } from "bun"
import { transformSync } from "esbuild"
import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs"
import path from "path"

const SRC_FOLDER = "./src"
const DIST_FOLDER = "./dist"

export const listAllFiles = (dir: string): string[] => {
  const files: string[] = []
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      files.push(...listAllFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

export const transpileTypeScriptFile = async (file: string) => {
  const fileRelativePath = path.relative(SRC_FOLDER, file)
  const outputPath = path.join(DIST_FOLDER, fileRelativePath.replace(/\.ts$/, ".js"))

  const code = await Bun.file(file).text()

  try {
    const transpiledCode = transformSync(code, { loader: "ts", target: "esnext", format: "esm" })
    mkdirSync(path.dirname(outputPath), { recursive: true })
    writeFileSync(outputPath, transpiledCode.code, "utf8")
  } catch (e) {
    console.log(`Error transpiling file ${file}:`, e)
  }
}

export const copyAssetFile = async (file: string) => {
  const fileRelativePath = path.relative(SRC_FOLDER, file)
  const outputPath = path.join(DIST_FOLDER, fileRelativePath)

  mkdirSync(path.dirname(outputPath), { recursive: true })

  await $`cp ${file} ${outputPath}`
}

export const transpileOrCopyFiles = async (files: string[]) => {
  const promises = files.map((file) => {
    if (file.endsWith(".ts")) {
      return transpileTypeScriptFile(file)
    } else {
      return copyAssetFile(file)
    }
  })

  await Promise.all(promises)
}
