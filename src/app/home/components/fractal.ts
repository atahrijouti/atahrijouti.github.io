import { html, textToHTML } from "unbundle"
import { LeafColorNumbers } from "./utils/colors.js"
import { COLORS, GEOMETRY, ThemeTimeout } from "./utils/constants.js"
import { lookAtPoint, type FractalGeometry } from "./utils/math.js"
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
    style="--coefficient: ${levelCoefficient}; --leaf-background: var(--growing-leaf);">
    <div class="leaf-inner"></div>
  </div>`
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

const startupGeometry = lookAtPoint(
  startupCoords.target.x,
  startupCoords.target.y,
  startupCoords.canvasRect,
)

const cloneStartupGeometry = () => ({ ...startupGeometry })
const loopGeometry: FractalGeometry = cloneStartupGeometry()

export const leafColors = {
  "--leafy-green": LeafColorNumbers["leafyGreen"],
  "--pink-red": LeafColorNumbers["pinkRed"],
  "--plum-purple": LeafColorNumbers["plumPurple"],
} as const

const LeafColorVarNames = Object.keys(leafColors)

const randomLeafColor = () => LeafColorVarNames[(Math.random() * LeafColorVarNames.length) | 0]

const fractalVars = html`
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

      --mid-gray: ${LeafColorNumbers["midGray"]};

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
  <style id="live-fractal-styles">
    .fractal {
      ${geometryToStyles(loopGeometry)}
    }
  </style>
`

const MAX_DEPTH = 5
const shuffledOrientations = (): LeafProps["orientation"][] => {
  return Math.random() < 0.5 ? ["left", "right"] : ["right", "left"]
}
const timeouts: Timer[] = []

type SowingProps = {
  soil: Node
  level: number
  orientation: LeafProps["orientation"]
}
const sow = ({ soil, level, orientation }: SowingProps) => {
  const seed = textToHTML(Leaf({ level, orientation }))
  soil.appendChild(seed)
  sprout({ level, node: seed })
}

type SproutProps = { level: number; node: HTMLElement }
const sprout = ({ level, node }: SproutProps) => {
  if (level >= MAX_DEPTH) {
    return
  }

  const inner = node.firstElementChild
  if (!inner) {
    return
  }

  const nextLevel = level + 1
  const fireTime = (231 * Math.random() + 321) | 0
  const [first, second] = shuffledOrientations()
  timeouts.push(
    setTimeout(() => {
      sow({ level: nextLevel, orientation: first, soil: inner })
    }, fireTime),

    setTimeout(
      () => {
        sow({ level: nextLevel, orientation: second, soil: inner })
        node.style.setProperty("--leaf-background", "var(--full-leaf)")
      },
      ((765 - fireTime) * Math.random() + fireTime) | 0,
    ),
  )
}

export const unload = () => {
  timeouts.forEach((timeout) => clearTimeout(timeout))

  loop = false
  isRepaintNeeded = false
  dragging = false
}

let loop = false
let isRepaintNeeded = false
let dragging = false

export const ready = () => {
  const root = document.getElementById("root-node")
  const canvas = document.getElementById("canvas")
  const fractalStyle = document.getElementById("live-fractal-styles")
  const visualTarget = document.querySelector("#visual-target .ball-inner")

  if (!root || !canvas || !fractalStyle || !visualTarget) {
    console.error("No root-node | canvas | live-fractal-styles | visual-target found")
    return
  }

  canvas.style.setProperty("--growing-leaf", `var(${randomLeafColor()})`)
  loop = true
  isRepaintNeeded = true
  let showTooltip = true

  const styleLoop = () => {
    if (isRepaintNeeded) {
      fractalStyle.innerHTML = `
        .fractal {
          ${geometryToStyles(loopGeometry)}
        }`

      isRepaintNeeded = false
    }

    if (loop) {
      window.requestAnimationFrame(styleLoop)
    }
  }

  const handlePointerDown = (e: MouseEvent) => {
    isRepaintNeeded = true
    dragging = true
    if (showTooltip) {
      showTooltip = false
      visualTarget.classList.add("hidden")
    }
    Object.assign(
      loopGeometry,
      lookAtPoint(e.clientX, e.clientY, canvas.getBoundingClientRect() ?? ({} as DOMRect)),
    )
  }

  const handlePointerMove = (e: MouseEvent) => {
    if (dragging) {
      isRepaintNeeded = true
      Object.assign(
        loopGeometry,
        lookAtPoint(e.clientX, e.clientY, canvas.getBoundingClientRect() ?? ({} as DOMRect)),
      )
    }
  }

  const handlePointerUp = () => {
    dragging = false
  }

  styleLoop()

  // TODO: create a custom even this functin could listen to, and remove the bollow listners when that even has fired
  window.addEventListener("pointerdown", handlePointerDown)
  window.addEventListener("pointermove", handlePointerMove)
  window.addEventListener("pointerup", handlePointerUp)

  sprout({ level: 0, node: root })
}

export const Fractal = () => {
  // todo: add class hidden to ball inner upon first drag
  return html`<div id="canvas" class="fractal canvas">
    ${fractalVars}
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
