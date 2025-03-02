import { html } from "../../../utils/tags.js"

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
