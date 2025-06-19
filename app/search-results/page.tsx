"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Header } from "@/components/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { addDays, subDays, format } from "date-fns"
import { useRouter } from "next/navigation"
import { FlightCard } from "@/components/flights/flight-card"
import { ResponsiveContainer } from "@/components/layout/responsive-container"
import { Spinner } from "@/components/ui/spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { useToast } from "@/hooks/use-toast"

interface FlightFilters {
  priceRange: [number, number]
  nonstop: boolean
  morning: boolean
  afternoon: boolean
  evening: boolean
  wifi: boolean
  meal: boolean
}

const DEFAULT_FILTERS: FlightFilters = {
  priceRange: [400, 600],
  nonstop: false,
  morning: false,
  afternoon: false,
  evening: false,
  wifi: false,
  meal: false,
}

function SearchResultsPage() {
  const searchParams = useSearchParams()
  const { flightStore } = useStore()
  const { toast } = useToast()
  const router = useRouter()

  const [filters, setFilters] = useState<FlightFilters>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState("price")

  useEffect(() => {
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const date = searchParams.get("date")
    const passengers = searchParams.get("passengers")
    const cabinClass = searchParams.get("cabinClass")

    if (from && to && date) {
      flightStore.setDepartureLocation(from)
      flightStore.setArrivalLocation(to)
      flightStore.setDepartureDate(new Date(date))
      if (passengers) flightStore.setPassengers(Number.parseInt(passengers, 10))
      if (cabinClass) flightStore.setCabinClass(cabinClass as any)

      if (flightStore.flights.length === 0) {
        flightStore.searchFlights().then((success) => {
          if (!success && flightStore.searchError) {
            toast({
              title: "Search Failed",
              description: flightStore.searchError,
              variant: "destructive",
            })
          }
        })
      }
    }
   
  }, [searchParams])

 
  const filteredFlights = flightStore.flights.filter((flight) => {
    if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) return false
    if (filters.nonstop && flight.stops > 0) return false
    if (filters.morning || filters.afternoon || filters.evening) {
      const hour = Number.parseInt(flight.departureTime.split(":")[0])
      const isMorning = hour >= 5 && hour < 12
      const isAfternoon = hour >= 12 && hour < 18
      const isEvening = hour >= 18 || hour < 5
      if (filters.morning && !isMorning) return false
      if (filters.afternoon && !isAfternoon) return false
      if (filters.evening && !isEvening) return false
    }
    if (filters.wifi && !flight.amenities?.includes("wifi")) return false
    if (filters.meal && !flight.amenities?.includes("meal")) return false
    return true
  })

 
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price
      case "duration": {
       
        const getMinutes = (d: string) => {
          const [h, m] = d.split(/[hm ]/).filter(Boolean).map(Number)
          return (h || 0) * 60 + (m || 0)
        }
        return getMinutes(a.duration) - getMinutes(b.duration)
      }
      case "departure":
        return Number(a.departureTime.replace(":", "")) - Number(b.departureTime.replace(":", ""))
      case "arrival":
        return Number(a.arrivalTime.replace(":", "")) - Number(b.arrivalTime.replace(":", ""))
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "EEE, MMM d, yyyy")
  }

  const searchCriteria = flightStore.searchCriteria

  const handleFilterChange = (key: keyof FlightFilters, value: boolean | [number, number]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

 
  const getLocationDisplay = (loc: any, fallback: string) =>
    loc && typeof loc === "object"
      ? `${loc.city || fallback}${loc.code ? " (" + loc.code + ")" : ""}`
      : fallback

 
  const fromDisplay = flightStore.flights[0]?.from?.city || searchCriteria.from
  const toDisplay = flightStore.flights[0]?.to?.city || searchCriteria.to

 
  const updateDateInUrl = (newDate: Date) => {
    const params = new URLSearchParams(window.location.search)
    params.set("date", format(newDate, "yyyy-MM-dd"))
    router.push(`/search-results?${params.toString()}`)
  }

 
  const handlePreviousDay = () => {
    if (!flightStore.searchCriteria.departureDate) return
    const prevDate = subDays(flightStore.searchCriteria.departureDate, 1)
    flightStore.setDepartureDate(prevDate)
    flightStore.searchFlights()
    updateDateInUrl(prevDate)
  }

 
  const handleNextDay = () => {
    if (!flightStore.searchCriteria.departureDate) return
    const nextDate = addDays(flightStore.searchCriteria.departureDate, 1)
    flightStore.setDepartureDate(nextDate)
    flightStore.searchFlights()
    updateDateInUrl(nextDate)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-primary/5 py-6">
          <ResponsiveContainer>
            <div className="mb-4 flex items-center">
              <Link href="/book" className="flex items-center text-muted-foreground hover:text-foreground">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Link>
            </div>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                  {fromDisplay} to {toDisplay}
                </h1>
                <p className="text-muted-foreground">
                  {searchCriteria.departureDate && formatDate(searchCriteria.departureDate.toString())} ·{" "}
                  {searchCriteria.passengers} {searchCriteria.passengers === 1 ? "Passenger" : "Passengers"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePreviousDay}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous Day
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextDay}>
                  Next Day
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ResponsiveContainer>
        </div>

        <ResponsiveContainer className="py-8">
          <ErrorBoundary>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="md:col-span-1">
                <div className="sticky top-20 rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-medium">Price Range</h3>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm">${filters.priceRange[0]}</span>
                        <span className="text-sm">${filters.priceRange[1]}</span>
                      </div>
                      <Slider
                        min={400}
                        max={600}
                        step={10}
                        value={filters.priceRange}
                        onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
                      />
                    </div>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-medium">Stops</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="nonstop"
                            checked={filters.nonstop}
                            onCheckedChange={(checked) => handleFilterChange("nonstop", checked as boolean)}
                          />
                          <Label htmlFor="nonstop">Non-stop only</Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-medium">Departure Time</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="morning"
                            checked={filters.morning}
                            onCheckedChange={(checked) => handleFilterChange("morning", checked as boolean)}
                          />
                          <Label htmlFor="morning">Morning (5:00 AM - 11:59 AM)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="afternoon"
                            checked={filters.afternoon}
                            onCheckedChange={(checked) => handleFilterChange("afternoon", checked as boolean)}
                          />
                          <Label htmlFor="afternoon">Afternoon (12:00 PM - 5:59 PM)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="evening"
                            checked={filters.evening}
                            onCheckedChange={(checked) => handleFilterChange("evening", checked as boolean)}
                          />
                          <Label htmlFor="evening">Evening (6:00 PM - 4:59 AM)</Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-medium">Amenities</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="wifi"
                            checked={filters.wifi}
                            onCheckedChange={(checked) => handleFilterChange("wifi", checked as boolean)}
                          />
                          <Label htmlFor="wifi">Wi-Fi</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="meal"
                            checked={filters.meal}
                            onCheckedChange={(checked) => handleFilterChange("meal", checked as boolean)}
                          />
                          <Label htmlFor="meal">Meal Service</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {flightStore.isSearching
                      ? "Searching..."
                      : `${sortedFlights.length} ${sortedFlights.length === 1 ? "flight" : "flights"} found`}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price (Lowest first)</SelectItem>
                        <SelectItem value="duration">Duration (Shortest first)</SelectItem>
                        <SelectItem value="departure">Departure (Earliest first)</SelectItem>
                        <SelectItem value="arrival">Arrival (Earliest first)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {flightStore.isSearching ? (
                  <div className="flex h-64 items-center justify-center">
                    <div className="text-center">
                      <Spinner size="lg" className="mb-4" />
                      <p className="text-muted-foreground">Searching for the best flights...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedFlights.length > 0 ? (
                      sortedFlights.map((flight) => (
                        <FlightCard
                          key={flight.id}
                          flight={flight}
                          departureDate={searchCriteria.departureDate?.toISOString() || ""}
                          passengers={searchCriteria.passengers}
                        />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                          <h3 className="mb-2 text-lg font-medium">No flights found</h3>
                          <p className="mb-4 text-muted-foreground">Try adjusting your filters or search criteria</p>
                          <Button asChild>
                            <Link href="/book">New Search</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ErrorBoundary>
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  )
}

export default observer(SearchResultsPage)
