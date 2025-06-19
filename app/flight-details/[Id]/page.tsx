"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageContainer } from "@/components/layout/page-container"
import { BookingSummary } from "@/components/booking/booking-summary"
import { BookingBreadcrumbs } from "@/components/booking/booking-breadcrumbs"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { buildUrl, ROUTES } from "@/lib/navigation"
import { format } from "date-fns"
import { Plane, Clock, Calendar, MapPin, Wifi, Utensils, Monitor, Zap } from "lucide-react"
import { calculateDuration, formatTime } from "@/lib/utils"

function FlightDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { flightStore } = useStore()
  const { toast } = useToast()

  const flightId = params.id || params.Id
  const departureDate = searchParams.get("date") || ""
  const passengersParam = searchParams.get("passengers") || "1"
  const passengers = Number.parseInt(passengersParam, 10)
  const [selectedFare, setSelectedFare] = useState("Economy Standard")

  useEffect(() => {
    if (flightId) {
      flightStore.getFlightById(flightId).then((flight) => {
        if (!flight && flightStore.flightError) {
          toast({
            title: "Error",
            description: flightStore.flightError,
            variant: "destructive",
          })
        }
      })
    }
  }, [flightId, flightStore, toast])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "EEE, MMM d, yyyy")
  }

  const handleContinue = () => {
    router.push(
      buildUrl(ROUTES.PASSENGER_DETAILS, {
        flightId,
        date: departureDate,
        passengers: passengers.toString(),
        fare: selectedFare,
      }),
    )
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "meal":
        return <Utensils className="h-4 w-4" />
      case "entertainment":
        return <Monitor className="h-4 w-4" />
      case "power":
        return <Zap className="h-4 w-4" />
      default:
        return null
    }
  }

  if (flightStore.isLoadingFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-lg font-medium">Loading flight details...</p>
        </div>
      </PageContainer>
    )
  }

  if (!flightStore.selectedFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Flight not found</p>
          <Button className="mt-4" onClick={() => router.push(ROUTES.BOOK)}>
            Return to Search
          </Button>
        </div>
      </PageContainer>
    )
  }

  const flight = flightStore.selectedFlight

  return (
    <PageContainer>
      <BookingBreadcrumbs
        currentStep="details"
        flightId={flightId}
        departureDate={departureDate}
        passengers={passengers}
        fare={selectedFare}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Flight Details</h1>
        <p className="text-muted-foreground">
          {flight.from.city} ({flight.from.code}) to {flight.to.city} ({flight.to.code}) on {formatDate(departureDate)}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-8 overflow-hidden">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  <span className="font-medium">{flight.airline}</span>
                  <span className="text-sm text-muted-foreground">{flight.flightNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                  </span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="space-y-1 md:col-span-1">
                  <p className="text-2xl font-bold">
                    {formatTime(flight.departureTime.toString())}
                    </p>
                  <p className="font-medium">{flight.from.city} ({flight.from.code})</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(departureDate)}</span>
                  </div>
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
                  </div>
                </div>
                <div className="space-y-1 text-right md:col-span-1">
                  <p className="text-2xl font-bold">{formatTime(flight.arrivalTime.toString())}</p>
                  <p className="font-medium">{flight.to.city} ({flight.to.code})</p>
                  <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {flight.arrivalTime < flight.departureTime
                        ? formatDate(new Date(new Date(departureDate).getTime() + 24 * 60 * 60 * 1000).toISOString())
                        : formatDate(departureDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Terminal 1</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="details">Flight Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="baggage">Baggage</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>
                      <h4 className="font-medium">Flight Duration</h4>
                      <p className="text-sm text-muted-foreground">{calculateDuration(flight.departureTime, flight.arrivalTime)}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {flight.amenities?.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity.replace("_", " ")}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="baggage" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Carry-on bag</span>
                      <span className="text-green-600">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Checked bag (1st)</span>
                      <span className="text-muted-foreground">$30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Checked bag (2nd)</span>
                      <span className="text-muted-foreground">$50</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => router.push(ROUTES.SEARCH_RESULTS)}>
              Back to Results
            </Button>
            <Button onClick={handleContinue}>Continue to Passenger Details</Button>
          </div>
        </div>

        <div>
          <BookingSummary
            flight={flight}
            departureDate={departureDate}
            passengers={passengers}
            price={flight.price * passengers}
            fare={selectedFare}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default observer(FlightDetailsPage)
