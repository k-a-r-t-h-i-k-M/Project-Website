import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-teal-600 mr-8">
            Medical Center
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/doctors" className="text-sm font-medium text-gray-900 hover:text-teal-600">
              Find a Doctor
            </Link>
            <Link href="/locations" className="text-sm font-medium text-gray-500 hover:text-teal-600">
              Locations
            </Link>
            <Link href="/services" className="text-sm font-medium text-gray-500 hover:text-teal-600">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-teal-600">
              About Us
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="outline" className="hidden md:flex">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button className="hidden md:flex">Make an Appointment</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
