"use client"

import type React from "react"
import { Spinner } from "@/components/ui/spinner"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { buildUrl, ROUTES } from "@/lib/navigation"

export const FlightSearch = observer(() => {
  const router = useRouter()
  const { flightStore } = useStore()
  const [tripType, setTripType] = useState("roundTrip")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const { from, to, departureDate } = flightStore.searchCriteria

    if (!from || !to || !departureDate) {
     
      if (typeof window !== "undefined" && window.showNotification) {
        window.showNotification("error", "Missing Information", "Please fill in all required fields.")
      }
      return
    }

   
    flightStore.searchFlights()

   
    router.push(
      buildUrl(ROUTES.SEARCH_RESULTS, {
        from,
        to,
        date: departureDate ? format(departureDate, "yyyy-MM-dd") : undefined,
        returnDate: flightStore.searchCriteria.returnDate
          ? format(flightStore.searchCriteria.returnDate, "yyyy-MM-dd")
          : undefined,
        passengers: flightStore.searchCriteria.passengers,
        cabinClass: flightStore.searchCriteria.cabinClass,
        tripType,
      }),
    )
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="mb-4">
        <RadioGroup
          defaultValue="roundTrip"
          className="flex flex-wrap gap-4"
          onValueChange={(value) => setTripType(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="roundTrip" id="roundTrip" />
            <Label htmlFor="roundTrip">Round Trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oneWay" id="oneWay" />
            <Label htmlFor="oneWay">One Way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiCity" id="multiCity" />
            <Label htmlFor="multiCity">Multi-City</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="from"
              className="pl-8"
              placeholder="Departure city or airport"
              value={flightStore.searchCriteria.from}
              onChange={(e) => flightStore.setDepartureLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="to"
              className="pl-8"
              placeholder="Arrival city or airport"
              value={flightStore.searchCriteria.to}
              onChange={(e) => flightStore.setArrivalLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="departure">Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="departure"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !flightStore.searchCriteria.departureDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {flightStore.searchCriteria.departureDate ? (
                  format(flightStore.searchCriteria.departureDate, "PPP")
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={flightStore.searchCriteria.departureDate || undefined}
                onSelect={(date) => flightStore.setDepartureDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="return">Return Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="return"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !flightStore.searchCriteria.returnDate && "text-muted-foreground",
                )}
                disabled={tripType === "oneWay"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {flightStore.searchCriteria.returnDate ? (
                  format(flightStore.searchCriteria.returnDate, "PPP")
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={flightStore.searchCriteria.returnDate || undefined}
                onSelect={(date) => flightStore.setReturnDate(date)}
                initialFocus
                disabled={(date) =>
                  flightStore.searchCriteria.departureDate ? date < flightStore.searchCriteria.departureDate : false
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Select
            value={flightStore.searchCriteria.passengers.toString()}
            onValueChange={(value) => flightStore.setPassengers(Number(value))}
          >
            <SelectTrigger id="passengers">
              <SelectValue placeholder="Select passengers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Passenger</SelectItem>
              <SelectItem value="2">2 Passengers</SelectItem>
              <SelectItem value="3">3 Passengers</SelectItem>
              <SelectItem value="4">4 Passengers</SelectItem>
              <SelectItem value="5">5 Passengers</SelectItem>
              <SelectItem value="6">6 Passengers</SelectItem>
              <SelectItem value="7">7 Passengers</SelectItem>
              <SelectItem value="8">8 Passengers</SelectItem>
              <SelectItem value="9">9 Passengers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cabinClass">Class</Label>
          <Select
            value={flightStore.searchCriteria.cabinClass}
            onValueChange={(value) => flightStore.setCabinClass(value as any)}
          >
            <SelectTrigger id="cabinClass">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="premium">Premium Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-2">
          <Button type="submit" className="mt-8 w-full" size="lg" disabled={flightStore.isSearching}>
            {flightStore.isSearching ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Flights
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
})
