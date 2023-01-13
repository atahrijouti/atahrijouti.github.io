import _sample from "lodash/sample"

import { RgbLeafColors } from "./constants"

export const LeafColorVars = Object.fromEntries(
  Object.entries(RgbLeafColors).map(([name, color]) => [
    name,
    color.replace("rgb(", "").replace(")", ""),
  ]),
)

type LeafColorVarKey = keyof typeof LeafColorVars
type LeafColorVarValue = typeof LeafColorVars[LeafColorVarKey]

const leafColorVarValues: LeafColorVarValue[] = Object.entries(LeafColorVars).map(
  ([_, value]) => value,
)

export const randomColorVar = (): LeafColorVarValue =>
  _sample(leafColorVarValues) as LeafColorVarValue
