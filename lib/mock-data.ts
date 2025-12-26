import type { Task, TaskRequest, Stats } from './types'

// In-memory storage for mock tasks
let mockTasks: Task[] = [
  {
    id: 1,
    title: "Setup development environment",
    description: "Install Node.js, Java, and configure IDE",
    priority: "high",
    completed: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 2,
    title: "Design database schema",
    description: "Create ERD and define relationships for task management system",
    priority: "high",
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: "Implement REST API endpoints",
    description: "Build CRUD operations for tasks using Spring Boot",
    priority: "medium",
    completed: false,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 4,
    title: "Write unit tests",
    description: "Create comprehensive test coverage for backend services",
    priority: "medium",
    completed: false,
    createdAt: new Date().toISOString()
  }
]

let nextId = 5

export function getMockTasks(): Task[] {
  console.log('Getting mock tasks, count:', mockTasks.length)
  return mockTasks
}

export function createMockTask(taskRequest: TaskRequest): Task {
  const newTask: Task = {
    id: nextId++,
    title: taskRequest.title,
    description: taskRequest.description,
    priority: taskRequest.priority,
    completed: false,
    createdAt: new Date().toISOString()
  }
  
  mockTasks.push(newTask)
  console.log('Created mock task with ID:', newTask.id)
  return newTask
}

export function updateMockTask(id: number, updates: Partial<Task>): Task | null {
  const taskIndex = mockTasks.findIndex(t => t.id === id)
  
  if (taskIndex === -1) {
    console.log('Task not found for update, ID:', id)
    return null
  }
  
  mockTasks[taskIndex] = {
    ...mockTasks[taskIndex],
    ...updates,
    id: mockTasks[taskIndex].id, // Preserve original ID
    createdAt: mockTasks[taskIndex].createdAt // Preserve creation date
  }
  
  console.log('Updated mock task ID:', id)
  return mockTasks[taskIndex]
}

export function deleteMockTask(id: number): boolean {
  const taskIndex = mockTasks.findIndex(t => t.id === id)
  
  if (taskIndex === -1) {
    console.log('Task not found for deletion, ID:', id)
    return false
  }
  
  mockTasks.splice(taskIndex, 1)
  console.log('Deleted mock task ID:', id)
  return true
}

export function getMockStats(): Stats {
  const total = mockTasks.length
  const completed = mockTasks.filter(t => t.completed).length
  const pending = total - completed
  const highPriority = mockTasks.filter(t => t.priority === 'high').length
  
  console.log('Calculated mock stats:', { total, completed, pending, highPriority })
  
  return {
    total,
    completed,
    pending,
    highPriority
  }
}
