import type { Metadata } from "../../types.js"
import { html } from "../../utils/tags.js"
import * as test from "web-tree-sitter"

export const metadata: Metadata = {
  title: "Tree sitter preview",
  description: "Preview your tree-sitter theme",
}

export const ready = async () => {
  console.log(test)
  console.log("tree sitter things")
}

export const content = () => {
  return html`<div class="tree-sitter-page">
    <h2>tree-sitter</h2>
  </div>`
}
