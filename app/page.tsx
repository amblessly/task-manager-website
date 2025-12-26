"use client"

import useSWR, { mutate } from "swr"
import { TaskDashboard } from "@/components/task-dashboard"
import type { Task, TaskRequest, Stats } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { toast } = useToast()
  const { data: tasks = [], error: tasksError } = useSWR<Task[]>("/api/tasks", fetcher, {
    refreshInterval: 5000,
  })
  const { data: stats = { total: 0, completed: 0, pending: 0, highPriority: 0 }, error: statsError } = useSWR<Stats>(
    "/api/stats",
    fetcher,
    {
      refreshInterval: 5000,
    },
  )

  const handleCreateTask = async (task: TaskRequest) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      })

      if (!response.ok) throw new Error("Failed to create task")

      await mutate("/api/tasks")
      await mutate("/api/stats")

      toast({
        title: "Success",
        description: "Task created successfully",
      })
    } catch (error) {
      console.error("[v0] Error creating task:", error)
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      })
    }
  }

  const handleUpdateTask = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      })

      if (!response.ok) throw new Error("Failed to update task")

      await mutate("/api/tasks")
      await mutate("/api/stats")

      toast({
        title: "Success",
        description: "Task updated successfully",
      })
    } catch (error) {
      console.error("[v0] Error updating task:", error)
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete task")

      await mutate("/api/tasks")
      await mutate("/api/stats")

      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (error) {
      console.error("[v0] Error deleting task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <TaskDashboard
        tasks={tasks}
        stats={stats}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <Toaster />
    </>
  )
}
