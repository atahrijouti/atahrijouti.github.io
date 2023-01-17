import { Leaf } from "./leaf"
import { RefObject, useCallback, useEffect, useRef } from "react"

import { getBaseRectFromCanvas, lookAtPoint } from "../../utils/math"
import { canvas, debug, fractalVars } from "./fractal.css"
import { randomColorVar } from "../../utils/colors"
import { ThemeTimeout } from "../../utils/constants"

const geometry = {
  canvasWidth: 600,
  base: 75,
  rightScale: 0.707,
  leftScale: 0.707,
  leftAngle: 45,
  rightAngle: 45,
  polarityX: 0,
  polarityY: 1,
}

const computeGeometry = (
  focus: { x: number; y: number },
  canvasRect: { top: number; left: number; width: number },
) => {
  const { rightScale, leftScale, rightAngle, leftAngle, polarityX, polarityY } = lookAtPoint(
    focus.x,
    focus.y,
    canvasRect,
  )

  Object.assign(geometry, {
    rightScale,
    leftScale,
    rightAngle,
    leftAngle,
    polarityX,
    polarityY,
  })
}

let isRepaintNeeded = true
let loop = true

const applyRandomColorToRef = (ref: RefObject<HTMLElement>) =>
  ref.current?.style.setProperty("--growing-leaf-color", randomColorVar())

export const Fractal = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const debugRef = useRef<HTMLPreElement>(null)

  const applyStyles = useCallback(() => {
    if (isRepaintNeeded) {
      const { base, leftScale, rightScale, leftAngle, rightAngle, polarityX, polarityY } = geometry

      const computedStyle = {
        "--base": `${base}px`,
        "--left-scale": `${leftScale}`,
        "--right-scale": `${rightScale}`,
        "--left-angle": `${leftAngle}deg`,
        "--right-angle": `${rightAngle}deg`,
        "--polarity-x": `${polarityX}`,
        "--polarity-y": `${polarityY}`,
      }

      Object.entries(computedStyle).forEach(([key, value]) =>
        canvasRef.current?.style.setProperty(key, value),
      )
      isRepaintNeeded = false
    }
    loop && window.requestAnimationFrame(applyStyles)
  }, [canvasRef])

  const applyBaseGeometryToStyles = useCallback(() => {
    const canvasRect = canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect)
    const baseRect = getBaseRectFromCanvas(canvasRect)
    geometry.base = baseRect.width
    geometry.canvasWidth = canvasRect.width
    canvasRef.current?.style.setProperty("--base", `${baseRect.width}px`)
    canvasRef.current?.style.setProperty("--canvas-width", `${canvasRect.width}px`)
  }, [canvasRef])

  const handleResize = useCallback(() => {
    isRepaintNeeded = true
    applyBaseGeometryToStyles()
  }, [applyBaseGeometryToStyles])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      isRepaintNeeded = true
      computeGeometry(
        { x: e.pageX, y: e.pageY },
        canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect),
      )
    },
    [canvasRef],
  )

  // on mount
  useEffect(() => {
    isRepaintNeeded = true
    loop = true
    applyRandomColorToRef(canvasRef)
    applyBaseGeometryToStyles()
    computeGeometry({ x: 0, y: 0 }, canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect))
    applyStyles()

    window.addEventListener("resize", handleResize, false)
    window.addEventListener("mousemove", handleMouseMove, false)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      isRepaintNeeded = false
      loop = false
    }
  }, [applyStyles, applyBaseGeometryToStyles, handleMouseMove, handleResize])

  // periodically change theme
  useEffect(() => {
    const interval = setInterval(() => {
      applyRandomColorToRef(canvasRef)
    }, ThemeTimeout)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div id="canvas" className={`${fractalVars} ${canvas}`} ref={canvasRef}>
      <pre className={debug} ref={debugRef} />
      <div className="base" id="base">
        <Leaf />
      </div>
    </div>
  )
}
