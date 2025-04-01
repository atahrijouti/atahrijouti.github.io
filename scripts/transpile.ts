import { $ } from "bun"
import { transformSync } from "esbuild"
import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs"
import path from "path"
import importMap from "../src/import-map.json"

const SRC_FOLDER = "./src"
const DIST_FOLDER = "./dist"
const NODE_MODULES_FOLDER = "./node_modules"

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
    mkdirSync(path.dirname(outputPath), { recursive: true })

    const transpiled = transformSync(code, {
      loader: "ts",
      target: "esnext",
      format: "esm",
    })

    writeFileSync(outputPath, transpiled.code, "utf8")
  } catch (e) {
    console.log(`Error transpiling file ${file}:`, e)
  }
}

export const copyKeepingStructure = async (file: string, src: string, dest: string) => {
  const fileRelativePath = path.relative(src, file)
  const outputPath = path.join(dest, fileRelativePath)

  mkdirSync(path.dirname(outputPath), { recursive: true })

  await $`cp ${file} ${outputPath}`
}

export const transpileOrCopyFiles = async (files: string[]) => {
  const srcPromises = files.map((file) => {
    if (file.endsWith(".ts")) {
      return transpileTypeScriptFile(file)
    } else {
      copyKeepingStructure(file, SRC_FOLDER, DIST_FOLDER)
    }
  })

  const nodeModulesPromises = Object.values(importMap)
    .filter((target) => target.startsWith("./node_modules/"))
    .map((target) => {
      const relativeToNodeModules = target.replace("./node_modules/", "")
      const src = path.join(NODE_MODULES_FOLDER, relativeToNodeModules)
      const dest = path.join(`${DIST_FOLDER}/node_modules`, relativeToNodeModules)
      copyKeepingStructure(target, src, dest)
    })

  await Promise.all([...srcPromises, ...nodeModulesPromises])
}
