import React, { createContext, useCallback, useMemo, useState } from "react"
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

  return (
    <LevelsContext.Provider value={{ levelReached, updateLevelReached }}>
      <div className={classNames("App", theme)}>
        <div className="base">
          <Node level={1} id="1" maxChildren={MAX_LEAVES_PER_NODE} />
        </div>
      </div>
    </LevelsContext.Provider>
  )
}
