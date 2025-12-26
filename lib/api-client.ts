const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || "http://localhost:8080/api"

export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const url = `${JAVA_BACKEND_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Backend returned status ${response.status}`)
    }

    // Return null for 204 No Content
    if (response.status === 204) return null

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from backend (${endpoint}):`, error)
    throw error
  }
}
