import { createVar, globalStyle } from "@vanilla-extract/css"

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
})

export const lightYellowColor = createVar()

globalStyle(":root", {
  vars: {
    [lightYellowColor]: "255, 255, 255",
  },
})

globalStyle("body", {
  padding: 0,
  margin: 0,
  display: "flex",
  minHeight: "100vh",
  backgroundColor: `rgb(${lightYellowColor})`,
})

globalStyle("#__next", {
  flex: "1 1 auto",
})
