import { type NextRequest, NextResponse } from "next/server"
import { getMockTasks, updateMockTask, deleteMockTask } from "@/lib/mock-data"

const JAVA_API_URL = process.env.JAVA_API_URL || "http://localhost:8080"
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!USE_MOCK_DATA) {
      try {
        const response = await fetch(`${JAVA_API_URL}/api/tasks/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          const data = await response.json()
          console.log("Fetched task from Java backend:", data)
          return NextResponse.json(data)
        }
      } catch (error) {
        console.log(`Java backend unavailable, using mock data for task ${id}`)
      }
    }

    const tasks = getMockTasks()
    const task = tasks.find((t) => t.id === Number.parseInt(id))

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = Number.parseInt(id)
    const body = await request.json()
    console.log("Updating task:", taskId, body)

    if (!USE_MOCK_DATA) {
      try {
        const response = await fetch(`${JAVA_API_URL}/api/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (response.ok) {
          const data = await response.json()
          console.log("Updated task via Java backend:", data)
          return NextResponse.json(data)
        }
      } catch (error) {
        console.log(`Java backend unavailable for update, using mock data for task ${id}`)
      }
    }

    const updatedTask = updateMockTask(taskId, body)
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    console.log("Updated task via mock data:", updatedTask)
    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = Number.parseInt(id)
    console.log("Deleting task:", taskId)

    if (!USE_MOCK_DATA) {
      try {
        const response = await fetch(`${JAVA_API_URL}/api/tasks/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          console.log("Deleted task via Java backend:", taskId)
          return NextResponse.json({ success: true }, { status: 200 })
        }
      } catch (error) {
        console.log(`Java backend unavailable for delete, using mock data for task ${id}`)
      }
    }

    const deleted = deleteMockTask(taskId)
    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    console.log("Deleted task via mock data:", taskId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
