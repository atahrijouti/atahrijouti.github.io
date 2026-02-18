import { $loop, html, type Config, type Metadata } from "unbundle"
import { Employment } from "../resume/index.js"
import employments from "../resume/data.json" with { type: "json" }

let contactInfoData = {
  email: "hello@example.com",
  phone: "+1234567890",
  github: "example",
  linkedin: "example",
}

if (await Bun.file("./private/contact-info-data.json").exists()) {
  contactInfoData = {
    ...contactInfoData,
    ...(await Bun.file("./private/contact-info-data.json").json()),
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

export const metadata: Metadata = {
  title: "Print Resumé",
  description: "Abderrahmane Tahri Jouti's Resumé",
}
export const config: Config = {
  layout: "app/print-resume/cv.layout.html",
}
export const content = () => {
  return html`<div class="print-resume-page">
    <section class="contact-info">
      <h1><strong>Abderrahmane</strong> Tahri Jouti</h1>
      ${contactInfo()}
    </section>
    <section class="experience">
      <h1>Experience</h1>
      ${$loop(employments, (employment) => Employment(employment))}
    </section>
    <section>
      <h1>Education</h1>
    </section>
  </div>`
}
