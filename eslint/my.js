import { existsSync, lstatSync } from "fs"
import { dirname, resolve } from "path"

const createRule = (check) => {
  return {
    meta: {
      fixable: "code",
    },
    create(context) {
      function scopeRule(node) {
        const source = node.source
        if (!source) return
        const value = source.value.replace(/\?.*$/, "")
        if (!value || !value.startsWith(".") || value.endsWith(".js")) return

        check(context, node, resolve(dirname(context.getFilename()), value))
      }

      return {
        DeclareExportDeclaration: scopeRule,
        DeclareExportAllDeclaration: scopeRule,
        ExportAllDeclaration: scopeRule,
        ExportNamedDeclaration: scopeRule,
        ImportDeclaration: scopeRule,
      }
    },
  }
}

const plugin = {
  meta: {
    name: "my",
  },
  configs: {},
  rules: {
    "require-extensions": createRule((context, node, path) => {
      if (!existsSync(path)) {
        let fix
        if (!node.source.value.includes("?")) {
          fix = (fixer) => {
            return fixer.replaceText(node.source, `'${node.source.value}.js'`)
          }
        }

        context.report({
          node,
          message: "Relative imports and exports must end with .js",
          fix,
        })
      }
    }),
    "require-index": createRule((context, node, path) => {
      if (existsSync(path) && lstatSync(path).isDirectory()) {
        context.report({
          node,
          message: "Directory paths must end with index.js",
          fix(fixer) {
            return fixer.replaceText(node.source, `'${node.source.value}/index.js'`)
          },
        })
      }
    }),
  },
}

Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      my: plugin,
    },
    rules: {
      "my/require-extensions": "error",
      "my/require-index": "error",
    },
  },
})

export default plugin
