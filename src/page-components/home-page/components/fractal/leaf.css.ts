import { createVar, style } from "@vanilla-extract/css"
import {
  leafBackgroundVar,
  leftRotationVar,
  leftScaleVar,
  rightRotationVar,
  rightScaleVar,
} from "./fractal.css"

export const coefficientVar = createVar()
export const leafBackgroundColor = createVar()

export const leafInner = style({
  position: "relative",
  width: "100%",
  height: "100%",
})

export const leftLeaf = style({
  top: "-100%",
  left: "0",
  transformOrigin: "bottom left",
  transform: `scale(${leftScaleVar}) rotate(${leftRotationVar})`,
})

export const rightLeaf = style({
  right: "0",
  top: "-100%",
  transformOrigin: "bottom right",
  transform: `scale(${rightScaleVar}) rotate(${rightRotationVar})`,
})

export const leaf = style({
  width: "100%",
  height: "100%",
  backgroundColor: leafBackgroundColor,
  vars: {
    [leafBackgroundColor]: `rgba(${leafBackgroundVar}, ${coefficientVar})`,
  },
  selectors: {
    [`${leafInner} > &`]: {
      position: "absolute",
    },
  },
})
