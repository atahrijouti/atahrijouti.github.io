import { renderToString } from "react-dom/server"
import { impossible } from "../components/fractal/fractal.css"

const impossibleElement = () => {
  const impossibleElement = document.createElement("div")
  impossibleElement.classList.add(impossible)
  return impossibleElement
}

export const reactToHtmlElement = (reactElement: JSX.Element): HTMLElement => {
  const html = renderToString(reactElement)
  const template = document.createElement("template")
  template.innerHTML = html
  return (template.content.firstElementChild as HTMLElement) ?? impossibleElement()
}
