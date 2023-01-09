import { Leaf } from "./leaf"
import { RefObject, useCallback, useEffect, useRef } from "react"

import { mouseToFractalGeometry } from "../../utils/mouse-to-fractal-geometry"
import { canvas, debug } from "./fractal.css"
import { randomColor } from "../../utils/colors"

const geometry = {
  rightScale: 0.707,
  leftScale: 0.707,
  topAngle: 90,
  leftAngle: 45,
  rightAngle: 45,
  relativeWidth: 12.5,
  absoluteWidth: 75,
  basePosition: {} as DOMRect,
}

let isRepaintNeeded = true
let loop = true

const applyRandomColorToRef = (ref: RefObject<HTMLElement>) =>
  ref.current?.style.setProperty("--growing-leaf-color", randomColor())

const showDebug = (object: any, debugRef: RefObject<HTMLPreElement>) => {
  if (!debugRef.current) {
    return new Error("Don't call showDebug before render")
  }
  debugRef.current.innerHTML = JSON.stringify(object, null, 2)
}

export const Fractal = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  const debugRef = useRef<HTMLPreElement>(null)

  const applyStyles = useCallback(() => {
    if (isRepaintNeeded) {
      const { absoluteWidth, leftScale, rightScale, topAngle, leftAngle, rightAngle } = geometry

      const computedStyle = {
        "--base": `${absoluteWidth}px`,
        "--left-scale": `${leftScale}`,
        "--right-scale": `${rightScale}`,
        "--top-angle": `${topAngle}deg`,
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

  const updateBaseGeometry = useCallback(() => {
    geometry.absoluteWidth = (window.innerHeight * geometry.relativeWidth) / 100
    canvasRef.current?.style.setProperty("--base", `${geometry.absoluteWidth}px`)
    geometry.basePosition = baseRef.current?.getBoundingClientRect() ?? ({} as DOMRect)
  }, [baseRef, canvasRef])

  const handleResize = useCallback(() => {
    isRepaintNeeded = true
    updateBaseGeometry()
  }, [updateBaseGeometry])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    isRepaintNeeded = true

    const { rightScale, leftScale, topAngle, rightAngle, leftAngle } = mouseToFractalGeometry(
      e.pageX,
      e.pageY,
      geometry.basePosition,
      geometry.absoluteWidth,
    )

    Object.assign(geometry, {
      rightScale,
      leftScale,
      topAngle,
      rightAngle,
      leftAngle,
    })
  }, [])

  // on mount
  useEffect(() => {
    applyRandomColorToRef(canvasRef)
    updateBaseGeometry()
    applyStyles()

    window.addEventListener("resize", handleResize, false)
    window.addEventListener("mousemove", handleMouseMove, false)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      isRepaintNeeded = false
      loop = false
    }
  }, [applyStyles, updateBaseGeometry, handleMouseMove, handleResize])

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
