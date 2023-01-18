import { style } from "@vanilla-extract/css"

export const leafInner = style({
  position: "relative",
  width: "100%",
  height: "100%",
})

export const leftLeaf = style({
  top: "-100%",
  left: "0",
  transformOrigin: "bottom left",
  transform: "scale(var(--left-scale)) rotate(var(--left-rotation))",
})

export const rightLeaf = style({
  right: "0",
  top: "-100%",
  transformOrigin: "bottom right",
  transform: "scale(var(--right-scale)) rotate(var(--right-rotation))",
})

export const leaf = style({
  width: "100%",
  height: "100%",
  transition: "background var(--transition-duration)",
  backgroundColor: "var(--leaf-background-color)",
  vars: {
    "--leaf-background-color": "rgba(var(--leaf-background), var(--coefficient))",
  },
  selectors: {
    [`${leafInner} > &`]: {
      position: "absolute",
    },
  },
})
