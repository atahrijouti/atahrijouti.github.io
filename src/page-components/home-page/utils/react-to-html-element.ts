import styles from "../components/fractal/fractal.module.css"
import { renderToString } from "react-dom/server"

const impossibleElement = () => {
  const impossible = document.createElement("div")
  impossible.classList.add(styles.impossible)
  return impossible
}

export const reactToHtmlElement = (reactElement: JSX.Element): HTMLElement => {
  const html = renderToString(reactElement)
  const template = document.createElement("template")
  template.innerHTML = html
  return (template.content.firstElementChild as HTMLElement) ?? impossibleElement()
}
