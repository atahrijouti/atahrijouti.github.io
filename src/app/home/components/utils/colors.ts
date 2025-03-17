import { COLORS, type Rgb, type RgbNumbers } from "./constants.js"

const { leafyGreen, plumPurple, pinkRed, midGray } = COLORS

export const RgbLeafColors = {
  leafyGreen,
  pinkRed,
  plumPurple,
  midGray,
} as const

type LeafColorNames = keyof typeof RgbLeafColors

export const LeafColorNumbers = (() => {
  const entries = Object.entries(RgbLeafColors) as [LeafColorNames, Rgb][]
  return entries.reduce(
    (acc, [colorName, rgbValue]) => {
      acc[colorName] = rgbValue.replace(/\)|rgb\(|\s/g, "").trim() as RgbNumbers
      return acc
    },
    {} as Record<keyof typeof RgbLeafColors, RgbNumbers>,
  )
})()
