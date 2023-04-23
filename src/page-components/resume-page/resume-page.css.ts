import { globalStyle, style } from "@vanilla-extract/css"

export const resumePage = style({})

export const employmentArticle = style({
  selectors: {
    "&:not(:last-child)": {
      borderBottom: "1px gray solid"
    }
  }
})

// todo: Do a proper reset, together with an actual design system
globalStyle(`${resumePage} dd`, {
  all: "unset",
  display: "revert",
})
