import type { Metadata } from "../../types.js"
import { html } from "../../utils/html.js"

import employments from "./data.json"

console.log(employments)

export const metadata: Metadata = {
  title: "Resumé",
  description: "A summary of each step and turn my career took",
}

export const content = () => {
  return html`<div class="resume-page">
    <h1>Resumé</h1>
    <section></section>
  </div>`
}
