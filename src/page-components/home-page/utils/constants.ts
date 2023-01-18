export const ThemeTimeout = 2000

export const GEOMETRY = {
  canvasToBaseNodeRatio: 12.5 / 100,
  pageToCanvasRatio: 60 / 100,
  defaultFractal: {
    rightScale: 0.9371561629564998,
    leftScale: 0.3489101979487707,
    rightAngle: 20.42067243832907,
    leftAngle: 69.57932756167094,
    polarityX: -0.7565233475346995,
    polarityY: 0.6539666846521254,
  },
}

export type RgbNumbers = `${number},${number},${number}`
export type Rgb = `rgb(${RgbNumbers})`
export type ColorNames = "leafyGreen" | "pinkRed" | "mudPurple"

export const RgbLeafColors: { [name in ColorNames]: Rgb } = {
  leafyGreen: "rgb(135,191,67)",
  pinkRed: "rgb(246,62,98)",
  mudPurple: "rgb(132,74,135)",
} as const

export const LeafColorNumbers = (() => {
  const entries = Object.entries(RgbLeafColors) as [ColorNames, Rgb][]
  return entries.reduce((acc, entry) => {
    acc[entry[0]] = entry[1].replace("rgb(", "").replace(")", "") as RgbNumbers
    return acc
  }, {} as { [name in ColorNames]: RgbNumbers })
})()
