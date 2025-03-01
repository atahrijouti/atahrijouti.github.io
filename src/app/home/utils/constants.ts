export const ThemeTimeout = 2000

export const GEOMETRY = {
  canvasToBaseNodeRatio: 12.5 / 100,
  pageToCanvasRatio: 65 / 100,
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

export const COLORS = {
  clearDaySky: "rgb(46, 181, 229)",
  clearNightSky: "rgb(0, 0, 30)",
  duskBlue: "rgb(0, 0, 70)",
  sun: "rgb(253, 184, 19)",
  moon: "rgb(246, 241, 213)",

  leafyGreen: "rgb(135, 191, 67)",
  pinkRed: "rgb(246, 62, 98)",
  mudPurple: "rgb(132, 74, 135)",
} as Record<string, Rgb>
