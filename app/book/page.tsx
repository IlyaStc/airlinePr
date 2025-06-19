"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, MapPin, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { PageContainer } from "@/components/layout/page-container"
import { buildUrl, ROUTES } from "@/lib/navigation"

export default function BookPage() {
  const router = useRouter()
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [tripType, setTripType] = useState("roundTrip")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!from || !to || !departureDate) {
      window.showNotification?.("error", "Missing Information", "Please fill in all required fields.")
      return
    }

    router.push(
      buildUrl(ROUTES.SEARCH_RESULTS, {
        from,
        to,
        date: departureDate ? format(departureDate, "yyyy-MM-dd") : undefined,
        returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : undefined,
        passengers,
        cabinClass,
        tripType,
      }),
    )
  }

  return (
    <PageContainer title="Book Your Flight" description="Search and book flights to destinations worldwide">
      <div className="container py-8">
        <div className="mb-8 flex items-center">
          <Link href={ROUTES.HOME} className="flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Find Your Perfect Flight</CardTitle>
              <CardDescription>Search for flights, hotels, and car rentals to plan your perfect trip</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch}>
                <Tabs defaultValue="flights" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="flights">Flights</TabsTrigger>
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="cars">Car Rental</TabsTrigger>
                  </TabsList>
                  <TabsContent value="flights" className="mt-6">
                    <div className="mb-6">
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

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="from"
                            className="pl-8"
                            placeholder="Departure city or airport"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
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
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
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
                                !departureDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
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
                                !returnDate && "text-muted-foreground",
                              )}
                              disabled={tripType === "oneWay"}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              initialFocus
                              disabled={(date) => (departureDate ? date < departureDate : false)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passengers</Label>
                        <Select value={passengers} onValueChange={setPassengers}>
                          <SelectTrigger id="passengers">
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Passenger</SelectItem>
                            <SelectItem value="2">2 Passengers</SelectItem>
                            <SelectItem value="3">3 Passengers</SelectItem>
                            <SelectItem value="4">4 Passengers</SelectItem>
                            <SelectItem value="5">5+ Passengers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class">Class</Label>
                        <Select value={cabinClass} onValueChange={setCabinClass}>
                          <SelectTrigger id="class">
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
                      <div className="space-y-2">
                        <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                        <Input id="promoCode" placeholder="Enter promo code" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="flexibleDates" />
                          <label
                            htmlFor="flexibleDates"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            My dates are flexible (±3 days)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="directFlights" />
                          <label
                            htmlFor="directFlights"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Show only direct flights
                          </label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                 
                </Tabs>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" size="lg" className="gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Flexible Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Change your flight with no fees up to 24 hours before departure
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Best Price Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find a lower price elsewhere and we'll match it plus give you 10% off
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Earn Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn points on every booking and redeem them for future flights and upgrades
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
