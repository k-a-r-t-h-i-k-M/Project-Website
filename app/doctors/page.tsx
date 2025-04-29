import { Suspense } from "react"
import type { Metadata } from "next"
import DoctorListing from "@/components/doctor-listing"

export const metadata: Metadata = {
  title: "Find a Doctor | Medical Center",
  description: "Find the right doctor for your needs. Search by specialty, insurance, location and more.",
  openGraph: {
    title: "Find a Doctor | Medical Center",
    description: "Find the right doctor for your needs. Search by specialty, insurance, location and more.",
    url: "https://medical-center.example.com/doctors",
    siteName: "Medical Center",
    images: [
      {
        url: "https://medical-center.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Medical Center Doctors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find a Doctor | Medical Center",
    description: "Find the right doctor for your needs. Search by specialty, insurance, location and more.",
    images: ["https://medical-center.example.com/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://medical-center.example.com/doctors",
  },
}

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<DoctorListingFallback />}>
        <DoctorListing />
      </Suspense>
    </main>
  )
}

function DoctorListingFallback() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <div className="h-10 w-full md:w-[300px] bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse md:hidden"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block h-[600px] bg-gray-200 rounded animate-pulse"></div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
