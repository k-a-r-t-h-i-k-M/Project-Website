import type { Doctor, DoctorFilters, DoctorListResponse } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export async function fetchDoctors(filters: DoctorFilters): Promise<DoctorListResponse> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams()

    if (filters.page) queryParams.append("page", filters.page.toString())
    if (filters.limit) queryParams.append("limit", filters.limit.toString())
    if (filters.specialty) queryParams.append("specialty", filters.specialty)
    if (filters.gender) queryParams.append("gender", filters.gender)
    if (filters.insurance) queryParams.append("insurance", filters.insurance)
    if (filters.language) queryParams.append("language", filters.language)
    if (filters.availability) queryParams.append("availability", filters.availability)
    if (filters.maxDistance) queryParams.append("maxDistance", filters.maxDistance.toString())
    if (filters.search) queryParams.append("search", filters.search)

    const response = await fetch(`${API_URL}/doctors?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching doctors:", error)

    // Return mock data for development/demo purposes
    return {
      doctors: mockDoctors,
      total: mockDoctors.length,
      page: filters.page || 1,
      limit: filters.limit || 10,
    }
  }
}

export async function addDoctor(doctorData: Omit<Doctor, "_id">): Promise<Doctor> {
  try {
    const response = await fetch(`${API_URL}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding doctor:", error)
    throw error
  }
}

// Mock data for development/demo purposes
const mockDoctors: Doctor[] = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "Downtown Medical Center",
    distance: 2.4,
    rating: 4.8,
    gender: "Female",
    languages: ["English", "Spanish"],
    availability: ["Monday", "Wednesday", "Friday"],
    insurance: ["BlueCross", "Aetna", "Medicare"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    _id: "2",
    name: "Dr. Michael Chen",
    specialty: "Pediatrics",
    location: "Children's Hospital",
    distance: 3.7,
    rating: 4.9,
    gender: "Male",
    languages: ["English", "Mandarin"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    insurance: ["UnitedHealth", "Cigna", "Medicaid"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    _id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    location: "Skin & Wellness Clinic",
    distance: 1.8,
    rating: 4.7,
    gender: "Female",
    languages: ["English", "Spanish", "Portuguese"],
    availability: ["Monday", "Tuesday", "Thursday"],
    insurance: ["Aetna", "Cigna", "Humana"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    _id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    location: "Sports Medicine Center",
    distance: 4.2,
    rating: 4.6,
    gender: "Male",
    languages: ["English"],
    availability: ["Wednesday", "Friday", "Saturday"],
    insurance: ["BlueCross", "UnitedHealth", "Medicare"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    _id: "5",
    name: "Dr. Aisha Patel",
    specialty: "Neurology",
    location: "Neuroscience Institute",
    distance: 5.1,
    rating: 4.9,
    gender: "Female",
    languages: ["English", "Hindi", "Gujarati"],
    availability: ["Monday", "Thursday", "Friday"],
    insurance: ["Cigna", "Aetna", "Medicare"],
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    _id: "6",
    name: "Dr. Robert Kim",
    specialty: "Family Medicine",
    location: "Community Health Center",
    distance: 1.5,
    rating: 4.7,
    gender: "Male",
    languages: ["English", "Korean"],
    availability: ["Tuesday", "Wednesday", "Saturday"],
    insurance: ["Medicaid", "Medicare", "BlueCross"],
    image: "/placeholder.svg?height=200&width=200",
  },
]
