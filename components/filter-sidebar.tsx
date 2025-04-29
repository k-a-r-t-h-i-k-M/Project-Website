"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Filter options
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

const availabilityOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

interface FilterSidebarProps {
  currentFilters: {
    specialty: string
    gender: string
    insurance: string
    language: string
    availability: string
    maxDistance: number
  }
  updateFilters: (filters: Record<string, string | number>) => void
}

export default function FilterSidebar({ currentFilters, updateFilters }: FilterSidebarProps) {
  // Local state for filters
  const [specialty, setSpecialty] = useState(currentFilters.specialty)
  const [gender, setGender] = useState(currentFilters.gender)
  const [insurance, setInsurance] = useState(currentFilters.insurance)
  const [language, setLanguage] = useState(currentFilters.language)
  const [availability, setAvailability] = useState(currentFilters.availability)
  const [maxDistance, setMaxDistance] = useState(currentFilters.maxDistance)

  // Apply filters
  const applyFilters = () => {
    updateFilters({
      specialty,
      gender,
      insurance,
      language,
      availability,
      maxDistance,
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSpecialty("")
    setGender("")
    setInsurance("")
    setLanguage("")
    setAvailability("")
    setMaxDistance(50)

    updateFilters({
      specialty: "",
      gender: "",
      insurance: "",
      language: "",
      availability: "",
      maxDistance: 50,
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear all
        </Button>
      </div>

      <div className="space-y-6">
        {/* Specialty Filter */}
        <div>
          <h3 className="font-medium mb-2">Specialty</h3>
          <div className="space-y-2">
            {specialties.slice(0, 6).map((s) => (
              <Label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-teal-600 rounded"
                  checked={specialty === s}
                  onChange={() => setSpecialty(specialty === s ? "" : s)}
                />
                {s}
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
              {specialties.slice(6).map((s) => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={specialty === s}
                  onCheckedChange={() => setSpecialty(specialty === s ? "" : s)}
                >
                  {s}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        {/* Insurance Filter */}
        <div>
          <h3 className="font-medium mb-2">Insurance</h3>
          <div className="space-y-2">
            {insuranceProviders.slice(0, 4).map((ins) => (
              <Label key={ins} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-teal-600 rounded"
                  checked={insurance === ins}
                  onChange={() => setInsurance(insurance === ins ? "" : ins)}
                />
                {ins}
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
              {insuranceProviders.slice(4).map((ins) => (
                <DropdownMenuCheckboxItem
                  key={ins}
                  checked={insurance === ins}
                  onCheckedChange={() => setInsurance(insurance === ins ? "" : ins)}
                >
                  {ins}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        {/* Languages Filter */}
        <div>
          <h3 className="font-medium mb-2">Languages</h3>
          <div className="space-y-2">
            {languages.slice(0, 4).map((lang) => (
              <Label key={lang} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-teal-600 rounded"
                  checked={language === lang}
                  onChange={() => setLanguage(language === lang ? "" : lang)}
                />
                {lang}
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
              {languages.slice(4).map((lang) => (
                <DropdownMenuCheckboxItem
                  key={lang}
                  checked={language === lang}
                  onCheckedChange={() => setLanguage(language === lang ? "" : lang)}
                >
                  {lang}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        {/* Gender Filter */}
        <div>
          <h3 className="font-medium mb-2">Gender</h3>
          <RadioGroup value={gender} onValueChange={setGender}>
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

        {/* Distance Filter */}
        <div>
          <h3 className="font-medium mb-2">Distance (miles)</h3>
          <div className="space-y-4">
            <Slider
              value={[maxDistance]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setMaxDistance(value[0])}
            />
            <div className="flex justify-between text-sm">
              <span>1</span>
              <span>{maxDistance}</span>
              <span>50</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Availability Filter */}
        <div>
          <h3 className="font-medium mb-2">Availability</h3>
          <div className="space-y-2">
            {availabilityOptions.map((day) => (
              <Label key={day} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-teal-600 rounded"
                  checked={availability === day}
                  onChange={() => setAvailability(availability === day ? "" : day)}
                />
                {day}
              </Label>
            ))}
          </div>
        </div>

        <Button className="w-full mt-4" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
