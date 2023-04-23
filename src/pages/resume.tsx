import employments from "@/page-components/resume/data.json"
import { Employment, Position, Task } from "@/page-components/resume/types"

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
  const skillsText = skills?.join(" &#183; ")
  return (
    <span>
      <strong>Skills</strong>: {skillsText}
    </span>
  )
}

type SinglePositionProps = {
  employment: EmploymentWithSinglePosition
}
const SinglePosition = ({ employment }: SinglePositionProps) => {
  const { title, tasks, skills } = employment.positions[0]

  return (
    <article>
      <dl>
        <dt>{title}</dt>
        <dd>
          {employment.employerName} &#183; {employment.employmentType}
        </dd>
        <dd>
          {employment.startDate} - {employment.endDate}
        </dd>
        <dd>
          {employment.location} &#183; {employment.locationType}
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
    </article>
  )
}

type MultiplePositionsProps = {
  employment: EmploymentWithMultiplePositions
}
const MultiplePositions = ({ employment }: MultiplePositionsProps) => {
  const { positions } = employment
  return (
    <article>
      <dl>
        <dt>{employment.employerName}</dt>
        <dd>
          {employment.employmentType} &#183; {employment.startDate} -
          {employment.endDate ?? "Present"}
        </dd>
        <dd>
          {employment.location} &#183; {employment.locationType}
        </dd>
        <dd>
          {positions.map((position, i) => {
            return (
              <dl key={i}>
                <dt>{position.title}</dt>
                <dd>
                  {position.startDate} - {position.endDate ?? "Present"}
                </dd>
                <dd>
                  <Tasks tasks={position.tasks} />
                </dd>
              </dl>
            )
          })}
        </dd>
      </dl>
    </article>
  )
}

type EmploymentProps = {
  employment: Employment
}
const Employment = ({ employment }: EmploymentProps) => {
  const hasMultiplePositions = employment.positions.length > 1

  return hasMultiplePositions ? (
    <MultiplePositions employment={employment as EmploymentWithMultiplePositions} />
  ) : (
    <SinglePosition employment={employment as EmploymentWithSinglePosition} />
  )
}

const Resume = () => {
  return (
    <>
      <h1>Resumé</h1>
      <section>
        {employments.map((employment) => (
          <Employment key={employment.employerName} employment={employment} />
        ))}
      </section>
    </>
  )
}

export default Resume
