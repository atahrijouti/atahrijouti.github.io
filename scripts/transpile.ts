// import { watch } from "fs/promises";
import { $ } from "bun";
import { readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import path from "path";

const SRC_FOLDER = "./src";
const DIST_FOLDER = "./dist";

const transpiler = new Bun.Transpiler({
  loader: "ts",
  target: "browser",
});

function listTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...listTypeScriptFiles(fullPath));
    } else if (fullPath.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function remakeDist() {
  await $`rm -rf ${DIST_FOLDER}`;
  await $`mkdir ${DIST_FOLDER}`;
}

async function transpileAndWriteFiles(tsFiles: string[]) {
  for (const file of tsFiles) {
    const code = await Bun.file(file).text();

    const relativePath = path.relative(SRC_FOLDER, file);
    const outputPath = path.join(
      DIST_FOLDER,
      relativePath.replace(/\.ts$/, ".js"),
    );

    // const result = transpiler.transformSync(code);
    console.log(relativePath, transpiler.scanImports(code));

    // mkdirSync(path.dirname(outputPath), { recursive: true });

    // writeFileSync(outputPath, result, "utf8");

    // console.log(`Transpiled: ${file} -> ${outputPath}`);
  }
}

await remakeDist();

transpileAndWriteFiles(listTypeScriptFiles(SRC_FOLDER)).catch((err) => {
  console.error("Error during transpilation:", err);
});

// const watcher = watch("./src", { recursive: true, persistent: true });

// for await (const event of watcher)
//   transpileAndWriteFiles([`${SRC_FOLDER}/${event.filename}`]);
