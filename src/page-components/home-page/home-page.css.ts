import { style } from "@vanilla-extract/css"
import { GEOMETRY } from "@/page-components/home-page/utils/constants"

export const homePage = style({
  display: "flex",
  minHeight: "100%",
  justifyContent: "center",
  position: "relative",
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
