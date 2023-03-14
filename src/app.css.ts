import { createVar, globalStyle } from "@vanilla-extract/css"

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
  backgroundColor: `rgb(${lightYellowColor})`,
})

globalStyle("#__next", {
  flex: "1 1 auto",
})
