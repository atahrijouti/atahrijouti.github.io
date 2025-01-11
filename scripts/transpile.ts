import { $ } from "bun";
import { readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import path from "path";

const SRC_FOLDER = "./src";
const DIST_FOLDER = "./dist";

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

async function transpileAndWriteFiles() {
  await $`rm -rf ${DIST_FOLDER}`;
  await $`mkdir ${DIST_FOLDER}`;

  const transpiler = new Bun.Transpiler({
    loader: "ts",
    target: "browser",
  });

  const tsFiles = listTypeScriptFiles(SRC_FOLDER);

  for (const file of tsFiles) {
    const code = await Bun.file(file).text();

    const result = transpiler.transformSync(code);

    const relativePath = path.relative(SRC_FOLDER, file);
    const outputPath = path.join(
      DIST_FOLDER,
      relativePath.replace(/\.ts$/, ".js"),
    );

    mkdirSync(path.dirname(outputPath), { recursive: true });

    writeFileSync(outputPath, result, "utf8");

    console.log(`Transpiled: ${file} -> ${outputPath}`);
  }
}

transpileAndWriteFiles().catch((err) => {
  console.error("Error during transpilation:", err);
});
