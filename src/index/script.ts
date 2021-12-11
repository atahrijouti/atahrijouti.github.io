import _throttle from "lodash/throttle"
import _sample from "lodash/sample"
import { computeFractalFromMouse } from "./math"

import "./App.css"
import "./Node.css"

let debugElement: HTMLElement | null = null
let baseElement: HTMLElement | null = null
let basePosition: DOMRect | undefined = {} as DOMRect
const relativeWidth = 12.5
let absoluteWidth: number = 75

const themeList = ["green", "red", "purple"]
let currentTheme = themeList[0]

const handleMouseMove = _throttle((e: MouseEvent) => {
  if (!basePosition) {
    return false
  }
  const { rightScale, leftScale, topAngle, rightAngle, leftAngle } =
    computeFractalFromMouse(e.pageX, e.pageY, basePosition, absoluteWidth)

  const computedStyle = `
--base: ${absoluteWidth}px;
--right-scale: ${rightScale};
--left-scale: ${leftScale};
--top-angle: ${topAngle}deg;
--right-angle: ${rightAngle}deg;
--left-angle: ${leftAngle}deg;`

  baseElement!.setAttribute("style", computedStyle)
}, 60)

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

function App() {
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
  window.addEventListener("mousemove", handleMouseMove, false)
  window.addEventListener("resize", handleResize, false)
}

window.addEventListener("load", App)
