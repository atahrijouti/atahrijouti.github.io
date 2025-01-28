import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import requireExtensions from "./eslint-plugin/require-extensions.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["src/**/*.ts"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { requireExtensions },
    rules: {
      "requireExtensions/require-extensions": "error",
      "requireExtensions/require-index": "error",
    },
  },
];
