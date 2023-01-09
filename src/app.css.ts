import { globalStyle } from "@vanilla-extract/css"

globalStyle(":root", {
  vars: {
    "--light-yellow": "254, 254, 215",
  },
})

globalStyle("body", {
  padding: 0,
  margin: 0,
  display: "flex",
  backgroundColor: "rgb(var(--light-yellow))",
})

globalStyle("#__next", {
  flex: 1,
})

globalStyle(".page", {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
})
