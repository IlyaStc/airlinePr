"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/page-container"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { CheckCircle, Calendar, Download, Printer, Share2, Plane, MapPin, Clock } from "lucide-react"
import { calculateDuration, formatDateTime } from "@/lib/utils"

function BookingConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { bookingStore } = useStore()
  const { toast } = useToast()

  const bookingId = searchParams.get("bookingId") || ""

  useEffect(() => {
    if (bookingId && !bookingStore.currentBooking) {
      if (!bookingStore.currentBooking) {
        toast({
          title: "Booking Not Found",
          description: "Could not find the booking details.",
          variant: "destructive",
        })
      }
    }
  }, [bookingId, bookingStore, toast])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "EEE, MMM d, yyyy")
  }

  if (bookingStore.isLoading) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-lg font-medium">Loading booking details...</p>
        </div>
      </PageContainer>
    )
  }

  if (!bookingStore.currentBooking) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Booking not found</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </PageContainer>
    )
  }

  const booking = bookingStore.currentBooking

  return (
    <PageContainer>
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Your booking has been confirmed. Booking reference: <span className="font-medium">{booking.id}</span>
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download E-Ticket
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Printer className="h-4 w-4" />
          Print Ticket
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Add to Calendar
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Itinerary
        </Button>
      </div>

      <Card className="mb-8 overflow-hidden">
        <div className="bg-primary/10 p-4">
          <h2 className="text-xl font-bold">Flight Details</h2>
        </div>
        <CardContent className="p-0">
          <div className="border-b p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-primary" />
                <span className="font-medium">{booking.flight?.airline || "SkyWings"}</span>
                <span className="text-sm text-muted-foreground">{booking.flight?.flightNumber || "SK123"}</span>
              </div>
              <div className="text-sm font-medium">{formatDateTime(booking.flight?.departureTime.toString() || new Date().toString())}</div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="space-y-1 md:col-span-1">
                <p className="text-2xl font-bold">{formatDateTime (booking.flight?.departureTime.toString()) || "08:30"}</p>
                <p className="font-medium">{booking.flight?.from || "New York (JFK)"}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Terminal 2</span>
                </div>
              </div>

              <div className="flex items-center md:col-span-2">
                <div className="relative w-full">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-muted"></div>
                  <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"></div>
                  <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{calculateDuration(booking.flight?.departureTime, booking.flight?.arrivalTime) || "7h 15m"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-right md:col-span-1">
                <p className="text-2xl font-bold">{booking.flight?.arrivalTime || "20:45"}</p>
                <p className="font-medium">{booking.flight?.to || "London (LHR)"}</p>
                <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Terminal 1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="mb-4 font-medium">Passenger Information</h3>
            <div className="space-y-4">
              {bookingStore.passengerDetails.map((passenger, index) => (
                <div key={index} className="rounded-lg bg-muted/30 p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Passenger Name</p>
                      <p className="font-medium">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seat</p>
                      <p className="font-medium">
                        {Object.values(bookingStore.selectedSeats)[index] || "Not assigned"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Type</p>
                      <p className="font-medium">Economy</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 rounded-lg border bg-muted/30 p-6">
        <h3 className="mb-4 font-medium">Important Information</h3>
        <ul className="space-y-2 text-sm">
          <li>Please arrive at the airport at least 2 hours before your scheduled departure time.</li>
          <li>Don't forget to bring a validIdor passport for all passengers.</li>
          <li>Check-in opens 24 hours before departure and closes 1 hour before departure.</li>
          <li>Each passenger is allowed one carry-on bag and one personal item.</li>
          <li>For any changes to your booking, please contact our customer service.</li>
        </ul>
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </PageContainer>
  )
}

export default observer(BookingConfirmationPage)
