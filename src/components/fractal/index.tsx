import { Leaf } from "./leaf"
import styled from "styled-components"
import { RefObject, useEffect, useRef } from "react"
import { runOldJSCode } from "./script"
import _sample from "lodash/sample"

const rgbaLeafColors = ["rgb(117, 166, 58)", "rgb(246, 62, 98)", "rgb(132, 74, 135)"] as const
const leafColors = rgbaLeafColors
  .map((color) => color.replace("rgb(", ""))
  .map((s) => s.replace(")", ""))

type LeafColor = typeof leafColors[number]

const randomColor = (): LeafColor => _sample(leafColors) as LeafColor

const Canvas = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  /* colors */
  --pinkred: 246, 62, 98;
  --leafy-green: 117, 166, 58;
  --mud-purple: 132, 74, 135;

  /* default theme */
  --growing-leaf-color: var(--leafy-green);
  --leaf-full: 128, 128, 128;
`

const Base = styled.div.attrs({ id: "base" })`
  --base: 75px;
  --base-width: var(--base);
  --base-height: var(--base);
  --scale: 0.707;
  --top-angle: 90deg;
  --right-angle: 45deg;
  --left-angle: 45deg;
  --right-rotation: var(--right-angle);
  --left-rotation: calc(-1 * var(--left-angle));
  --right-scale: 0.707;
  --left-scale: 0.707;
  --coefficient: 1;
`

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
    <Canvas ref={canvasRef}>
      <Base>
        <Leaf />
      </Base>
    </Canvas>
  )
}
