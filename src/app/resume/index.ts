import type { Metadata } from "../../types.js"
import { html } from "../../utils/tags.js"
import type { EmploymentData, Task } from "./types.js"

import employments from "./data.json" with { type: "json" }

type DateDetailProps = {
  startDate: string
  endDate?: string
}

type SkillsProps = { skills: string[] }
const Skills = ({ skills }: SkillsProps) => {
  return html`
    <small>
      <strong>Skills</strong>:&nbsp;
      <em>${skills?.map((skill) => html`<span class="skill-item"> ${skill} </span>`).join("")}</em>
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
    return html`<a href="${url}" title="${name}'s url" class="secondary"> ${name} </a>`
  } else {
    return html`<u>${name}</u>`
  }
}

type TasksProps = { tasks: Task[] }
const Tasks = ({ tasks }: TasksProps) => {
  return html`<ul>
    ${tasks
      .map((task) => {
        if (typeof task === "string") {
          return html`<li>${task}</li>`
        }
        return html`<li>
          ${task.task}
          <ul>
            ${task.subTasks
              .map((task) => {
                return html`<li>${task}</li>`
              })
              .join("")}
          </ul>
        </li>`
      })
      .join("")}
  </ul>`
}

type SinglePositionProps = {
  employment: EmploymentData
}
const SinglePosition = ({ employment }: SinglePositionProps) => {
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
      ${employment.employmentType}&nbsp;&#183;&nbsp;
      ${DateDetail({ startDate: employment.startDate, endDate: employment.endDate })}
    </dd>
    <dd>
      <span>
        <small>${employment.location}&nbsp;&#183;&nbsp;${employment.locationType}</small>
      </span>
    </dd>
    <dd>
      ${positions
        .map((position) => {
          return html`<dl>
            <dt>
              <h3>${position.title}</h3>
            </dt>

            ${position.startDate &&
            html`<dd>
              ${DateDetail({ startDate: position.startDate, endDate: position.endDate })}
            </dd>`}
            ${position.tasks && html`<dd>${Tasks({ tasks: position.tasks })}</dd>`}
            ${position.skills && html`<dd>${Skills({ skills: position.skills })}</dd>`}
          </dl>`
        })
        .join("")}
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
  styles: ["./styles.css"],
}

export const content = () => {
  return html`<div class="resume-page">
    <h1>Resumé</h1>
    <section>${employments.map((employment) => Employment(employment))}</section>
  </div>`
}
