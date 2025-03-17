import { css } from "../../../../utils/tags.js"
import type { FractalGeometry } from "./math.js"

export const geometryToStyles = (geometry: FractalGeometry) => css`
  --left-scale: ${geometry.leftScale};
  --right-scale: ${geometry.rightScale};
  --left-angle: ${geometry.leftAngle}deg;
  --right-angle: ${geometry.rightAngle}deg;
  --polarity-x: ${geometry.polarityX};
  --polarity-y: ${geometry.polarityY};
  --visual-x: ${geometry.visualTargetX}%;
  --visual-y: ${geometry.visualTargetY}%;
`
