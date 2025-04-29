"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import DoctorCard from "@/components/doctor-card"
import FilterSidebar from "@/components/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Pagination } from "@/components/ui/pagination"
import type { Doctor } from "@/lib/types"
import { fetchDoctors } from "@/lib/api"

export default function DoctorListing() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  // Get current filter values from URL
  const currentPage = Number(searchParams.get("page") || "1")
  const specialty = searchParams.get("specialty") || ""
  const gender = searchParams.get("gender") || ""
  const insurance = searchParams.get("insurance") || ""
  const language = searchParams.get("language") || ""
  const availability = searchParams.get("availability") || ""
  const maxDistance = Number(searchParams.get("maxDistance") || "50")

  // Load doctors based on filters
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true)
      try {
        const result = await fetchDoctors({
          page: currentPage,
          limit: 10,
          specialty,
          gender,
          insurance,
          language,
          availability,
          maxDistance,
          search: searchTerm,
        })

        setDoctors(result.doctors)
        setTotalDoctors(result.total)
        setTotalPages(Math.ceil(result.total / 10))
      } catch (error) {
        console.error("Failed to fetch doctors:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDoctors()
  }, [currentPage, specialty, gender, insurance, language, availability, maxDistance, searchTerm])

  // Update URL with filters
  const updateFilters = (filters: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString())

    // Update params with new filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change
    if (!("page" in filters)) {
      params.set("page", "1")
    }

    router.push(`/doctors?${params.toString()}`)
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search: searchTerm, page: 1 })
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          {/* Page Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
              <p className="text-gray-500 mt-1">{loading ? "Loading..." : `${totalDoctors} doctors available`}</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <form onSubmit={handleSearch} className="relative w-full md:w-[300px]">
                <Input
                  type="search"
                  placeholder="Search by name or specialty"
                  className="w-full pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 md:hidden">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <FilterSidebar
                    currentFilters={{
                      specialty,
                      gender,
                      insurance,
                      language,
                      availability,
                      maxDistance,
                    }}
                    updateFilters={updateFilters}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block space-y-6 lg:col-span-1">
              <FilterSidebar
                currentFilters={{
                  specialty,
                  gender,
                  insurance,
                  language,
                  availability,
                  maxDistance,
                }}
                updateFilters={updateFilters}
              />
            </div>

            {/* Doctor Listings */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border p-4 h-64 animate-pulse">
                      <div className="flex items-start">
                        <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                        <div className="ml-4 space-y-2 flex-1">
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                      </div>
                      <div className="mt-6 flex space-x-2">
                        <div className="h-9 bg-gray-200 rounded flex-1"></div>
                        <div className="h-9 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : doctors.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                  <h3 className="text-lg font-medium mb-2">No doctors found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                  <Button
                    onClick={() =>
                      updateFilters({
                        specialty: "",
                        gender: "",
                        insurance: "",
                        language: "",
                        availability: "",
                        maxDistance: 50,
                        search: "",
                      })
                    }
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => updateFilters({ page })}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Medical Center",
            url: "https://medical-center.example.com",
            logo: "https://medical-center.example.com/logo.png",
            description: "Find the right doctor for your needs at Medical Center.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Medical Drive",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
            telephone: "+1-212-555-1000",
            openingHours: "Mo,Tu,We,Th,Fr 08:00-18:00",
            sameAs: [
              "https://www.facebook.com/medicalcenter",
              "https://twitter.com/medicalcenter",
              "https://www.linkedin.com/company/medicalcenter",
            ],
          }),
        }}
      />
    </>
  )
}
