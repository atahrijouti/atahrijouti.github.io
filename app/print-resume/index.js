import { $loop, html } from "unbundle"
import { Employment } from "../resume/index.js"
import employments from "../resume/data.json" with { type: "json" }
const metadata = {
  title: "Print Resum\xE9",
  description: "Abderrahmane Tahri Jouti's Resum\xE9",
}
const config = {
  layout: "app/print-resume/cv.layout.html",
}
const content = () => {
  return html`<div class="print-resume-page">
    ${$loop(employments, (employment) => Employment(employment))}
  </div>`
}
export { config, content, metadata }
