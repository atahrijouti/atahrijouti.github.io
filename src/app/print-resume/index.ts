import { $loop, html, type Config, type Metadata } from "unbundle"
import { isServer } from "../../helpers/environment.ts"
import { makeMap } from "../../helpers/map.ts"
import employments from "../resume/data.json" with { type: "json" }
import frontendEmployments from "../resume/front-end-focus.json" with { type: "json" }
import { Employment } from "../resume/index.ts"
import type { EmploymentData } from "../resume/types.ts"

let contactInfoData = {
  email: "hello@example.com",
  phone: "+1234567890",
  github: "example",
  linkedin: "example",
}

if (isServer) {
  const fs = await import("node:fs")
  if (fs.existsSync("./private/contact-info-data.json")) {
    contactInfoData = {
      ...contactInfoData,
      ...JSON.parse(fs.readFileSync("./private/contact-info-data.json", "utf-8")),
    }
  }
}

const ContactInfo = () => {
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

const focusDict = { frontend: frontendEmployments, default: employments } as const
const focusMap = makeMap<EmploymentData[]>(focusDict)

let employmentsEl: HTMLElement | null

const adjustToFocus = (focus: string) => {
  if (!employmentsEl) return
  if (focusMap.has(focus)) {
    employmentsEl.innerHTML = $loop(frontendEmployments, (employment) => Employment(employment))
  }
}

const adjustContactInfo = () => {
  const contactInfoEl = document.querySelector(".contact-info")
  if (!contactInfoEl) {
    return
  }
  contactInfoEl.innerHTML = ContactInfo()
}

export const metadata: Metadata = {
  title: "Print Resumé",
  description: "Abderrahmane Tahri Jouti's Resumé",
}

export const config: Config = {
  layout: "app/print-resume/cv.layout.html",
}

export const ready = () => {
  // the mediocrity of this code is alarming xD
  employmentsEl = document.querySelector(".employments")
  const params = new URLSearchParams(document.location.search)
  const focus = params.get("focus")
  if (focus != null) {
    adjustToFocus(focus)
  }
  const email = params.get("email")
  const phone = params.get("phone")
  if (email || phone) {
    contactInfoData = {
      ...contactInfoData,
      ...(email && { email }),
      ...(phone && { phone }),
    }
    adjustContactInfo()
  }
}

export const content = () => {
  return html`<div class="print-resume-page">
    <section>
      <h1 class="name"><strong>Abderrahmane</strong> <span class="last-name">Tahri Jouti</span></h1>
      <h2 class="title">Engineering Lead</h2>
      <p class="description">
        Engineering Leader with 10+ years of full-stack experience and product leadership, aligning
        technical decisions with user needs and business priorities.
      </p>
      <div class="contact-info">${ContactInfo()}</div>
    </section>
    <section class="experience">
      <h1>Experience</h1>
      <div class="employments">${$loop(employments, (employment) => Employment(employment))}</div>
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
