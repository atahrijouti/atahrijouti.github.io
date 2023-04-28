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
export const constructionNotice = style({
  gridArea: "construction-notice",
  textAlign: "center"
})

export const layout = style({
  display: "grid",
  gridTemplateAreas: `
    "construction-notice construction-notice"
    "nav main"
  `,
  gridTemplateRows: "auto 1fr",
  height: "100vh",
  "@media": {
    "screen and (max-width: 520px)": {
      gridTemplateRows: "auto auto 1fr",
      gridTemplateAreas: `
        "construction-notice" "nav" "main"
      `,
    },
  },
})
