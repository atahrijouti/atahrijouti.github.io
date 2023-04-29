import Link from "next/link"

import {
  employmentArticle,
  resumePage,
  skillItem,
} from "@/page-components/resume-page/resume-page.css"

import employments from "./data.json"
import { Employment, Position, Task } from "./types"

type EmploymentWithSinglePosition = Omit<Employment, "positions"> & { positions: [Position] }
type EmploymentWithMultiplePositions = Omit<Employment, "positions"> & { positions: Position[] }

type TasksProps = { tasks: Task[] }
const Tasks = ({ tasks }: TasksProps) => {
  return (
    <ul>
      {tasks.map((task, i) => {
        if (typeof task === "string") {
          return <li key={i}>{task}</li>
        }
        return (
          <li key={i}>
            {task.task}
            <ul>
              {task.subTasks.map((task, i) => {
                return <li key={i}>{task}</li>
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

type SkillsProps = { skills: string[] }
const Skills = ({ skills }: SkillsProps) => {
  return (
    <small>
      <strong>Skills</strong>:&nbsp;
      <em>
        {skills?.map((skill, i) => (
          <span key={i} className={skillItem}>
            {skill}
          </span>
        ))}
      </em>
    </small>
  )
}

type DateDetailProps = {
  startDate: string
  endDate?: string
}

const DateDetail = ({ startDate, endDate }: DateDetailProps) => {
  return (
    <span>
      <em>{startDate}</em> - <em>{endDate ?? "Present"}</em>
    </span>
  )
}

type EmployerDetailProps = {
  employer: {
    name: Employment["employerName"]
    linkedinProfile: Employment["employerLinkedinProfile"]
  }
}
const EmployerDetail = ({ employer: { name, linkedinProfile } }: EmployerDetailProps) => {
  if (linkedinProfile) {
    return (
      <Link href={linkedinProfile} title={`${name} on Linkedin`} className="secondary">
        {name}
      </Link>
    )
  } else {
    return <u>{name}</u>
  }
}

type SinglePositionProps = {
  employment: EmploymentWithSinglePosition
}
const SinglePosition = ({ employment }: SinglePositionProps) => {
  const { title, tasks, skills } = employment.positions[0]

  return (
    <>
      <h2>{title}</h2>
      <dl>
        <dd>
          <EmployerDetail
            employer={{
              name: employment.employerName,
              linkedinProfile: employment.employerLinkedinProfile,
            }}
          />
          &nbsp;&#183;&nbsp;{employment.employmentType}
        </dd>
        <dd>
          <DateDetail startDate={employment.startDate} endDate={employment.endDate} />
        </dd>
        <dd>
          <span>
            <small>{employment.location}</small>&nbsp;&#183;&nbsp;
            <small>{employment.locationType}</small>
          </span>
        </dd>
        <dd>
          <Tasks tasks={tasks} />
        </dd>
        {skills ? (
          <dd>
            <Skills skills={skills} />
          </dd>
        ) : null}
      </dl>
    </>
  )
}

type MultiplePositionsProps = {
  employment: EmploymentWithMultiplePositions
}
const MultiplePositions = ({ employment }: MultiplePositionsProps) => {
  const { positions } = employment
  return (
    <>
      <dl>
        <dt>
          <h2>
            <EmployerDetail
              employer={{
                name: employment.employerName,
                linkedinProfile: employment.employerLinkedinProfile,
              }}
            />
          </h2>
        </dt>
        <dd>
          {employment.employmentType}&nbsp;&#183;&nbsp;
          <DateDetail startDate={employment.startDate} endDate={employment.endDate} />
        </dd>
        <dd>
          <span>
            <small>
              {employment.location}&nbsp;&#183;&nbsp;{employment.locationType}
            </small>
          </span>
        </dd>
        <dd>
          {positions.map((position, i) => {
            return (
              <dl key={i}>
                <dt>
                  <h3>{position.title}</h3>
                </dt>
                <dd>
                  {position.startDate && (
                    <DateDetail startDate={position.startDate} endDate={position.endDate} />
                  )}
                </dd>
                <dd>
                  <Tasks tasks={position.tasks} />
                </dd>
                {position.skills ? (
                  <dd>
                    <Skills skills={position.skills} />
                  </dd>
                ) : null}
              </dl>
            )
          })}
        </dd>
      </dl>
    </>
  )
}

type EmploymentProps = {
  employment: Employment
}
const Employment = ({ employment }: EmploymentProps) => {
  const hasMultiplePositions = employment.positions.length > 1

  return (
    <article className={employmentArticle}>
      {hasMultiplePositions ? (
        <MultiplePositions employment={employment as EmploymentWithMultiplePositions} />
      ) : (
        <SinglePosition employment={employment as EmploymentWithSinglePosition} />
      )}
    </article>
  )
}

export const ResumePage = () => {
  return (
    <div className={resumePage}>
      <h1>Resumé</h1>
      <section>
        {employments.map((employment) => (
          <Employment key={employment.employerName} employment={employment} />
        ))}
      </section>
    </div>
  )
}
