import { style } from "@vanilla-extract/css"

export const leafInner = style({
  position: "relative",
  width: "var(--base-width)",
  height: "var(--base-height)",
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
  width: "var(--base-width)",
  height: "var(--base-height)",
  transition: "background 1s , transform 16ms",
  backgroundColor: "var(--leaf-background-color)",
  vars: {
    "--leaf-background-color": "rgba(var(--leaf-background), var(--coefficient))",
  },
  selectors: {
    [`${leafInner} &`]: {
      position: "absolute",
    },
  },
})
