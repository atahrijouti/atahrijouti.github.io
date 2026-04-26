import { $loop, html, type Metadata } from "unbundle"
import { makeMap } from "../../helpers/map.ts"
import employments from "./data/default.json" with { type: "json" }
import frontendEmployments from "./data/front-end-focus.json" with { type: "json" }
import type { EmploymentData } from "./types.ts"
import {
  ContactInfo,
  contactInfoJson,
  contactInfoPresent,
  defaultContactInfoData,
  type ContactInfoData,
} from "./components/contact-info.ts"
import { Employment } from "./components/employment.ts"

const focusDict = { frontend: frontendEmployments, default: employments } as const
const focusMap = makeMap<EmploymentData[]>(focusDict)

let employmentsEl: HTMLElement | null

const adjustToFocus = (focus: string) => {
  if (!employmentsEl) return
  if (focusMap.has(focus)) {
    employmentsEl.innerHTML = $loop(frontendEmployments, (employment) => Employment(employment))
  }
}

let readyContractInfo: ContactInfoData = { ...defaultContactInfoData }
const adjustContactInfo = () => {
  const contactInfoEl = document.querySelector(".contact-info")
  if (!contactInfoEl) {
    return
  }
  contactInfoEl.innerHTML = ContactInfo(readyContractInfo)
}

export const metadata: Metadata = {
  title: "Print Resumé",
  description: "Abderrahmane Tahri Jouti's Resumé",
}

export const ready = () => {
  employmentsEl = document.querySelector(".employments")
  const params = new URLSearchParams(document.location.search)
  const focus = params.get("focus")
  if (focus != null) {
    adjustToFocus(focus)
  }
  const email = params.get("email")
  const github = params.get("github")
  const phone = params.get("phone")
  const linkedin = params.get("linkedin")
  if (email || github || phone || linkedin) {
    readyContractInfo = {
      ...readyContractInfo,
      ...(email && { email }),
      ...(github && { github }),
      ...(phone && { phone }),
      ...(linkedin && { linkedin }),
    }
    adjustContactInfo()
  }
}

export const content = () => {
  return html`<div class="print-resume-page">
    <section class="intro">
      <h1 class="name"><strong>Abderrahmane</strong> <span class="last-name">Tahri Jouti</span></h1>
      <h2 class="title">Engineering Lead</h2>
      <p class="description">
        Engineering Leader with 10+ years of full-stack experience and product leadership, aligning
        technical decisions with user needs and business priorities.
      </p>
      <div class="contact-info">
        ${contactInfoPresent(contactInfoJson) ? ContactInfo(contactInfoJson) : ""}
      </div>
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
