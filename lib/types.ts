export interface Doctor {
  _id: string
  name: string
  specialty: string
  location: string
  distance: number
  rating: number
  gender: "Male" | "Female"
  languages: string[]
  availability: string[]
  insurance: string[]
  image: string
  bio?: string
  email?: string
  phone?: string
}

export interface DoctorFilters {
  page?: number
  limit?: number
  specialty?: string
  gender?: string
  insurance?: string
  language?: string
  availability?: string
  maxDistance?: number
  search?: string
}

export interface DoctorListResponse {
  doctors: Doctor[]
  total: number
  page: number
  limit: number
}
