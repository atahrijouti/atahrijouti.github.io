export const d2r = (degree: number) => (degree * Math.PI) / 180
export const r2d = (radian: number) => (radian / Math.PI) * 180

export const clamp = (value: number, min: number, max: number) => {
  return value >= max ? max : value <= min ? min : value
}

export const computeFractalFromMouse = (
  mouseX: number,
  mouseY: number,
  basePosition: ClientRect | DOMRect,
  baseWidth: number
) => {
  const topAngle = 90
  const d = baseWidth / Math.sin(Math.PI / 2)

  const MH = mouseX - basePosition.top
  const HC = mouseY - (basePosition.left + baseWidth / 2)
  const MC = Math.sqrt(MH * MH + HC * HC)
  const TCL_RAW = r2d(Math.asin(MH / MC))
  let position: "top-left" | "bottom-left" | "top-right" | "bottom-right" | "" =
    ""

  if (MH < 0 && HC < 0) {
    position = "top-left"
  }
  if (MH >= 0 && HC < 0) {
    position = "bottom-left"
  }
  if (MH < 0 && HC >= 0) {
    position = "top-right"
  }
  if (MH >= 0 && HC >= 0) {
    position = "bottom-right"
  }
  let TCL = TCL_RAW
  switch (position) {
    case "top-left":
      TCL = -TCL_RAW
      break
    case "top-right":
      TCL = TCL_RAW + 180
      break
    case "bottom-right":
      TCL = 180 - TCL
      break
  }

  TCL = clamp(TCL, 30, 150)

  const leftAngle = (180 - TCL) / 2
  const rightAngle = TCL / 2

  const rightScale = (d * Math.sin(d2r(leftAngle))) / baseWidth
  const leftScale = (d * Math.sin(d2r(rightAngle))) / baseWidth

  return {
    rightScale,
    leftScale,
    topAngle,
    rightAngle,
    leftAngle,
  }
}
