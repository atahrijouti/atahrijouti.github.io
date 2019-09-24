import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import classNames from "classnames"
import _throttle from "lodash/throttle"

import { MAX_LEAVES_PER_NODE, Node } from "../Node"
import "./App.css"

type LevelsContextType = {
  levelReached: number
  updateLevelReached: (nextLevel: number) => void
}
export const LevelsContext = createContext<LevelsContextType>({
  levelReached: 0,
  updateLevelReached: () => {},
})

const d2r = (degree: number) => (degree * Math.PI) / 180
const r2d = (radian: number) => (radian / Math.PI) * 180

const clamp = (value: number, min: number, max: number) => {
  return value >= max ? max : value <= min ? min : value
}

// const pageWidth = document.body.clientWidth
// const pageHeight = document.body.clientHeight

let debugElement: HTMLElement | null = null
let baseElement: HTMLElement | null = null
let basePosition: ClientRect | DOMRect = {} as ClientRect | DOMRect

window.addEventListener(
  "resize",
  () => {
    if (baseElement) {
      basePosition = baseElement.getBoundingClientRect()
    }
  },
  false
)

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

export function App() {
  const [levelReached, setLevel] = useState(0)

  useEffect(() => {
    debugElement = document.getElementById("debug")
    baseElement = document.getElementById("base")
    basePosition = baseElement!.getBoundingClientRect()
  }, [])

  const updateLevelReached = useCallback(
    (nextLevel: number) => {
      if (nextLevel > levelReached) {
        setLevel(nextLevel)
      }
    },
    [levelReached]
  )

  const theme: string = useMemo(() => {
    const themes = ["green", "red", "purple"]
    return themes.map(name => `${name}-theme`)[
      ((Math.random() * 100) | 0) % themes.length
    ]
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, false)
  }, [])

  return (
    <LevelsContext.Provider value={{ levelReached, updateLevelReached }}>
      <div className={classNames("App", theme)}>
        <div id="base" className="base">
          <Node level={1} id="1" maxChildren={MAX_LEAVES_PER_NODE} />
        </div>
      </div>
    </LevelsContext.Provider>
  )
}
