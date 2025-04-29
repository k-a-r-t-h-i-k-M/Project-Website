import Image from "next/image"
import { Calendar, Clock, MapPin, Star } from "lucide-react"
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
import type { Doctor } from "@/lib/types"

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="flex p-4">
          <div className="relative h-24 w-24 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <Image
              src={doctor.image || "/placeholder.svg?height=200&width=200"}
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
  )
}
