import { RefObject, useCallback, useEffect, useRef, useState } from "react"

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
  targetBall,
  ballInner,
  canvasInner,
} from "./fractal.css"
import { randomColorVar } from "../../utils/colors"
import { ThemeTimeout } from "../../utils/constants"
import { geometryToStyles } from "../../utils/style"
import classNames from "classnames"

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
  const draggingRef = useRef(false)
  const [showTooltip, setShowtooltip] = useState(true)

  const styleLoop = useCallback(() => {
    if (isRepaintNeeded) {
      if (canvasRef.current) {
        setElementVars(canvasRef.current, geometryToStyles(geometry))
      }

      isRepaintNeeded = false
    }
    loop && window.requestAnimationFrame(styleLoop)
  }, [])

  const handlePointerDown = useCallback(
    (e: MouseEvent) => {
      isRepaintNeeded = true
      draggingRef.current = true
      if (showTooltip) {
        setShowtooltip(false)
      }
      Object.assign(
        geometry,
        lookAtPoint(
          e.clientX,
          e.clientY,
          canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect),
        ),
      )
    },
    [showTooltip],
  )

  const handlePointerMove = useCallback((e: MouseEvent) => {
    if (draggingRef.current) {
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
  }, [])

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false
  }, [])

  // on mount
  useEffect(() => {
    Object.assign(geometry, computeStartupGeometry())
    isRepaintNeeded = true
    loop = true
    applyRandomColorToRef(canvasRef)
    styleLoop()

    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    return () => {
      window.removeEventListener("pointerup", handlePointerDown)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerUp)
      draggingRef.current = false
      isRepaintNeeded = false
      loop = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <div className={canvasInner}>
        <div id="base" className={base}>
          <Leaf />
        </div>
        <div id="visualTarget" className={visualTarget}>
          <div className={targetBall}>
            <div className={classNames(ballInner, { hidden: !showTooltip })}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
