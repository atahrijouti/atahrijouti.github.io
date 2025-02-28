import type { Metadata } from "../../types.js"
import { html } from "../../utils/html.js"

import employments from "./data.json" with { type: "json" }
import type { EmploymentData, Task } from "./types.js"

console.log(employments)

type DateDetailProps = {
  startDate: string
  endDate?: string
}

type SkillsProps = { skills: string[] }
const Skills = ({ skills }: SkillsProps) => {
  return html`
    <small>
      <strong>Skills</strong>:&nbsp;
      <em>${skills?.map((skill) => html`<span class="skill-item"> ${skill} </span>`)}</em>
    </small>
  `
}

const DateDetail = ({ startDate, endDate }: DateDetailProps) => {
  return html` <span><em>${startDate}</em> - <em>${endDate ?? "Present"}</em></span>`
}

const EmployerDetail = ({
  name,
  url,
}: {
  name: EmploymentData["employerName"]
  url: EmploymentData["employerUrl"]
}) => {
  if (url) {
    return html`<a href="${url}" title="${name} on Linkedin" class="secondary"> ${name} </a>`
  } else {
    return html`<u>${name}</u>`
  }
}

type TasksProps = { tasks: Task[] }
const Tasks = ({ tasks }: TasksProps) => {
  return html`<ul>
    ${tasks.map((task) => {
      if (typeof task === "string") {
        return html`<li>${task}</li>`
      }
      return html`<li>
        ${task.task}
        <ul>
          ${task.subTasks.map((task) => {
            return html`<li>${task}</li>`
          })}
        </ul>
      </li>`
    })}
  </ul>`
}

const SinglePosition = (employment: EmploymentData) => {
  const { title, tasks, skills } = employment.positions[0]

  return html`<h2>${title}</h2>
    <dl>
      <dd>
        ${EmployerDetail({
          name: employment.employerName,
          url: employment.employerUrl,
        })}
        &nbsp;&#183;&nbsp;${employment.employmentType}
      </dd>
      <dd>${DateDetail({ startDate: employment.startDate, endDate: employment.endDate })}</dd>
      <dd>
        <span>
          <small>${employment.location}</small>&nbsp;&#183;&nbsp;
          <small>${employment.locationType}</small>
        </span>
      </dd>
      ${tasks && html`<dd>${Tasks({ tasks })}</dd>`}
      ${skills && html`<dd>${Skills({ skills })}</dd>`}
    </dl>`
}

const Employment = (employment: EmploymentData) => {
  const hasMultiplePositions = employment.positions.length > 1

  return html`<article class="employment-article">
    ${hasMultiplePositions
      ? html`<MultiplePositions employment="{employment" as EmploymentWithMultiplePositions} />`
      : SinglePosition(employment)}
  </article>`
}

export const metadata: Metadata = {
  title: "Resumé",
  description: "A summary of each step and turn my career took",
}

export const content = () => {
  return html`<div class="resume-page">
    <h1>Resumé</h1>
    <section>${employments.map((employment) => Employment(employment))}</section>
  </div>`
}
