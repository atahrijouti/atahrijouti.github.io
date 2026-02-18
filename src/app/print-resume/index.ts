import { $loop, html, type Config, type Metadata } from "unbundle"
import { Employment } from "../resume/index.js"
import employments from "../resume/data.json" with { type: "json" }

export const metadata: Metadata = {
  title: "Print Resumé",
  description: "Abderrahmane Tahri Jouti's Resumé",
}
export const config: Config = {
  layout: "app/print-resume/cv.layout.html",
}
export const content = () => {
  return html`<div class="print-resume-page">
    ${$loop(employments, (employment) => Employment(employment))}
  </div>`
}
