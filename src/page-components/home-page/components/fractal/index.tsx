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
} from "./fractal.css"
import { randomColorVar } from "../../utils/colors"
import { ThemeTimeout } from "../../utils/constants"
import { geometryToStyles } from "../../utils/style"

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
      if (canvasRef.current) {
        setElementVars(canvasRef.current, geometryToStyles(geometry))
      }

      isRepaintNeeded = false
    }
    loop && window.requestAnimationFrame(styleLoop)
  }, [canvasRef])

  const handlePointerDown = useCallback((e: MouseEvent) => {
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

  const handlePointerMove = useCallback(
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

  const handlePointerUp = useCallback(() => {
    dragging.current = false
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
      dragging.current = false
      isRepaintNeeded = false
      loop = false
    }
  }, [styleLoop, handlePointerMove, handlePointerDown, handlePointerUp])

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
