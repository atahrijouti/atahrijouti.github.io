import { createVar, globalStyle } from "@vanilla-extract/css"

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
})

export const lightYellowColor = createVar()

globalStyle(":root", {
  vars: {
    [lightYellowColor]: "254, 254, 215",
  },
})

globalStyle("body", {
  padding: 0,
  margin: 0,
  display: "flex",
  minHeight: "100vh",
})

globalStyle("#__next", {
  display: "flex",
  flex: "1 1 auto",
})
