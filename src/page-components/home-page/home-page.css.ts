import { style } from "@vanilla-extract/css"
import { GEOMETRY } from "@/page-components/home-page/utils/constants"

export const homePage = style({
  position: "relative",
  display: "flex",
  minHeight: "100%",
  justifyContent: "center",
  "@media": {
    "screen and (max-width: 576px)": {
      justifyContent: "start",
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
    "screen and (max-width: 576px)": {
      width: "95%",
    },
  },
})
