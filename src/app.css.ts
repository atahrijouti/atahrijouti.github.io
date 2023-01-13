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
  minHeight: "100vh",
  backgroundColor: "rgb(var(--light-yellow))",
})

globalStyle("#__next", {
  flex: "1 1 auto",
})
