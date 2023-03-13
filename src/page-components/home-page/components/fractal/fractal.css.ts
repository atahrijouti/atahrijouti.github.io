import { createVar, style } from "@vanilla-extract/css"

import { GEOMETRY, LeafColorNumbers, ThemeTimeout } from "../../utils/constants"
import { lightYellowColor } from "../../../../app.css"
import { lookAtPoint } from "../../utils/math"
import { geometryToStyles } from "../../utils/style"

const leafyGreenVar = createVar()
const pinkRedVar = createVar()
const mudPurpleVar = createVar()

export const growingLeafVar = createVar()
export const fullLeafVar = createVar()

export const leafBackgroundVar = createVar()

export const colorTransitionVar = createVar()
export const movementTransitionVar = createVar()

export const leftScaleVar = createVar()
export const rightScaleVar = createVar()
export const leftAngleVar = createVar()
export const rightAngleVar = createVar()
export const polarityXVar = createVar()
export const polarityYVar = createVar()
export const visualXVar = createVar()
export const visualYVar = createVar()
export const rightRotationVar = createVar()
export const leftRotationVar = createVar()

export const startupCanvasRect = {
  top: (1 - GEOMETRY.pageToCanvasRatio) / 2,
  left: (1 - GEOMETRY.pageToCanvasRatio) / 2,
  width: GEOMETRY.pageToCanvasRatio,
}

export const startupGeometry = lookAtPoint(0, 0, startupCanvasRect)

export const LeafColorVars = {
  [leafyGreenVar]: LeafColorNumbers["leafyGreen"],
  [pinkRedVar]: LeafColorNumbers["pinkRed"],
  [mudPurpleVar]: LeafColorNumbers["mudPurple"],
} as const

export const fractalVars = style({
  vars: {
    /* colors */
    ...LeafColorVars,

    /* default theme */
    [growingLeafVar]: leafyGreenVar,
    [leafBackgroundVar]: growingLeafVar,
    [fullLeafVar]: "128, 128, 128",

    /* animatin config */
    [colorTransitionVar]: `${ThemeTimeout / 2}ms`,
    [movementTransitionVar]: `${ThemeTimeout / 3}ms`,

    /* startupGeometry */
    ...geometryToStyles(startupGeometry),

    [rightRotationVar]: rightAngleVar,
    [leftRotationVar]: `calc(-1 * ${leftAngleVar})`,
  },
})

const canvasWidth = GEOMETRY.pageToCanvasRatio * 100

export const canvas = style({
  width: `${canvasWidth}vmin`,
  height: `${canvasWidth}vmin`,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  background: `rgb(${lightYellowColor})`,
  position: "relative",
  selectors: {
    "&:before": {
      content: "",
      zIndex: "-1",
      position: "absolute",
      background: `rgb(${growingLeafVar})`,
      transition: `background ${colorTransitionVar} ease-in, top ${movementTransitionVar} ease-out, left ${movementTransitionVar} ease-out`,
      transitionTimingFunction: "ease-in-out",
      width: "100%",
      height: "100%",
      top: `calc(-10% * -1 * ${polarityYVar})`,
      left: `calc(-10% * ${polarityXVar})`,
      filter: "blur(100px)",
    },
    "&:after": {
      content: "",
      zIndex: "-2",
      position: "absolute",
      background: `rgba(${growingLeafVar}, .5)`,
      transition: `background ${colorTransitionVar} ease-in`,
      transitionTimingFunction: "ease-in-out",
      width: "100%",
      height: "100%",
      top: "4%",
      left: "4%",
      filter: "invert(100%)",
    },
  },
})

export const base = style({
  width: `${GEOMETRY.canvasToBaseNodeRatio * 100}%`,
  height: `${GEOMETRY.canvasToBaseNodeRatio * 100}%`,
})

export const visualTargetTransition = "100ms ease-out"

export const visualTarget = style({
  position: "absolute",
  width: "20px",
  height: "20px",
  borderRadius: "20px",
  background: "black",
  top: visualYVar,
  left: visualXVar,
  translate: "-50% -50%",
  transition: `all ${visualTargetTransition}`,
})

export const impossible = style({
  width: "100px",
  height: "100px",
  background: "black",
  border: "4px dashed cyan",
})
