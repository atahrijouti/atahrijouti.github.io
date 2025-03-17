import globals from "globals"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import my from "./eslint/my.js"

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    files: ["**/**.ts"],
    ignores: ["!node_modules/", "node_modules/*"],
  },
  {
    files: ["src/**/*.ts"],
    plugins: { my },
    rules: my.configs.recommended.rules,
  },
  //
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  tseslint.configs.recommended,
)
