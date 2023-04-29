import { globalStyle, style } from "@vanilla-extract/css"
import { layout, menu } from "@/page-components/_layout/site-layout.css"
import { GEOMETRY } from "@/page-components/home-page/utils/constants"

export const homePage = style({
  display: "flex",
  minHeight: "100%",
  justifyContent: "center",
  position: "relative",
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

const canvasWidth = GEOMETRY.pageToCanvasRatio * 100

export const canvasOuter = style({
  position: "absolute",
  width: `${canvasWidth}%`,
  // TODO: tie the offset value to the existence of the constructionNotice
  maxWidth: `calc(85vh - (4 * var(--spacing)))`,
  aspectRatio: "1",
  "@media": {
    "screen and (max-width: 520px)": {
      width: "95%",
    },
  },
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
