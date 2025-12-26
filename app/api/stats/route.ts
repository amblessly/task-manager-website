import { NextResponse } from "next/server"
import { getMockStats } from "@/lib/mock-data"

const JAVA_API_URL = process.env.JAVA_API_URL || "http://localhost:8080"
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true"

export async function GET() {
  try {
    if (!USE_MOCK_DATA) {
      const response = await fetch(`${JAVA_API_URL}/api/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Fetched stats from Java backend:", data)
        return NextResponse.json(data)
      }
    }
  } catch (error) {
    console.log("Java backend unavailable for stats, using mock data")
  }

  const stats = getMockStats()
  return NextResponse.json(stats)
}
