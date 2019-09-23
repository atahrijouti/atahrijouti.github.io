import React, {
  createContext,
  CSSProperties,
  useCallback,
  useMemo,
  useState,
} from "react"
import classNames from "classnames"
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

const base = 75
const topAngle = 70
const rightAngle = 34
const leftAngle = 180 - topAngle - rightAngle

const d2r = (degree: number) => (degree * Math.PI) / 180

export function App() {
  const [levelReached, setLevel] = useState(0)
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

  const config = useMemo<CSSProperties>(() => {
    // base / sin(topAngle) = leftBase / sin(rightAngle) = rightBase / sin(leftAngle)
    const d = base / Math.sin(d2r(topAngle))
    const rightScale = (d * Math.sin(d2r(leftAngle))) / base
    const leftScale = (d * Math.sin(d2r(rightAngle))) / base

    return {
      "--base": `${base}px`,
      "--right-scale": rightScale,
      "--left-scale": leftScale,
      "--top-angle": `${topAngle}deg`,
      "--right-angle": `${rightAngle}deg`,
      "--left-angle": `${leftAngle}deg`,
    } as CSSProperties
  }, [])

  return (
    <LevelsContext.Provider value={{ levelReached, updateLevelReached }}>
      <div className={classNames("App", theme)}>
        <div className="base" style={config}>
          <Node level={1} id="1" maxChildren={MAX_LEAVES_PER_NODE} />
        </div>
      </div>
    </LevelsContext.Provider>
  )
}
