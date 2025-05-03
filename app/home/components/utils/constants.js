const ThemeTimeout = 2e3
const GEOMETRY = {
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
const COLORS = {
  clearDaySky: "rgb(46, 181, 229)",
  clearNightSky: "rgb(0, 0, 30)",
  midnightBlue: "rgb(0, 0, 70)",
  goldenSun: "rgb(253, 184, 19)",
  moonGlow: "rgb(246, 241, 213)",
  leafyGreen: "rgb(135, 191, 67)",
  pinkRed: "rgb(246, 62, 98)",
  plumPurple: "rgb(132, 74, 135)",
  midGray: "rgb(128, 128, 128)",
}
export { COLORS, GEOMETRY, ThemeTimeout }
