import fs, { readFileSync } from "node:fs"
import { $loop, html } from "unbundle"
import { Employment } from "../resume/index.js"
import employments from "../resume/data.json" with { type: "json" }
import { isBrowser } from "../../helpers/environment.js"
let contactInfoData = {
  email: "hello@example.com",
  phone: "+1234567890",
  github: "example",
  linkedin: "example",
}
if (!isBrowser && fs.existsSync("./private/contact-info-data.json")) {
  contactInfoData = {
    ...contactInfoData,
    ...JSON.parse(readFileSync("./private/contact-info-data.json", "utf-8")),
  }
}
const contactInfo = () => {
  return html`<ul>
    <li>
      <strong>Email :</strong>
      <a href="mailto:${contactInfoData.email}" title="Personal Email">${contactInfoData.email}</a>
    </li>
    <li>
      <strong>Phone :</strong>
      <a href="tel:${contactInfoData.phone}" title="Phone Number">${contactInfoData.phone}</a>
    </li>
    <li>
      <strong>Github :</strong>
      <a href="https://github.com/${contactInfoData.github}" title="Github"
        >${contactInfoData.github}</a
      >
    </li>
    <li>
      <strong>LinkedIn :</strong>
      <a href="https://www.linkedin.com/in/${contactInfoData.linkedin}" title="LinkedIn Profile"
        >${contactInfoData.linkedin}</a
      >
    </li>
  </ul>`
}
const metadata = {
  title: "Print Resum\xE9",
  description: "Abderrahmane Tahri Jouti's Resum\xE9",
}
const config = {
  layout: "app/print-resume/cv.layout.html",
}
const content = () => {
  return html`<div class="print-resume-page">
    <section class="contact-info">
      <h1 class="name"><strong>Abderrahmane</strong> <span class="last-name">Tahri Jouti</span></h1>
      <h2 class="title">Engineering Lead</h2>
      <p class="description">
        Engineering Leader with 10+ years of full-stack experience and product leadership, aligning
        technical decisions with user needs and business priorities.
      </p>
      ${contactInfo()}
    </section>
    <section class="experience">
      <h1>Experience</h1>
      ${$loop(employments, (employment) => Employment(employment))}
    </section>
    <section class="education">
      <h1>Education</h1>
      <dl>
        <dt>Masters degree in Artificial Intelligence and Networking, 2014</dt>
        <dd>Faculté des Sciences et Techniques de Fès, Morocco</dd>
        <dt>Bachelors degree in Computer Engineering, 2011</dt>
        <dd>Faculté des Sciences et Techniques de Fès, Morocco</dd>
      </dl>
    </section>
    <section class="languages">
      <h1>Languages</h1>
      <ul>
        <li>Swedish : <strong>Intermediate</strong></li>
        <li>English & French : <strong>Fluent</strong></li>
        <li>Arabic : <strong>Native</strong></li>
      </ul>
    </section>
  </div>`
}
export { config, content, metadata }
