import { GEOMETRY } from "./constants.js"
const d2r = (degree) => (degree * Math.PI) / 180
const r2d = (radian) => (radian / Math.PI) * 180
const clamp = (number, min, max) => Math.max(min, Math.min(number, max))
const lookAtPoint = (targetX, targetY, canvasRect) => {
  const baseRect = getBaseRectFromCanvas(canvasRect)
  const MHm = targetY - baseRect.top
  const HC = targetX - (baseRect.left + baseRect.width / 2)
  const MC = Math.sqrt(MHm * MHm + HC * HC)
  const MCH = r2d(Math.asin(Math.abs(MHm) / MC))
  const TCL_RAW = HC > 0 ? 180 - MCH : MCH
  const TCR_RAW = 180 - TCL_RAW
  const polarityY = Math.sin(d2r(TCR_RAW)) * Math.sign(-MHm)
  const polarityX = Math.cos(d2r(TCR_RAW))
  const TCL = clamp(TCL_RAW, 30, 150)
  const leftAngle = (180 - TCL) / 2
  const rightAngle = TCL / 2
  const rightScale = Math.sin(d2r(leftAngle))
  const leftScale = Math.sin(d2r(rightAngle))
  const visualTargetX = clamp(((targetX - canvasRect.left) / canvasRect.width) * 100, 0, 100)
  const visualTargetY = clamp(((targetY - canvasRect.top) / canvasRect.width) * 100, 0, 100)
  return {
    rightScale,
    leftScale,
    rightAngle,
    leftAngle,
    polarityX,
    polarityY,
    visualTargetX,
    visualTargetY,
  }
}
const getBaseRectFromCanvas = (canvasRect) => {
  const baseWidth = canvasRect.width * GEOMETRY.canvasToBaseNodeRatio
  return {
    top: canvasRect.top + canvasRect.width - baseWidth,
    left: canvasRect.left + canvasRect.width / 2 - baseWidth / 2,
    width: baseWidth,
  }
}
export { clamp, d2r, getBaseRectFromCanvas, lookAtPoint, r2d }
