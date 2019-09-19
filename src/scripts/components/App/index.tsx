import React, { createContext, useCallback, useState } from "react"
import "./App.css"
import { MAX_LEAVES_PER_NODE, Node } from "../Node"

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

  return (
    <LevelsContext.Provider value={{ levelReached, updateLevelReached }}>
      <div className="debug">
        <pre>level reached : {levelReached}</pre>
      </div>
      <div className="App">
        <Node level={0} id="0" maxChildren={MAX_LEAVES_PER_NODE} />
      </div>
    </LevelsContext.Provider>
  )
}
