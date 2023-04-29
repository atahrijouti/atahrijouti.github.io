import { globalStyle, style } from "@vanilla-extract/css"

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
  alignSelf: "stretch",
  justifySelf: "stretch",
})
export const constructionNotice = style({
  gridArea: "construction-notice",
  textAlign: "center",
})

globalStyle(`${constructionNotice} p`, {
  marginBottom: 0,
})

globalStyle(`${constructionNotice} span`, {
  "@media": {
    "screen and (max-width: 576px)": {
      display: "block",
    },
  },
})

export const layout = style({
  flex: 1,
  display: "grid",
  gridTemplate: `
    "construction-notice construction-notice" auto
    "nav main" 1fr
    / auto 1fr
  `,
  gap: "calc(var(--spacing) * 3)",
  paddingLeft: "calc(var(--spacing) * 1.5)",
  paddingRight: "calc(var(--spacing) * 3)",

  "@media": {
    "screen and (max-width: 576px)": {
      gridTemplate: `
        "construction-notice" auto
        "nav" auto
        "main" 1fr
        / 1fr
      `,
      gap: "var(--spacing)",
      paddingLeft: "var(--spacing)",
      paddingRight: "var(--spacing)",
    },
  },
})
