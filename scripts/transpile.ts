import { $ } from "bun"
import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs"
import path from "path"

const SRC_FOLDER = "./src"
const DIST_FOLDER = "./dist"

const transpiler = new Bun.Transpiler({
  loader: "ts",
  target: "bun",
})

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

export const transpileTypeScriptfile = async (file: string) => {
  const fileRelativePath = path.relative(SRC_FOLDER, file)
  const outputPath = path.join(DIST_FOLDER, fileRelativePath.replace(/\.ts$/, ".js"))

  const code = await Bun.file(file).text()
  const transpiledCode = transpiler.transformSync(code)

  mkdirSync(path.dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, transpiledCode, "utf8")

  // console.log(`Transpile :\t${file} -> ${outputPath}`)
}

export const copyAssetFiles = async (file: string) => {
  const fileRelativePath = path.relative(SRC_FOLDER, file)
  const outputPath = path.join(DIST_FOLDER, fileRelativePath)

  mkdirSync(path.dirname(outputPath), { recursive: true })

  await $`cp ${file} ${outputPath}`
}

export const transpileOrCopyFiles = async (tsFiles: string[]) => {
  for (const file of tsFiles) {
    if (file.endsWith(".ts")) {
      transpileTypeScriptfile(file)
    } else {
      copyAssetFiles(file)
    }
  }
}
