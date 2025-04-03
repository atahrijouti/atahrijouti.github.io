import type { EmploymentData, Task } from "./types.js"

import employments from "./data.json" with { type: "json" }
import { $loop, html, type Metadata } from "unbundle"

type DateDetailProps = {
  startDate: string
  endDate?: string
}

type SkillsProps = { skills: string[] }
const Skills = ({ skills }: SkillsProps) => {
  const theSkills = $loop(skills, (skill) => html`<span class="skill-item">${skill}</span>`)
  return html`<small><strong>Skills</strong> : <em>${theSkills}</em></small>`
}

const DateDetail = ({ startDate, endDate }: DateDetailProps) => {
  return html`<span><em>${startDate}</em> - <em>${endDate ?? "Present"}</em></span>`
}

const EmployerDetail = ({
  name,
  url,
}: {
  name: EmploymentData["employerName"]
  url: EmploymentData["employerUrl"]
}) => {
  if (url) {
    return html`<a href="${url}" title="${name}'s url" class="secondary">${name}</a>`
  } else {
    return html`<u>${name}</u>`
  }
}

type TasksProps = { tasks: Task[] }
const Tasks = ({ tasks }: TasksProps) => {
  return html`<ul>
    ${$loop(tasks, (task) => {
      if (typeof task === "string") {
        return html`<li>${task}</li>`
      }
      return html`<li>
        ${task.task}
        <ul>
          ${$loop(task.subTasks, (task) => {
            return html`<li>${task}</li>`
          })}
        </ul>
      </li>`
    })}
  </ul>`
}

type SinglePositionProps = {
  employment: EmploymentData
}
const SinglePosition = ({ employment }: SinglePositionProps) => {
  const { title, tasks, skills } = employment.positions[0]
  const employer = EmployerDetail({
    name: employment.employerName,
    url: employment.employerUrl,
  })
  return html`<h2>${title}</h2>
    <dl>
      <dd class="employer-detail">
        <span>${employer}</span><span>${employment.employmentType}</span>
      </dd>
      <dd>${DateDetail({ startDate: employment.startDate, endDate: employment.endDate })}</dd>
      <dd class="location">
        <small>${employment.location}</small><small>${employment.locationType}</small>
      </dd>
      ${tasks && html`<dd>${Tasks({ tasks })}</dd>`}
      ${skills && html`<dd>${Skills({ skills })}</dd>`}
    </dl>`
}

type MultiplePositionsProps = {
  employment: EmploymentData
}
const MultiplePositions = ({ employment }: MultiplePositionsProps) => {
  const { positions } = employment
  return html`<dl>
    <dt>
      <h2>
        ${EmployerDetail({
          name: employment.employerName,
          url: employment.employerUrl,
        })}
      </h2>
    </dt>
    <dd>
      <span>${employment.employmentType}</span>
      <span>${DateDetail({ startDate: employment.startDate, endDate: employment.endDate })}</span>
    </dd>
    <dd class="location">
      <small>${employment.location}</small><small>${employment.locationType}</small>
    </dd>
    <dd>
      ${$loop(positions, (position) => {
        return html`<dl>
          <dt>
            <h3>${position.title}</h3>
          </dt>
          ${position.startDate &&
          html`<dd>
            ${DateDetail({ startDate: position.startDate, endDate: position.endDate })}
          </dd>`}
          ${position.tasks ? html`<dd>${Tasks({ tasks: position.tasks })}</dd>` : ""}
          ${position.skills ? html`<dd>${Skills({ skills: position.skills })}</dd>` : ""}
        </dl>`
      })}
    </dd>
  </dl>`
}

const Employment = (employment: EmploymentData) => {
  const hasMultiplePositions = employment.positions.length > 1

  return html`<article class="employment-article">
    ${hasMultiplePositions ? MultiplePositions({ employment }) : SinglePosition({ employment })}
  </article>`
}

export const metadata: Metadata = {
  title: "Resumé",
  description: "A summary of each step and turn my career took",
}

export const content = () => {
  return html`<div class="resume-page">
    <h1>Resumé</h1>
    <section>${$loop(employments, (employment) => Employment(employment))}</section>
  </div>`
}
