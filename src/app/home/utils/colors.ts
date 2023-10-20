import { COLORS, Rgb, RgbNumbers } from "./constants"

const { leafyGreen, mudPurple, pinkRed } = COLORS

export const RgbLeafColors = {
  leafyGreen,
  pinkRed,
  mudPurple,
} as const

type ColorNames = keyof typeof RgbLeafColors

export const LeafColorNumbers = (() => {
  const entries = Object.entries(RgbLeafColors) as [ColorNames, Rgb][]
  return entries.reduce(
    (acc, [colorName, rgbValue]) => {
      acc[colorName] = rgbValue.replace(/\)|rgb\(|\s/g, "").trim() as RgbNumbers
      return acc
    },
    {} as Record<keyof typeof RgbLeafColors, RgbNumbers>,
  )
})()
