import data from "@/page-components/resume/data.json"

const Resume = () => {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export default Resume
