import type { Metadata } from "../../types.js"
import { html } from "../../utils/tags.js"
import { Fractal } from "./components/fractal.js"
import { GEOMETRY } from "./utils/constants.js"

export const metadata: Metadata = {
  title: "Abderrahmane TAHRI JOUTI",
  description:
    "Product oriented Technical professional with a strong background in building web applications.",
}

export const content = () => {
  return html`<div class="home-page">
    <style>
      .canvas-outer {
        --canvas-width: ${GEOMETRY.pageToCanvasRatio * 100};
      }
    </style>
    <div class="canvas-outer">${Fractal()}</div>
  </div>`
}
