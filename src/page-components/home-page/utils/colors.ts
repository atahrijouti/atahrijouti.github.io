import _sample from "lodash/sample"

const RgbLeafColors = {
  "--leafy-green": "rgb(117, 166, 58)",
  "--pink-red": "rgb(246, 62, 98)",
  "--mud-purple": "rgb(132, 74, 135)",
} as const

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

export const randomColor = (): LeafColorVarValue => _sample(leafColorVarValues) as LeafColorVarValue
