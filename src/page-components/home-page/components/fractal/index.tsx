import { RefObject, useCallback, useEffect, useRef } from "react"

import { setElementVars } from "@vanilla-extract/dynamic"

import { Leaf } from "./leaf"
import { lookAtPoint } from "../../utils/math"
import {
  base,
  canvas,
  fractalVars,
  geometry,
  growingLeafVar,
  leftAngleVar,
  leftScaleVar,
  polarityXVar,
  polarityYVar,
  rightAngleVar,
  rightScaleVar,
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

export const Fractal = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  const styleLoop = useCallback(() => {
    if (isRepaintNeeded) {
      const { leftScale, rightScale, leftAngle, rightAngle, polarityX, polarityY } = geometry

      if (canvasRef.current) {
        setElementVars(canvasRef.current, {
          [leftScaleVar]: `${leftScale}`,
          [rightScaleVar]: `${rightScale}`,
          [leftAngleVar]: `${leftAngle}deg`,
          [rightAngleVar]: `${rightAngle}deg`,
          [polarityXVar]: `${polarityX}`,
          [polarityYVar]: `${polarityY}`,
        })
      }

      isRepaintNeeded = false
    }
    loop && window.requestAnimationFrame(styleLoop)
  }, [canvasRef])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      isRepaintNeeded = true

      Object.assign(
        geometry,
        lookAtPoint(
          e.pageX,
          e.pageY,
          canvasRef.current?.getBoundingClientRect() ?? ({} as DOMRect),
        ),
      )
    },
    [canvasRef],
  )

  // on mount
  useEffect(() => {
    isRepaintNeeded = true
    loop = true
    applyRandomColorToRef(canvasRef)
    styleLoop()

    window.addEventListener("mousemove", handleMouseMove, false)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      isRepaintNeeded = false
      loop = false
    }
  }, [styleLoop, handleMouseMove])

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
      <div id="base" className={base}>
        <Leaf />
      </div>
    </div>
  )
}
