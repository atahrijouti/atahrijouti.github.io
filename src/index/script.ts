import _throttle from "lodash/throttle"
import _sample from "lodash/sample"
import { computeFractalFromMouse } from "./math"

import "./App.css"
import "./Node.css"

let debugElement: HTMLElement | null = null
let baseElement: HTMLElement | null = null
let basePosition: ClientRect | DOMRect = {} as ClientRect | DOMRect

const themeList = ["green", "red", "purple"]
let currentTheme = themeList[0]
const baseWidth = 75

const handleMouseMove = _throttle((e: MouseEvent) => {
  const { rightScale, leftScale, topAngle, rightAngle, leftAngle } =
    computeFractalFromMouse(e.pageX, e.pageY, basePosition, baseWidth)

  const computedStyle = `
--base: ${baseWidth}px;
--right-scale: ${rightScale};
--left-scale: ${leftScale};
--top-angle: ${topAngle}deg;
--right-angle: ${rightAngle}deg;
--left-angle: ${leftAngle}deg;`

  baseElement!.setAttribute("style", computedStyle)
}, 60)

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
  window.addEventListener("mousemove", handleMouseMove, false)
  window.addEventListener(
    "resize",
    () => {
      basePosition = baseElement!.getBoundingClientRect()
    },
    false
  )
}

window.addEventListener("load", App)
