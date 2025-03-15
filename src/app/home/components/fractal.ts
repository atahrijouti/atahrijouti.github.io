import { html } from "../../../utils/tags.js"

type LeafProps = {
  orientation?: "left" | "right"
  level?: number
}
export const Leaf = ({ level = 0, orientation }: LeafProps = {}) => {
  const id = level === 0 ? "root-node" : `Node-${level}-${orientation == "right" ? 0 : 1}`
  const orientationClass = orientation ? (orientation === "right" ? orientation : "left") : ""
  //
  return html`<div id="${id}" class="leaf ${orientationClass}"></div>`
}

export const Fractal = () => {
  // todo: add class hidden to ball inner upon first drag
  return html`<div id="canvas" class="fractal canvas">
    <div class="canvas-inner">
      <div id="base" class="base">${Leaf()}</div>
      <div id="visual-target" class="visual-target">
        <div class="target-ball">
          <div class="ball-inner"></div>
        </div>
      </div>
    </div>
  </div>`
}
