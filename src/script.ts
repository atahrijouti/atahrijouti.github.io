import _throttle from "lodash/throttle"
import _sample from "lodash/sample"

import "./App.css"
import "./Node.css"

const d2r = (degree: number) => (degree * Math.PI) / 180
const r2d = (radian: number) => (radian / Math.PI) * 180

const clamp = (value: number, min: number, max: number) => {
  return value >= max ? max : value <= min ? min : value
}

let debugElement: HTMLElement | null = null
let baseElement: HTMLElement | null = null
let basePosition: ClientRect | DOMRect = {} as ClientRect | DOMRect

const themeList = ["green", "red", "purple"]
let currentTheme = themeList[0]
const base = 75
const d = base / Math.sin(Math.PI / 2)

const handleMouseMove = _throttle((e: MouseEvent) => {
  const MX = e.pageX
  const MY = e.pageY
  const topAngle = 90
  const MH = MY - basePosition.top
  const HC = MX - (basePosition.left + base / 2)
  const MC = Math.sqrt(MH * MH + HC * HC)
  const TCL_RAW = r2d(Math.asin(MH / MC))
  let position: "top-left" | "bottom-left" | "top-right" | "bottom-right" | "" =
    ""

  if (MH < 0 && HC < 0) {
    position = "top-left"
  }
  if (MH >= 0 && HC < 0) {
    position = "bottom-left"
  }
  if (MH < 0 && HC >= 0) {
    position = "top-right"
  }
  if (MH >= 0 && HC >= 0) {
    position = "bottom-right"
  }
  let TCL = TCL_RAW
  switch (position) {
    case "top-left":
      TCL = -TCL_RAW
      break
    case "top-right":
      TCL = TCL_RAW + 180
      break
    case "bottom-right":
      TCL = 180 - TCL
      break
  }

  TCL = clamp(TCL, 30, 150)

  const leftAngle = (180 - TCL) / 2
  const rightAngle = TCL / 2

  const rightScale = (d * Math.sin(d2r(leftAngle))) / base
  const leftScale = (d * Math.sin(d2r(rightAngle))) / base

  const computedStyle = `
--base: ${base}px;
--right-scale: ${rightScale};
--left-scale: ${leftScale};
--top-angle: ${topAngle}deg;
--right-angle: ${rightAngle}deg;
--left-angle: ${leftAngle}deg;`

  baseElement!.setAttribute("style", computedStyle)

  if (debugElement) {
    debugElement!.innerHTML = `
M.x = ${MX};
M.y = ${MY};
MH = ${MH}
HC = ${HC}
position = ${position}
MC = ${MC}
TCL = ${TCL}
rightAngle = ${rightAngle}
leftAngle = ${leftAngle}
topAngle = ${topAngle}
`
  }
}, 60)

const animateTheme = () => {
  const theme = _sample(themeList) ?? "green"
  document.querySelector(".App")?.classList.add(`${theme}-theme`)
  document.querySelector(".App")?.classList.remove(`${currentTheme}-theme`)
  currentTheme = theme

  console.log(theme)
  setTimeout(animateTheme, 2000)
}

function App() {
  debugElement = document.getElementById("debug")
  baseElement = document.getElementById("base")
  basePosition = baseElement!.getBoundingClientRect()

  animateTheme()
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
