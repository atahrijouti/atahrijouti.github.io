import globals from "globals"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import importPlugin from "eslint-plugin-import"

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    settings: {
      "import/core-modules": ["bun"],
    },
  },
  //
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  tseslint.configs.recommended,
)
