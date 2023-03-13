import { RefObject, useCallback, useEffect, useRef } from "react"

import { setElementVars } from "@vanilla-extract/dynamic"

import { Leaf } from "./leaf"
import { FractalGeometry, lookAtPoint } from "../../utils/math"
import {
  base,
  visualTarget,
  canvas,
  fractalVars,
  startupGeometry,
  growingLeafVar,
  leftAngleVar,
  leftScaleVar,
  polarityXVar,
  polarityYVar,
  rightAngleVar,
  rightScaleVar,
  visualXVar,
  visualYVar,
} from "./fractal.css"
import { randomColorVar } from "../../utils/colors"
import { ThemeTimeout } from "../../utils/constants"

let isRepaintNeeded = true
let loop = true

const applyRandomColorToRef = (ref: RefObject<HTMLElement>) => {
  if (ref.current) {
    setElementVars(ref.current, {
      [growingLeafVar]: randomColorVar(),
    })
  }
}

const computeStartupGeometry = () => ({ ...startupGeometry })

const geometry: FractalGeometry = computeStartupGeometry()

export const Fractal = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const styleLoop = useCallback(() => {
    if (isRepaintNeeded) {
      const {
        leftScale,
        rightScale,
        leftAngle,
        rightAngle,
        polarityX,
        polarityY,
        visualTargetX,
        visualTargetY,
      } = geometry

      if (canvasRef.current) {
        setElementVars(canvasRef.current, {
          [leftScaleVar]: `${leftScale}`,
          [rightScaleVar]: `${rightScale}`,
          [leftAngleVar]: `${leftAngle}deg`,
          [rightAngleVar]: `${rightAngle}deg`,
          [polarityXVar]: `${polarityX}`,
          [polarityYVar]: `${polarityY}`,
          [visualXVar]: `${visualTargetX}px`,
          [visualYVar]: `${visualTargetY}px`,
        })
      }

      isRepaintNeeded = false
    }
    loop && window.requestAnimationFrame(styleLoop)
  }, [canvasRef])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isRepaintNeeded = true
    dragging.current = true

    Object.assign(
      geometry,
      lookAtPoint(
        e.clientX,
        e.clientY,
        canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect),
      ),
    )
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging.current) {
        isRepaintNeeded = true

        Object.assign(
          geometry,
          lookAtPoint(
            e.clientX,
            e.clientY,
            canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect),
          ),
        )
      }
    },
    [canvasRef],
  )

  const handleMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  // on mount
  useEffect(() => {
    Object.assign(geometry, computeStartupGeometry())
    isRepaintNeeded = true
    loop = true
    applyRandomColorToRef(canvasRef)
    styleLoop()

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseUp)
      dragging.current = false
      isRepaintNeeded = false
      loop = false
    }
  }, [styleLoop, handleMouseMove, handleMouseDown, handleMouseUp])

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
      <div id="visualTarget" className={visualTarget}></div>
      <div id="base" className={base}>
        <Leaf />
      </div>
    </div>
  )
}
