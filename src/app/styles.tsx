import { createGlobalStyle } from "styled-components"

export const AppStyles = createGlobalStyle`
  :root {
  /* colors */
  --light-yellow: 254, 254, 215;
  --pinkred: 246, 62, 98;
  --leafy-green: 117, 166, 58;
  --mud-purple: 132, 74, 135;

  /* default theme */
  --leaf-growing: var(--leafy-green);
  --leaf-full: 128, 128, 128;
}

body {
  padding: 0;
  margin: 0;
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(var(--light-yellow));
}

.debug {
  position: fixed;
  flex: none;
  top: 10px;
  left: 10px;
  color: white;
  background: black;
  width: 200px;
}

.green-theme {
  --leaf-growing: var(--leafy-green);
}

.red-theme {
  --leaf-growing: var(--pinkred);
}

.purple-theme {
  --leaf-growing: var(--mud-purple);
}

.base {
  --base: 75px;
  --base-width: var(--base);
  --base-height: var(--base);
  --scale: 0.707;
  --top-angle: 90deg;
  --right-angle: 45deg;
  --left-angle: 45deg;
  --right-rotation: var(--right-angle);
  --left-rotation: calc(-1 * var(--left-angle));
  --right-scale: 0.707;
  --left-scale: 0.707;
  --coefficient: 1;
}
`
