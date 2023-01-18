import { style } from "@vanilla-extract/css"
import { LeafColorVars } from "../../utils/colors"
import { GEOMETRY, ThemeTimeout } from "../../utils/constants"

export const fractalVars = style({
  vars: {
    /* colors */
    ...LeafColorVars,

    /* default theme */
    "--growing-leaf-color": "var(--leafy-green)",
    "--leaf-background": "var(--growing-leaf-color)",
    "--leaf-full": "128, 128, 128",

    /* animatin config */
    "--color-transition": `${ThemeTimeout / 2}ms`,
    "--movement-transition": `${ThemeTimeout / 3}ms`,

    /* geometry */
    "--right-angle": "45deg",
    "--left-angle": "45deg",
    "--right-scale": "0.707",
    "--left-scale": "0.707",
    "--polarity-x": "0",
    "--polarity-y": "1",
    "--right-rotation": "var(--right-angle)",
    "--left-rotation": "calc(-1 * var(--left-angle))",
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
  background: "rgb(var(--light-yellow))",
  position: "relative",
  selectors: {
    "&:before": {
      content: "",
      zIndex: "-1",
      position: "absolute",
      background: "rgb(var(--growing-leaf-color))",
      transition:
        "background var(--color-transition) ease-in, top var(--movement-transition) ease-out, left var(--movement-transition) ease-out",
      transitionTimingFunction: "ease-in-out",
      width: "100%",
      height: "100%",
      top: "calc(-10% * -1 * var(--polarity-y))",
      left: "calc(-10% * var(--polarity-x))",
      filter: "blur(100px)",
    },
    "&:after": {
      content: "",
      zIndex: "-2",
      position: "absolute",
      background: "rgba(var(--growing-leaf-color), .5)",
      transition: "background var(--color-transition) ease-in",
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

export const impossible = style({
  width: "100px",
  height: "100px",
  background: "black",
  border: "4px dashed cyan",
})

export const debug = style({
  position: "fixed",
  flex: "none",
  top: "10px",
  left: "10px",
  color: "white",
  background: "black",
  width: "200px",
})
