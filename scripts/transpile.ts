import { $ } from "bun"
import { transformSync } from "esbuild"
import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs"
import path from "path"

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

const scanForNodeModulesImports = (fileContent: string): string[] => {
  const regex =
    /import\s+(?:.*\s+from\s+)?['"]\/node_modules\/[^'"]+['"]|from\s+['"]\/node_modules\/[^'"]+['"]/g

  const matches = fileContent.match(regex) || []

  const imports = matches
    .map((match) => {
      const pathMatch = match.match(/['"]\/node_modules\/[^'"]+['"]/)
      if (pathMatch) {
        // Remove quotes
        return pathMatch[0].slice(1, -1)
      }
      return null
    })
    .filter((match) => match != null)

  return imports
}

export const transpileTypeScriptFile = async (file: string) => {
  const fileRelativePath = path.relative(SRC_FOLDER, file)
  const outputPath = path.join(DIST_FOLDER, fileRelativePath.replace(/\.ts$/, ".js"))

  const code = await Bun.file(file).text()

  try {
    mkdirSync(path.dirname(outputPath), { recursive: true })

    const transpiledCode = transformSync(code, {
      loader: "ts",
      target: "esnext",
      format: "esm",
    }).code

    const imports = scanForNodeModulesImports(transpiledCode)
    imports.map((filePath) =>
      copyKeepingStructure(
        path.join("./node_modules", filePath.replace(/^\/node_modules\//, "")),
        NODE_MODULES_FOLDER,
        `${DIST_FOLDER}/node_modules`,
      ),
    )

    writeFileSync(outputPath, transpiledCode, "utf8")
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
  const promises = files.map((file) => {
    if (file.endsWith(".ts")) {
      return transpileTypeScriptFile(file)
    } else {
      copyKeepingStructure(file, SRC_FOLDER, DIST_FOLDER)
    }
  })

  await Promise.all(promises)
}
