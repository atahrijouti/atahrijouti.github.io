export type Task =
  | string
  | {
      task: string
      subTasks: string[]
    }

export type Position = {
  title: string
  tasks?: Task[]
  skills?: string[]
  startDate?: string
  endDate?: string
}

export type EmploymentData = {
  employerName: string
  employerUrl?: string
  employmentType: string
  location: string
  locationType: string
  startDate: string
  endDate?: string
  excerpt?: string
  positions: [Position] | Position[]
}
