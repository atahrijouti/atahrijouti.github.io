import { Node } from "./Node"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { runOldJSCode } from "./script"
import _sample from "lodash/sample"

const themeList = ["green", "red", "purple", "green", "red", "purple"] as const
type NodeColor = typeof themeList[number]
type NodeColorClass = `${NodeColor}-theme`

const randomTheme = (): NodeColorClass => `${_sample(themeList) as NodeColor}-theme`
const initialTheme = randomTheme()

const Canvas = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`

export const Fractal = () => {
  const [theme, setTheme] = useState<NodeColorClass>(initialTheme)

  useEffect(() => {
    runOldJSCode()
    console.log("on mount")
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const theme = randomTheme()
      setTheme(theme)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Canvas className={theme} suppressHydrationWarning>
      <div id="base" className="base">
        <Node />
      </div>
    </Canvas>
  )
}
