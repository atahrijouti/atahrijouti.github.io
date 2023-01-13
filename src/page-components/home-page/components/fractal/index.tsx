import { Leaf } from "./leaf"
import { RefObject, useCallback, useEffect, useRef } from "react"

import { lookAtPoint } from "../../utils/look-at-point"
import { canvas, debug } from "./fractal.css"
import { randomColorVar } from "../../utils/colors"

const geometry = {
  absoluteWidth: 75,
  rightScale: 0.707,
  leftScale: 0.707,
  leftAngle: 45,
  rightAngle: 45,
  relativeWidth: 12.5,
  basePosition: {} as DOMRect,
}

let isRepaintNeeded = true
let loop = true

const applyRandomColorToRef = (ref: RefObject<HTMLElement>) =>
  ref.current?.style.setProperty("--growing-leaf-color", randomColorVar())

export const Fractal = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  const debugRef = useRef<HTMLPreElement>(null)

  const applyStyles = useCallback(() => {
    if (isRepaintNeeded) {
      const { absoluteWidth, leftScale, rightScale, leftAngle, rightAngle } = geometry

      const computedStyle = {
        "--base": `${absoluteWidth}px`,
        "--left-scale": `${leftScale}`,
        "--right-scale": `${rightScale}`,
        "--left-angle": `${leftAngle}deg`,
        "--right-angle": `${rightAngle}deg`,
      }

      Object.entries(computedStyle).forEach(([key, value]) =>
        canvasRef.current?.style.setProperty(key, value),
      )
      isRepaintNeeded = false
    }
    loop && window.requestAnimationFrame(applyStyles)
  }, [canvasRef])

  const computeGeometry = useCallback((focus: { x: number; y: number }) => {
    const { rightScale, leftScale, rightAngle, leftAngle } = lookAtPoint(
      focus.x,
      focus.y,
      geometry.basePosition,
      geometry.absoluteWidth,
    )

    Object.assign(geometry, {
      rightScale,
      leftScale,
      rightAngle,
      leftAngle,
    })
  }, [])

  const computeBaseWidthGeometry = useCallback(() => {
    const canvasRect = canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect)
    geometry.absoluteWidth = (canvasRect.height * geometry.relativeWidth) / 100
    canvasRef.current?.style.setProperty("--base", `${geometry.absoluteWidth}px`)
    geometry.basePosition = baseRef.current?.getBoundingClientRect() ?? ({} as DOMRect)
  }, [baseRef, canvasRef])

  const handleResize = useCallback(() => {
    isRepaintNeeded = true
    computeBaseWidthGeometry()
  }, [computeBaseWidthGeometry])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      isRepaintNeeded = true
      computeGeometry({ x: e.pageX, y: e.pageY })
    },
    [computeGeometry],
  )

  // on mount
  useEffect(() => {
    applyRandomColorToRef(canvasRef)
    computeBaseWidthGeometry()
    computeGeometry({ x: 0, y: 0 })
    applyStyles()

    window.addEventListener("resize", handleResize, false)
    window.addEventListener("mousemove", handleMouseMove, false)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      isRepaintNeeded = false
      loop = false
    }
  }, [applyStyles, computeBaseWidthGeometry, computeGeometry, handleMouseMove, handleResize])

  // periodically change theme
  useEffect(() => {
    const interval = setInterval(() => {
      applyRandomColorToRef(canvasRef)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div id="canvas" className={canvas} ref={canvasRef}>
      <pre className={debug} ref={debugRef} />
      <div className="base" id="base" ref={baseRef}>
        <Leaf />
      </div>
    </div>
  )
}
