import { style } from "@vanilla-extract/css"
import { LeafColorVars } from "../../utils/colors"
import { ThemeTimeout } from "../../utils/constants"

export const fractalVars = style({
  vars: {
    /* colors */
    ...LeafColorVars,

    /* default theme */
    "--growing-leaf-color": "var(--leafy-green)",
    "--leaf-background": "var(--growing-leaf-color)",
    "--leaf-full": "128, 128, 128",

    /* animatin config */
    "--transition-duration": `${ThemeTimeout / 2}ms`,

    /* geometry */
    "--base": "75px",
    "--base-width": "var(--base)",
    "--base-height": "var(--base)",
    "--right-angle": "45deg",
    "--left-angle": "45deg",
    "--right-rotation": "var(--right-angle)",
    "--left-rotation": "calc(-1 * var(--left-angle))",
    "--right-scale": "0.707",
    "--left-scale": "0.707",
    "--coefficient": "1",
  },
})

export const canvas = style({
  width: "60vmin",
  height: "60vmin",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  // overflow: "hidden",
  background: "rgb(var(--light-yellow))",
  boxShadow:
    "calc(-0.1 * var(--canvas-width) * var(--polarity-x)) " +
    "calc(-0.1 * var(--canvas-width) * -1 * var(--polarity-y)) " +
    "calc(var(--canvas-width) / 2) " +
    "rgb(var(--growing-leaf-color))",
  transition: "box-shadow var(--transition-duration), box-background var(--transition-duration)",
  position: "relative",
  selectors: {
    "&:before": {
      content: "",
      zIndex: "-1",
      position: "absolute",
      background: "rgba(var(--growing-leaf-color), .5)",
      transition: "background var(--transition-duration)",
      transitionTimingFunction: "ease-in-out",
      width: "100%",
      height: "100%",
      top: "4%",
      left: "4%",
      filter: "invert(100%)",
    },
  },
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
