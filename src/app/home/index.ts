import type { Metadata } from "../../types.js"
import { html } from "../../utils/tags.js"
import { Fractal } from "./components/fractal.js"

export const metadata: Metadata = {
  title: "Abderrahmane TAHRI JOUTI",
  description:
    "Product oriented Technical professional with a strong background in building web applications.",
}

export const content = () => {
  return html`<div class="home-page">
    <div class="canvas-outer">${Fractal()}</div>
  </div>`
}
