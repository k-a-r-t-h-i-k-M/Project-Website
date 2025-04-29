"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Filter, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

type Doctor = {
  id: number
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
}

const doctors: Doctor[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

const specialties = [
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Neurology",
  "Family Medicine",
  "Psychiatry",
  "Obstetrics & Gynecology",
  "Ophthalmology",
  "Oncology",
]

const insuranceProviders = ["BlueCross", "Aetna", "Medicare", "Medicaid", "UnitedHealth", "Cigna", "Humana", "Kaiser"]

const languages = [
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Portuguese",
  "Korean",
  "Gujarati",
  "French",
  "Arabic",
  "Russian",
]

export function Doctors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined)
  const [maxDistance, setMaxDistance] = useState(10)
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  const filteredDoctors = doctors.filter((doctor) => {
    // Search term filter
    if (
      searchTerm &&
      !doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Specialty filter
    if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(doctor.specialty)) {
      return false
    }

    // Insurance filter
    if (selectedInsurance.length > 0 && !doctor.insurance.some((ins) => selectedInsurance.includes(ins))) {
      return false
    }

    // Language filter
    if (selectedLanguages.length > 0 && !doctor.languages.some((lang) => selectedLanguages.includes(lang))) {
      return false
    }

    // Gender filter
    if (selectedGender && doctor.gender !== selectedGender) {
      return false
    }

    // Distance filter
    if (doctor.distance > maxDistance) {
      return false
    }

    // Availability filter
    if (selectedAvailability.length > 0 && !doctor.availability.some((day) => selectedAvailability.includes(day))) {
      return false
    }

    return true
  })

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const toggleInsurance = (insurance: string) => {
    setSelectedInsurance((prev) =>
      prev.includes(insurance) ? prev.filter((i) => i !== insurance) : [...prev, insurance],
    )
  }

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  const toggleAvailability = (day: string) => {
    setSelectedAvailability((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedSpecialties([])
    setSelectedInsurance([])
    setSelectedLanguages([])
    setSelectedGender(undefined)
    setMaxDistance(10)
    setSelectedAvailability([])
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
            <p className="text-gray-500 mt-1">{filteredDoctors.length} doctors available</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-[300px]">
              <Input
                type="search"
                placeholder="Search by name or specialty"
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 md:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear all
                    </Button>
                  </div>
                  <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                    <div className="space-y-6 pt-4">
                      <div>
                        <h3 className="font-medium mb-2">Specialty</h3>
                        <div className="space-y-2">
                          {specialties.map((specialty) => (
                            <Label key={specialty} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary rounded"
                                checked={selectedSpecialties.includes(specialty)}
                                onChange={() => toggleSpecialty(specialty)}
                              />
                              {specialty}
                            </Label>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Insurance</h3>
                        <div className="space-y-2">
                          {insuranceProviders.map((insurance) => (
                            <Label key={insurance} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary rounded"
                                checked={selectedInsurance.includes(insurance)}
                                onChange={() => toggleInsurance(insurance)}
                              />
                              {insurance}
                            </Label>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Languages</h3>
                        <div className="space-y-2">
                          {languages.slice(0, 6).map((language) => (
                            <Label key={language} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary rounded"
                                checked={selectedLanguages.includes(language)}
                                onChange={() => toggleLanguage(language)}
                              />
                              {language}
                            </Label>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Gender</h3>
                        <RadioGroup
                          value={selectedGender}
                          onValueChange={(value) => setSelectedGender(value as "Male" | "Female")}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Distance (miles)</h3>
                        <div className="space-y-4">
                          <Slider
                            value={[maxDistance]}
                            min={1}
                            max={20}
                            step={1}
                            onValueChange={(value) => setMaxDistance(value[0])}
                          />
                          <div className="flex justify-between">
                            <span>1 mile</span>
                            <span>{maxDistance} miles</span>
                            <span>20 miles</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Availability</h3>
                        <div className="space-y-2">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                            <Label key={day} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary rounded"
                                checked={selectedAvailability.includes(day)}
                                onChange={() => toggleAvailability(day)}
                              />
                              {day}
                            </Label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block space-y-6 lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Specialty</h3>
                  <div className="space-y-2">
                    {specialties.slice(0, 6).map((specialty) => (
                      <Label key={specialty} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary rounded"
                          checked={selectedSpecialties.includes(specialty)}
                          onChange={() => toggleSpecialty(specialty)}
                        />
                        {specialty}
                      </Label>
                    ))}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                        See more
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {specialties.slice(6).map((specialty) => (
                        <DropdownMenuCheckboxItem
                          key={specialty}
                          checked={selectedSpecialties.includes(specialty)}
                          onCheckedChange={() => toggleSpecialty(specialty)}
                        >
                          {specialty}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Insurance</h3>
                  <div className="space-y-2">
                    {insuranceProviders.slice(0, 4).map((insurance) => (
                      <Label key={insurance} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary rounded"
                          checked={selectedInsurance.includes(insurance)}
                          onChange={() => toggleInsurance(insurance)}
                        />
                        {insurance}
                      </Label>
                    ))}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                        See more
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {insuranceProviders.slice(4).map((insurance) => (
                        <DropdownMenuCheckboxItem
                          key={insurance}
                          checked={selectedInsurance.includes(insurance)}
                          onCheckedChange={() => toggleInsurance(insurance)}
                        >
                          {insurance}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Languages</h3>
                  <div className="space-y-2">
                    {languages.slice(0, 4).map((language) => (
                      <Label key={language} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary rounded"
                          checked={selectedLanguages.includes(language)}
                          onChange={() => toggleLanguage(language)}
                        />
                        {language}
                      </Label>
                    ))}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                        See more
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {languages.slice(4).map((language) => (
                        <DropdownMenuCheckboxItem
                          key={language}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={() => toggleLanguage(language)}
                        >
                          {language}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Gender</h3>
                  <RadioGroup
                    value={selectedGender}
                    onValueChange={(value) => setSelectedGender(value as "Male" | "Female")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="r-male" />
                      <Label htmlFor="r-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="r-female" />
                      <Label htmlFor="r-female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Distance (miles)</h3>
                  <div className="space-y-4">
                    <Slider
                      value={[maxDistance]}
                      min={1}
                      max={20}
                      step={1}
                      onValueChange={(value) => setMaxDistance(value[0])}
                    />
                    <div className="flex justify-between text-sm">
                      <span>1</span>
                      <span>{maxDistance}</span>
                      <span>20</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="space-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                      <Label key={day} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary rounded"
                          checked={selectedAvailability.includes(day)}
                          onChange={() => toggleAvailability(day)}
                        />
                        {day}
                      </Label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Listings */}
          <div className="lg:col-span-3">
            {filteredDoctors.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                <h3 className="text-lg font-medium mb-2">No doctors found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={clearAllFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="flex p-4">
                        <div className="relative h-24 w-24 rounded-full overflow-hidden mr-4 flex-shrink-0">
                          <Image
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{doctor.name}</h3>
                          <p className="text-gray-500">{doctor.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm">{doctor.location}</p>
                            <p className="text-sm text-gray-500">{doctor.distance} miles away</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-sm">Available: {doctor.availability.join(", ")}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doctor.insurance.slice(0, 2).map((ins) => (
                            <span
                              key={ins}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700"
                            >
                              {ins}
                            </span>
                          ))}
                          {doctor.insurance.length > 2 && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700 cursor-pointer">
                                  +{doctor.insurance.length - 2} more
                                </span>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Insurance</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {doctor.insurance.slice(2).map((ins) => (
                                  <DropdownMenuCheckboxItem key={ins} checked={false} disabled>
                                    {ins}
                                  </DropdownMenuCheckboxItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full mr-2">
                        <Clock className="h-4 w-4 mr-2" />
                        View Schedule
                      </Button>
                      <Button size="sm" className="w-full">
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
