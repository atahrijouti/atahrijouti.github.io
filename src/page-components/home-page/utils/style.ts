import { FractalGeometry } from "./math"
import {
  leftAngleVar,
  leftScaleVar,
  polarityXVar,
  polarityYVar,
  rightAngleVar,
  rightScaleVar,
  visualXVar,
  visualYVar,
} from "../components/fractal/fractal.css"

export const geometryToStyles = (geometry: FractalGeometry) => ({
  [leftScaleVar]: `${geometry.leftScale}`,
  [rightScaleVar]: `${geometry.rightScale}`,
  [leftAngleVar]: `${geometry.leftAngle}deg`,
  [rightAngleVar]: `${geometry.rightAngle}deg`,
  [polarityXVar]: `${geometry.polarityX}`,
  [polarityYVar]: `${geometry.polarityY}`,
  [visualXVar]: `${geometry.visualTargetX}%`,
  [visualYVar]: `${geometry.visualTargetY}%`,
})
