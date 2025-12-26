"use client"

import { TaskCard } from "./task-card"
import { StatsCard } from "./stats-card"
import { CreateTaskDialog } from "./create-task-dialog"
import type { Task, TaskRequest, Stats } from "@/lib/types"
import { CheckCircle2, Clock, ListTodo, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TaskDashboardProps {
  tasks: Task[]
  stats: Stats
  onCreateTask: (task: TaskRequest) => Promise<void>
  onUpdateTask: (task: Task) => Promise<void>
  onDeleteTask: (id: number) => Promise<void>
}

export function TaskDashboard({ tasks, stats, onCreateTask, onUpdateTask, onDeleteTask }: TaskDashboardProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  const safeTasks = Array.isArray(tasks) ? tasks : []

  const handleToggle = async (id: number, completed: boolean) => {
    const task = safeTasks.find((t) => t.id === id)
    if (task) {
      await onUpdateTask({ ...task, completed })
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
  }

  const handleEditSubmit = async (task: Task) => {
    await onUpdateTask(task)
    setEditingTask(null)
  }

  const filteredTasks = safeTasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Task Manager</h1>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </div>
          <CreateTaskDialog onSubmit={onCreateTask} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total Tasks" value={stats.total} icon={ListTodo} description="All tasks in your list" />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            description="Tasks you've finished"
          />
          <StatsCard title="Pending" value={stats.pending} icon={Clock} description="Tasks still in progress" />
          <StatsCard
            title="High Priority"
            value={stats.highPriority}
            icon={AlertCircle}
            description="Urgent tasks to focus on"
          />
        </div>

        {/* Tasks List with Filters */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-0">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tasks found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={onDeleteTask}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Dialog */}
        {editingTask && (
          <CreateTaskDialog onSubmit={handleEditSubmit} editTask={editingTask} onClose={() => setEditingTask(null)} />
        )}
      </div>
    </div>
  )
}
