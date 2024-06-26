import { globalStyle, style } from "@vanilla-extract/css"

export const bodyStyle = style({
  padding: 0,
  margin: 0,
  display: "flex",
  minHeight: "100vh",
})

export const rootStyle = style({
  display: "flex",
  flex: "1 1 auto",
})

export const nav = style({
  gridArea: "nav",
})

export const menu = style({
  listStyleType: "none",
  padding: 0,
})

globalStyle(`${menu} li`, {
  listStyle: "none",
})

export const main = style({
  gridArea: "main",
})

export const layout = style({
  display: "grid",
  gridTemplate: `
    "nav main" 1fr
    / auto 1fr
  `,
  gap: "calc(var(--spacing) * 3)",
  flex: 1,
  paddingLeft: "calc(var(--spacing) * 1.5)",
  paddingTop: "calc(var(--spacing) * 1.5)",
  paddingRight: "calc(var(--spacing) * 3)",

  "@media": {
    "screen and (max-width: 576px)": {
      gridTemplate: `
        "construction-notice" auto
        "nav" auto
        "main" 1fr
        / minmax(0, 1fr)
      `,
      gap: "var(--spacing)",
      paddingLeft: "var(--spacing)",
      paddingRight: "var(--spacing)",
    },
  },
})
