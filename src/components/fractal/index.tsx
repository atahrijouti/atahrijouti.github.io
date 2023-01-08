import { Leaf } from "./leaf"
import { RefObject, useEffect, useRef } from "react"
import { runOldJSCode } from "./script"
import _sample from "lodash/sample"

import styles from "./fractal.module.css"

const rgbaLeafColors = ["rgb(117, 166, 58)", "rgb(246, 62, 98)", "rgb(132, 74, 135)"] as const
const leafColors = rgbaLeafColors
  .map((color) => color.replace("rgb(", ""))
  .map((s) => s.replace(")", ""))

type LeafColor = typeof leafColors[number]

const randomColor = (): LeafColor => _sample(leafColors) as LeafColor

const applyRandomColorToRef = (ref: RefObject<HTMLElement>) =>
  ref.current?.style.setProperty("--growing-leaf-color", randomColor())

export const Fractal = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    runOldJSCode()
    applyRandomColorToRef(canvasRef)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      applyRandomColorToRef(canvasRef)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  console.log("Rendering : Fractal")

  return (
    <div id="canvas" className={styles.Canvas} ref={canvasRef}>
      <div id="base" className={styles.Base}>
        <Leaf />
      </div>
    </div>
  )
}
