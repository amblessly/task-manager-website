import { type NextRequest, NextResponse } from "next/server"
import { getMockTasks, createMockTask } from "@/lib/mock-data"

const JAVA_API_URL = process.env.JAVA_API_URL || "http://localhost:8080"
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true"

export async function GET() {
  try {
    if (!USE_MOCK_DATA) {
      const response = await fetch(`${JAVA_API_URL}/api/tasks`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        next: { revalidate: 0 },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Fetched tasks from Java backend")
        return NextResponse.json(data)
      }
    }
  } catch (error) {
    console.log("Java backend unavailable, falling back to mock data")
  }

  const tasks = getMockTasks()
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Creating task with data:", body)

    if (!USE_MOCK_DATA) {
      try {
        const response = await fetch(`${JAVA_API_URL}/api/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (response.ok) {
          const data = await response.json()
          console.log("Created task via Java backend:", data)
          return NextResponse.json(data, { status: 201 })
        }
      } catch (error) {
        console.log("Java backend unavailable for creation, using mock data")
      }
    }

    const newTask = createMockTask(body)
    console.log("Created task via mock data:", newTask)
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/tasks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
