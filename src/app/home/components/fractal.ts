import { html } from "../../../utils/tags.js"
import { LeafColorNumbers } from "./utils/colors.js"
import { COLORS, GEOMETRY, ThemeTimeout } from "./utils/constants.js"
import { lookAtPoint } from "./utils/math.js"
import { geometryToStyles } from "./utils/style.js"

type LeafProps = {
  orientation?: "left" | "right"
  level?: number
}
export const Leaf = ({ level = 0, orientation }: LeafProps = {}) => {
  const levelCoefficient = Math.pow(0.87, level)
  const id = level === 0 ? "root-node" : `Node-${level}-${orientation == "right" ? 0 : 1}`
  const orientationClass = orientation ? (orientation === "right" ? orientation : "left") : ""
  //
  return html`<div
    id="${id}"
    class="leaf ${orientationClass}"
    style="--coefficient: ${levelCoefficient}"></div>`
}

export const startupCoords = {
  target: {
    x: 12,
    y: 12,
  },
  canvasRect: {
    top: 0,
    left: 0,
    width: 100,
  },
}

export const startupGeometry = lookAtPoint(
  startupCoords.target.x,
  startupCoords.target.y,
  startupCoords.canvasRect,
)

export const leafColors = {
  "--leafy-green": LeafColorNumbers["leafyGreen"],
  "--pink-red": LeafColorNumbers["pinkRed"],
  "--plum-purple": LeafColorNumbers["plumPurple"],
  "--mid-gray": LeafColorNumbers["midGray"],
} as const

export const Fractal = () => {
  // todo: add class hidden to ball inner upon first drag
  return html`<div id="canvas" class="fractal canvas">
    <style id="live-fractal-styles">
      .fractal {
        ${geometryToStyles(startupGeometry)}
      }
    </style>
    <style>
      .fractal {
          /* rgb colors */
        --sun-color: ${COLORS.goldenSun};
        --moon-color: ${COLORS.moonGlow};
        --clear-day-sky-color: ${COLORS.clearDaySky};
        --clear-night-sky-color: ${COLORS.clearNightSky};
        --midnight-blue-color: ${COLORS.midnightBlue};

        /* just the numbers of the leaf colors */
        ${Object.entries(leafColors)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n")}

        /* default theme */
        --growing-leaf: var(--leafy-green);
        --leaf-background: var(--growing-leaf);
        --full-leaf: var(--mid-gray);

        /* animation config */
        --color-transition: ${ThemeTimeout / 2}ms;
        --movement-transition: ${ThemeTimeout / 3}ms;

        /* angles and rotations */
        --right-rotation: var(--right-angle);
        --left-rotation: calc(-1 * var(--left-angle));

        /* design variables */
        --canvas-to-base-node-ratio: ${GEOMETRY.canvasToBaseNodeRatio * 100};
      }
    </style>

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
