import { globalStyle, style } from "@vanilla-extract/css"

export const resumePage = style({})

export const employmentArticle = style({
  marginTop: "calc(var(--typography-spacing-vertical) * .5)",
  selectors: {
    "&:not(:last-child)": {
      borderBottom: "1px gray solid",
    },
  },
})

// todo: Do a proper reset, together with an actual design system
globalStyle(`${resumePage} dl`, {
  paddingLeft: 0,
  paddingInlineStart: 0,
})

globalStyle(`${resumePage} dd`, {
  marginLeft: 0,
  marginInlineStart: 0,
})

globalStyle(`${resumePage} h2`, {
  marginBottom: "calc(var(--typography-spacing-vertical) * .25)",
})

globalStyle(`${resumePage} h3`, {
  marginBottom: "calc(var(--typography-spacing-vertical) * .125)",
})

export const skillItem = style({
  selectors: {
    "&:not(:first-child):before": {
      content: "\u00B7",
      paddingLeft: ".25rem",
      paddingRight: ".25rem",
    },
  },
})
