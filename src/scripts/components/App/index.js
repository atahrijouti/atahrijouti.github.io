import React, { createContext, useState } from "react"
import "./App.css"
import { Node } from "../Node"

export const LevelsContext = createContext({ reachedLevel: 0 })

export function App() {
  const [reachedLevel, setLevel] = useState(0)
  function updateReachedLevel(nextLevel) {
    if (nextLevel > reachedLevel) {
      setLevel(nextLevel)
    }
  }

  return (
    <LevelsContext.Provider value={{ reachedLevel, updateReachedLevel }}>
      <div className="App">
        <Node level={0} base id="1-0-2-3" maxChildren={2} />
      </div>
    </LevelsContext.Provider>
  )
}
