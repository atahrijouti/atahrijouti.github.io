import _sample from "lodash/sample"

import { computeFractalFromMouse } from "./math"

let debugElement: HTMLElement | null = null
let baseElement: HTMLElement | null = null
let basePosition: DOMRect | undefined = {} as DOMRect
const relativeWidth = 12.5
let absoluteWidth: number = 75

const themeList = ["green", "red", "purple"]
let currentTheme = themeList[0]

let isRepaintNeeded = true

type Geometry = {
  rightScale: number
  leftScale: number
  topAngle: number
  rightAngle: number
  leftAngle: number
}

let geometry: Geometry | null = null

const handleMouseMove = (e: MouseEvent) => {
  if (!basePosition) {
    return false
  }

  isRepaintNeeded = true

  const { rightScale, leftScale, topAngle, rightAngle, leftAngle } = computeFractalFromMouse(
    e.pageX,
    e.pageY,
    basePosition,
    absoluteWidth,
  )

  geometry = {
    rightScale,
    leftScale,
    topAngle,
    rightAngle,
    leftAngle,
  }
}

const applyStyles = () => {
  if (geometry && isRepaintNeeded) {
    const { rightAngle, leftAngle, rightScale, leftScale, topAngle } = geometry

    const computedStyle = `
--base: ${absoluteWidth}px;
--right-scale: ${rightScale};
--left-scale: ${leftScale};
--top-angle: ${topAngle}deg;
--right-angle: ${rightAngle}deg;
--left-angle: ${leftAngle}deg;`

    baseElement!.setAttribute("style", computedStyle)
    isRepaintNeeded = false
  }
  window.requestAnimationFrame(applyStyles)
}

const handleResize = () => {
  basePosition = baseElement?.getBoundingClientRect()
  // absoluteWidth = (window.innerHeight * relativeWidth) / 100
}

const animateTheme = (app: Element) => {
  const theme = _sample(themeList) ?? "green"
  app.classList.remove(`${currentTheme}-theme`)
  app.classList.add(`${theme}-theme`)
  currentTheme = theme
  setTimeout(() => animateTheme(app), 2000)
}

export function runOldJSCode() {
  const app = document.querySelector(".App")
  debugElement = document.getElementById("debug")
  baseElement = document.getElementById("base")

  if (!baseElement || !app) {
    console.error({ app, baseElement })
    return new Error("required elements missing!")
  }

  basePosition = baseElement.getBoundingClientRect()

  animateTheme(app)
  handleResize()
  applyStyles()
  window.addEventListener("mousemove", handleMouseMove, false)
  window.addEventListener("resize", handleResize, false)
}
