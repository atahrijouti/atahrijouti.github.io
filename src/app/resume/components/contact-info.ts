import { html } from "unbundle"
import { isServer } from "../../../helpers/environment.ts"

const possibleKeys = new Set(["email", "phone", "github", "linkedin"])

export const defaultContactInfoData = {
  github: "atahrijouti",
  linkedin: "atahrijouti",
} as const

export type ContactInfoData = {
  email?: string
  phone?: string
  github?: string
  linkedin?: string
}
export let contactInfoJson: ContactInfoData = { ...defaultContactInfoData }

export const contactInfoPresent = (contactInfoData: ContactInfoData) => {
  const keys = Object.keys(contactInfoData)
  for (const key of keys) {
    if (possibleKeys.has(key)) {
      return true
    }
  }
  return false
}

if (isServer) {
  try {
    const fs = await import("node:fs")
    if (fs.existsSync("./private/contact-info-data.json")) {
      contactInfoJson = {
        ...contactInfoJson,
        ...JSON.parse(fs.readFileSync("./private/contact-info-data.json", "utf-8")),
      }
    }
  } catch (e) {
    console.error("Couldn't source ./private/contact-info-data.json properly", e)
  }
}

export const ContactInfo = ({ email, phone, github, linkedin }: ContactInfoData) => {
  return html`<ul>
    ${email
      ? `<li><strong>Email :</strong> <a href="mailto:${email}" title="Personal Email">${email}</a></li>`
      : ""}
    ${phone
      ? `<li><strong>Phone :</strong> <a href="tel:${phone}" title="Phone Number">${phone}</a></li>`
      : ""}
    ${github
      ? `<li><strong>Github :</strong> <a href="https://github.com/${github}" title="Github" >${github}</a></li>`
      : ""}
    ${linkedin
      ? `<li><strong>LinkedIn :</strong> <a href="https://www.linkedin.com/in/${linkedin}" title="LinkedIn Profile" >${linkedin}</a></li>`
      : ""}
  </ul>`
}
