import { style } from "@vanilla-extract/css"

export const canvas = style({
  display: "flex",
  flex: "1",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  vars: {
    /* colors */
    "--pinkred": "246, 62, 98",
    "--leafy-green": "117, 166, 58",
    "--mud-purple": "132, 74, 135",

    /* default theme */
    "--growing-leaf-color": "var(--leafy-green)",
    "--leaf-background": "var(--growing-leaf-color)",
    "--leaf-full": "128, 128, 128",

    /* geometry */
    "--base": "75px",
    "--base-width": "var(--base)",
    "--base-height": "var(--base)",
    "--scale": "0.707",
    "--top-angle": "90deg",
    "--right-angle": "45deg",
    "--left-angle": "45deg",
    "--right-rotation": "var(--right-angle)",
    "--left-rotation": "calc(-1 * var(--left-angle))",
    "--right-scale": "0.707",
    "--left-scale": "0.707",
    "--coefficient": "1",
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
