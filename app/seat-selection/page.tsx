"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { PageContainer } from "@/components/layout/page-container"
import { SeatMap, type Seat } from "@/components/booking/seat-map"
import { BookingSummary } from "@/components/booking/booking-summary"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { buildUrl } from "@/lib/navigation"

const generateSeats = (): Seat[] => {
  const rows = 30
  const columns = ["A", "B", "C", "D", "E", "F"]
  const seats: Seat[] = []
  let seatNumber = 1
  for (let row = 1; row <= rows; row++) {
    for (let col = 0; col < columns.length; col++) {
      const isAvailable = Math.random() > 0.3
      let type: "standard" | "premium" | "exit" = "standard"
      if (row <= 5) type = "premium"
      if (row >= 15 && row <= 17) type = "exit"
      let price = 0
      if (type === "premium") price = 45
      else if (type === "exit") price = 30
      else if (row <= 10) price = 25
      else if (row <= 20) price = 15
      seats.push({
        id: seatNumber,
        row,
        column: columns[col],
        type,
        price,
        isAvailable,
        isSelected: false,
      })
      seatNumber++
    }
  }
  return seats
}

// Helper to display location as "City (CODE)"
function getLocationDisplay(loc: any) {
  return loc && typeof loc === "object"
    ? `${loc.city || ""} (${loc.code || ""})`
    : loc || ""
}

// Helper to render selected seats
function renderSelectedSeats(selectedSeats: number[], seatMap: Seat[], passengers: number) {
  const seatBadges = selectedSeats.map((seatId) => {
    const seat = seatMap.find((s) => s.id === seatId)
    return (
      <div key={seatId} className="rounded-full bg-primary/10 px-3 py-1 text-sm">
        {seatId} {seat?.price ? `(+$${seat.price})` : ""}
      </div>
    )
  })
  const emptyBadges = Array.from({ length: Math.max(0, passengers - selectedSeats.length) }).map((_, i) => (
    <div key={`empty-${i}`} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
      Not selected
    </div>
  ))
  return [...seatBadges, ...emptyBadges]
}

function SeatSelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { bookingStore, flightStore } = useStore()
  const { toast } = useToast()

  const flightId = searchParams.get("flightId") || ""
  const departureDate = searchParams.get("date") || format(new Date(), "yyyy-MM-dd")
  const passengersParam = searchParams.get("passengers") || "1"
  const passengers = Number.parseInt(passengersParam, 10)

  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [seatMap, setSeatMap] = useState<Seat[]>([])

  useEffect(() => {
    if (flightId && !flightStore.selectedFlight) {
      flightStore.getFlightById(flightId)
    }
    setSeatMap(generateSeats())
   
  }, [flightId])

  const handleSeatSelect = (seatId: number) => {
    const seat = seatMap.find((s) => s.id === seatId)
    if (!seat) return

    if (seat.isSelected) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId))
      setSeatMap((prevSeats) =>
        prevSeats.map((s) => (s.id === seatId ? { ...s, isSelected: false } : s)),
      )
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats((prev) => [...prev, seatId])
      setSeatMap((prevSeats) =>
        prevSeats.map((s) => (s.id === seatId ? { ...s, isSelected: true } : s)),
      )
    }
  }

  const calculateTotalPrice = () => {
    if (!flightStore.selectedFlight) return 0
    const basePrice = flightStore.selectedFlight.price * passengers
    const seatPrices = selectedSeats.reduce((total, seatId) => {
      const seat = seatMap.find((s) => s.id === seatId)
      return total + (seat?.price || 0)
    }, 0)
    return basePrice + seatPrices
  }

  const handleContinue = () => {
    if (selectedSeats.length !== passengers) {
      toast({
        title: "Seat Selection Required",
        description: `Please select ${passengers} seats to continue.`,
        variant: "destructive",
      })
      return
    }
    selectedSeats.forEach((seatId, index) => {
      const passengerId = bookingStore.passengerDetails[index]?.firstName || `passenger-${index}`
      bookingStore.setSeat(passengerId, seatId.toString())
    })
    router.push(
      buildUrl("/payment", {
        flightId,
        date: departureDate,
        passengers: passengers.toString(),
        seats: selectedSeats.join(","),
      }),
    )
  }

  if (flightStore.isLoadingFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-lg font-medium">Loading seat map...</p>
        </div>
      </PageContainer>
    )
  }

  if (!flightStore.selectedFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Flight not found</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </PageContainer>
    )
  }

  const flight = flightStore.selectedFlight

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Select Your Seats</h1>
        <p className="text-muted-foreground">
          {getLocationDisplay(flight.from)} to {getLocationDisplay(flight.to)} on{" "}
          {departureDate ? format(new Date(departureDate), "EEE, MMM d, yyyy") : ""}
        </p>
        <p className="text-muted-foreground">
          Choose seats for {passengers} {passengers === 1 ? "passenger" : "passengers"}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SeatMap seats={seatMap} maxSeats={passengers} onSeatSelect={handleSeatSelect} />

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={handleContinue}>Continue to Payment</Button>
          </div>

          <div className="mt-8">
            <h3 className="mb-2 font-medium">
              Selected Seats: {selectedSeats.length}/{passengers}
            </h3>
            <div className="flex flex-wrap gap-2">
              {renderSelectedSeats(selectedSeats, seatMap, passengers)}
            </div>
          </div>
        </div>

        <div>
          <BookingSummary
            flight={flight}
            departureDate={departureDate}
            passengers={passengers}
            seats={selectedSeats.map(String)}
            price={calculateTotalPrice()}
          />

          <div className="mt-4 rounded-lg border bg-muted/30 p-4">
            <h4 className="mb-2 font-medium">Seat Selection Tips</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Premium and exit row seats may have extra charges.</li>
              <li>Selected seats are reserved for you until payment.</li>
              <li>To change a seat, click on it again to deselect.</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default observer(SeatSelectionPage)
