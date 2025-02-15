import { $ } from "bun"
import { mkdirSync, readdirSync, statSync, watch, writeFileSync } from "fs"
import path from "path"

const SRC_FOLDER = "./src"
const DIST_FOLDER = "./dist"

const transpiler = new Bun.Transpiler({
  loader: "ts",
  target: "browser",
})

const listTypeScriptFiles = (dir: string): string[] => {
  const files: string[] = []
  const entries = readdirSync(dir)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      files.push(...listTypeScriptFiles(fullPath))
    } else if (fullPath.endsWith(".ts")) {
      files.push(fullPath)
    }
  }

  return files
}

const remakeDist = async () => {
  await $`rm -rf ${DIST_FOLDER}`
  await $`mkdir ${DIST_FOLDER}`
}

const transpileAndWriteFiles = async (tsFiles: string[]) => {
  for (const file of tsFiles) {
    const code = await Bun.file(file).text()

    const fileRelativePath = path.relative(SRC_FOLDER, file)
    const outputPath = path.join(DIST_FOLDER, fileRelativePath.replace(/\.ts$/, ".js"))

    const transpiledCode = transpiler.transformSync(code)

    mkdirSync(path.dirname(outputPath), { recursive: true })

    writeFileSync(outputPath, transpiledCode, "utf8")

    console.log(`Transpiled: ${file} -> ${outputPath}`)
  }
}

const transpileFutureChanges = () => {
  const watcher = watch("./src", { recursive: true, persistent: true })

  watcher.on("change", (_event, filename) => {
    console.log(`Transpile Watcher detected change on ${SRC_FOLDER}/${filename}`)
    if (filename.toString().endsWith(".ts")) {
      transpileAndWriteFiles([`${SRC_FOLDER}/${filename}`])
    }
  })
}

const program = async () => {
  await remakeDist()

  transpileAndWriteFiles(listTypeScriptFiles(SRC_FOLDER)).catch((err) => {
    console.error("Error during transpilation:", err)
  })

  transpileFutureChanges()
}

program()
