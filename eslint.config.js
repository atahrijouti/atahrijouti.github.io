import globals from "globals"
import eslint from "@eslint/js"

import my from "./eslint/my.js"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/**.ts"] },
  {
    files: ["src/**/*.ts"],
    plugins: { my },
    settings: {},
    rules: {},
  },
  //
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
]
