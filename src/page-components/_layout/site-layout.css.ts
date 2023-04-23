import { style } from "@vanilla-extract/css"

export const nav = style({
  gridArea: "nav",
})

export const menu = style({
  listStyleType: "none",
  margin: 0,
  padding: "10px",
})

export const main = style({
  gridArea: "main",
  alignSelf: "stretch",
  justifySelf: "stretch",
})
export const footer = style({
  gridArea: "footer",
})

export const layout = style({
  display: "grid",
  gridTemplateAreas: `"nav main" "footer footer"`,
  gridTemplateRows: "1fr auto",
  height: "100vh",
  "@media": {
    "screen and (max-width: 520px), screen and (max-height: 520px)": {
      gridTemplateRows: "auto 1fr auto",
      gridTemplateAreas: `"nav" "main" "footer"`,
    },
  },
})
