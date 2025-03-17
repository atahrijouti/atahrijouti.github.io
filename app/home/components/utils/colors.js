import { COLORS } from "./constants.js";
const { leafyGreen, plumPurple, pinkRed, midGray } = COLORS;
const RgbLeafColors = {
  leafyGreen,
  pinkRed,
  plumPurple,
  midGray
};
const LeafColorNumbers = (() => {
  const entries = Object.entries(RgbLeafColors);
  return entries.reduce(
    (acc, [colorName, rgbValue]) => {
      acc[colorName] = rgbValue.replace(/\)|rgb\(|\s/g, "").trim();
      return acc;
    },
    {}
  );
})();
export {
  LeafColorNumbers,
  RgbLeafColors
};
