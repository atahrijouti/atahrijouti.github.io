import _clamp from "lodash/clamp"

export const d2r = (degree: number) => (degree * Math.PI) / 180
export const r2d = (radian: number) => (radian / Math.PI) * 180

export const mouseToFractalGeometry = (
  focusX: number,
  focusY: number,
  basePosition: DOMRect,
  baseWidth: number,
) => {
  const MH = Math.abs(focusY - basePosition.top)
  const HC = focusX - (basePosition.left + baseWidth / 2)
  const MC = Math.sqrt(MH * MH + HC * HC)
  const MCH = r2d(Math.asin(MH / MC))

  let TCL = HC > 0 ? 180 - MCH : MCH

  TCL = _clamp(TCL, 30, 150)
  const leftAngle = (180 - TCL) / 2
  const rightAngle = TCL / 2

  const rightScale = Math.sin(d2r(leftAngle))
  const leftScale = Math.sin(d2r(rightAngle))

  return {
    rightScale,
    leftScale,
    rightAngle,
    leftAngle,
  }
}
