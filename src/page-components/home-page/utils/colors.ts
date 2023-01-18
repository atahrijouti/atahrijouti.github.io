import _sample from "lodash/sample"
import { LeafColorVars } from "../components/fractal/fractal.css"

const ColorVarNames = Object.keys(LeafColorVars)

export const randomColorVar = () => _sample(ColorVarNames) as string
