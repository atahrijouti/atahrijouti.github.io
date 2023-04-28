import { globalStyle, style } from "@vanilla-extract/css"
import { layout, menu } from "@/page-components/_layout/site-layout.css"

export const homePage = style({
  display: "flex",
  height: "100%",
  justifyContent: "center",
})

globalStyle(`${layout}:has(${homePage})`, {
  paddingLeft: 0,
  paddingRight: 0,
})

globalStyle(`${layout}:has(${homePage}) ${menu}`, {
  paddingLeft: "calc(var(--spacing) * 1.5)",
  paddingRight: "calc(var(--spacing) * 3)",

  "@media": {
    "screen and (max-width: 520px)": {
      paddingLeft: "var(--spacing)",
      paddingRight: "var(--spacing)",
    },
  },
})
