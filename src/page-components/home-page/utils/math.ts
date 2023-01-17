import _clamp from "lodash/clamp"
import { GEOMETRY } from "./constants"

export const d2r = (degree: number) => (degree * Math.PI) / 180
export const r2d = (radian: number) => (radian / Math.PI) * 180

export const lookAtPoint = (
  focusX: number,
  focusY: number,
  canvasRect: { top: number; left: number; width: number },
) => {
  const baseRect = getBaseRectFromCanvas(canvasRect)
  const MHm = focusY - baseRect.top
  const HC = focusX - (baseRect.left + baseRect.width / 2)
  const MC = Math.sqrt(MHm * MHm + HC * HC)
  const MCH = r2d(Math.asin(Math.abs(MHm) / MC))

  const TCL_RAW = HC > 0 ? 180 - MCH : MCH
  const TCR_RAW = 180 - TCL_RAW

  const polarityY = Math.sin(d2r(TCR_RAW)) * Math.sign(-MHm)
  const polarityX = Math.cos(d2r(TCR_RAW))

  const TCL = _clamp(TCL_RAW, 30, 150)
  const leftAngle = (180 - TCL) / 2
  const rightAngle = TCL / 2

  const rightScale = Math.sin(d2r(leftAngle))
  const leftScale = Math.sin(d2r(rightAngle))

  return {
    rightScale,
    leftScale,
    rightAngle,
    leftAngle,
    polarityX,
    polarityY,
  }
}

export const getBaseRectFromCanvas = (canvasRect: { top: number; left: number; width: number }) => {
  const baseWidth = canvasRect.width * GEOMETRY.canvasToBaseNodeRatio

  return {
    top: canvasRect.top + canvasRect.width - baseWidth,
    left: canvasRect.left + canvasRect.width / 2 - baseWidth / 2,
    width: baseWidth,
  }
}
