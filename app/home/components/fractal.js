import { textToHTML } from "../../../utils/html.js";
import { html } from "../../../utils/tags.js";
import { LeafColorNumbers } from "./utils/colors.js";
import { COLORS, GEOMETRY, ThemeTimeout } from "./utils/constants.js";
import { lookAtPoint } from "./utils/math.js";
import { geometryToStyles } from "./utils/style.js";
const Leaf = ({ level = 0, orientation } = {}) => {
  const levelCoefficient = Math.pow(0.87, level);
  const id = level === 0 ? "root-node" : `Node-${level}-${orientation == "right" ? 0 : 1}`;
  const orientationClass = orientation ? orientation === "right" ? orientation : "left" : "";
  return html`<div
    id="${id}"
    class="leaf ${orientationClass}"
    style="--coefficient: ${levelCoefficient}; --leaf-background: var(--growing-leaf);">
    <div class="leaf-inner"></div>
  </div>`;
};
const startupCoords = {
  target: {
    x: 12,
    y: 12
  },
  canvasRect: {
    top: 0,
    left: 0,
    width: 100
  }
};
const startupGeometry = lookAtPoint(
  startupCoords.target.x,
  startupCoords.target.y,
  startupCoords.canvasRect
);
const cloneStartupGeometry = () => ({ ...startupGeometry });
const loopGeometry = cloneStartupGeometry();
const leafColors = {
  "--leafy-green": LeafColorNumbers["leafyGreen"],
  "--pink-red": LeafColorNumbers["pinkRed"],
  "--plum-purple": LeafColorNumbers["plumPurple"]
};
const LeafColorVarNames = Object.keys(leafColors);
const randomLeafColor = () => LeafColorVarNames[Math.random() * LeafColorVarNames.length | 0];
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
      ${Object.entries(leafColors).map(([key, value]) => `${key}: ${value};`).join("\n")}

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
`;
const MAX_DEPTH = 5;
const shuffledOrientations = () => {
  return Math.random() < 0.5 ? ["left", "right"] : ["right", "left"];
};
const timeouts = [];
const sow = ({ soil, level, orientation }) => {
  const seed = textToHTML(Leaf({ level, orientation }));
  soil.appendChild(seed);
  sprout({ level, node: seed });
};
const sprout = ({ level, node }) => {
  if (level >= MAX_DEPTH) {
    return;
  }
  const inner = node.firstElementChild;
  if (!inner) {
    return;
  }
  const nextLevel = level + 1;
  const fireTime = 231 * Math.random() + 321 | 0;
  const [first, second] = shuffledOrientations();
  timeouts.push(
    setTimeout(() => {
      sow({ level: nextLevel, orientation: first, soil: inner });
    }, fireTime),
    setTimeout(
      () => {
        sow({ level: nextLevel, orientation: second, soil: inner });
        node.style.setProperty("--leaf-background", "var(--full-leaf)");
      },
      (765 - fireTime) * Math.random() + fireTime | 0
    )
  );
};
const unload = () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  loop = false;
  isRepaintNeeded = false;
  dragging = false;
};
let loop = false;
let isRepaintNeeded = false;
let dragging = false;
const ready = () => {
  const root = document.getElementById("root-node");
  const canvas = document.getElementById("canvas");
  const fractalStyle = document.getElementById("live-fractal-styles");
  const visualTarget = document.querySelector("#visual-target .ball-inner");
  if (!root || !canvas || !fractalStyle || !visualTarget) {
    console.error("No root-node | canvas | live-fractal-styles | visual-target found");
    return;
  }
  canvas.style.setProperty("--growing-leaf", `var(${randomLeafColor()})`);
  loop = true;
  isRepaintNeeded = true;
  let showTooltip = true;
  const styleLoop = () => {
    if (isRepaintNeeded) {
      fractalStyle.innerHTML = `
        .fractal {
          ${geometryToStyles(loopGeometry)}
        }`;
      isRepaintNeeded = false;
    }
    if (loop) {
      window.requestAnimationFrame(styleLoop);
    }
  };
  const handlePointerDown = (e) => {
    isRepaintNeeded = true;
    dragging = true;
    if (showTooltip) {
      showTooltip = false;
      visualTarget.classList.add("hidden");
    }
    Object.assign(
      loopGeometry,
      lookAtPoint(e.clientX, e.clientY, canvas.getBoundingClientRect() ?? {})
    );
  };
  const handlePointerMove = (e) => {
    if (dragging) {
      isRepaintNeeded = true;
      Object.assign(
        loopGeometry,
        lookAtPoint(e.clientX, e.clientY, canvas.getBoundingClientRect() ?? {})
      );
    }
  };
  const handlePointerUp = () => {
    dragging = false;
  };
  styleLoop();
  window.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
  sprout({ level: 0, node: root });
};
const Fractal = () => {
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
  </div>`;
};
export {
  Fractal,
  Leaf,
  leafColors,
  ready,
  startupCoords,
  unload
};
