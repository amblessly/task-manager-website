export interface Task {
  id: number
  title: string
  description: string
  priority: "low" | "medium" | "high"
  completed: boolean
  createdAt: string
}

export interface TaskRequest {
  title: string
  description: string
  priority: "low" | "medium" | "high"
}

export interface Stats {
  total: number
  completed: number
  pending: number
  highPriority: number
}
