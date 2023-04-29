export type Task =
  | string
  | {
      task: string
      subTasks: string[]
    }

export type Position = {
  title: string
  tasks: Task[]
  skills?: string[]
  startDate?: string
  endDate?: string
}

export type Employment = {
  employerName: string
  employerLinkedinProfile?: string
  employmentType: string
  location: string
  locationType: string
  startDate: string
  endDate?: string
  excerpt?: string
  positions: [Position] | Position[]
}
