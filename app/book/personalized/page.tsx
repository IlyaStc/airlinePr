"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, ChevronLeft, MapPin, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function PersonalizedBookingPage() {
  const { user } = useAuth()
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [tripType, setTripType] = useState("roundTrip")

  const recentSearches = [
    { from: "New York (JFK)", to: "London (LHR)" },
    { from: "New York (JFK)", to: "Paris (CDG)" },
    { from: "Boston (BOS)", to: "New York (JFK)" },
  ]

  const favoriteDestinations = [
    { city: "London", country: "United Kingdom", code: "LHR", image: "/placeholder.svg?height=400&width=600" },
    { city: "Paris", country: "France", code: "CDG", image: "/placeholder.svg?height=400&width=600" },
    { city: "Tokyo", country: "Japan", code: "NRT", image: "/placeholder.svg?height=400&width=600" },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="mb-8 flex items-center">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome back, {user?.name}</h1>
            <p className="mt-2 text-muted-foreground">Book your next adventure with personalized recommendations</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Book Your Flight</CardTitle>
              <CardDescription>Search for flights with your preferences automatically applied</CardDescription>
            </CardHeader>
            <CardContent>
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
                          defaultValue="New York (JFK)"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="to" className="pl-8" placeholder="Arrival city or airport" />
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
                      <Select defaultValue="1">
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
                      <Select defaultValue="economy">
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
                        <Checkbox id="flexibleDates" defaultChecked />
                        <label
                          htmlFor="flexibleDates"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          My dates are flexible (±3 days)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="directFlights" defaultChecked />
                        <label
                          htmlFor="directFlights"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Show only direct flights
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="usePoints" />
                        <label
                          htmlFor="usePoints"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Use my SkyWings points ({user?.loyaltyPoints.toLocaleString()} available)
                        </label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hotels" className="mt-6">
             
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="destination" className="pl-8" placeholder="City or hotel name" />
                        <Input
                          id="destination"
                          className="pl-8"
                          placeholder="City or hotel name"
                          defaultValue="London"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="checkIn"
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
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="checkOut"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !returnDate && "text-muted-foreground",
                            )}
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
                    <div className="space-y-2">
                      <Label htmlFor="rooms">Rooms & Guests</Label>
                      <Select defaultValue="1-2">
                        <SelectTrigger id="rooms">
                          <SelectValue placeholder="Select rooms & guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-1">1 Room, 1 Guest</SelectItem>
                          <SelectItem value="1-2">1 Room, 2 Guests</SelectItem>
                          <SelectItem value="2-2">2 Rooms, 2 Guests</SelectItem>
                          <SelectItem value="2-4">2 Rooms, 4 Guests</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cars" className="mt-6">
                
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pick-up Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="pickupLocation"
                          className="pl-8"
                          placeholder="City or airport"
                          defaultValue="London (LHR)"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pick-up Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="pickupDate"
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
                      <Label htmlFor="returnDate">Return Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="returnDate"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !returnDate && "text-muted-foreground",
                            )}
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
                    <div className="space-y-2">
                      <Label htmlFor="carType">Car Type</Label>
                      <Select defaultValue="midsize">
                        <SelectTrigger id="carType">
                          <SelectValue placeholder="Select car type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="midsize">Midsize</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </CardFooter>
          </Card>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Recent Searches</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {recentSearches.map((search, index) => (
                <Card key={index} className="cursor-pointer hover:bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {search.from} to {search.to}
                        </p>
                        <p className="text-sm text-muted-foreground">Round Trip • Economy</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Your Favorite Destinations</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {favoriteDestinations.map((destination, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={`${destination.city}, ${destination.country}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{destination.city}</h3>
                      <p className="text-white/90">{destination.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {destination.code}
                      </div>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-primary p-8 text-primary-foreground">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold">Exclusive Member Offers</h2>
                <p className="mt-2 text-primary-foreground/90">
                  As a {user?.tier} member, you have access to special deals and promotions.
                </p>
                <div className="mt-6">
                  <div className="mb-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">Double Points Promotion</h3>
                        <p className="text-sm text-primary-foreground/90">
                          Earn 2x points on all flights booked this month
                        </p>
                      </div>
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">Companion Discount</h3>
                        <p className="text-sm text-primary-foreground/90">
                          50% off for your travel companion on select routes
                        </p>
                      </div>
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Your Rewards Status</h3>
                    <div className="mt-4 flex items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
                        <span className="text-3xl font-bold">{user?.tier}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-lg font-bold">{user?.loyaltyPoints.toLocaleString()} Points</p>
                    <Button variant="secondary" className="mt-4">
                      View Benefits
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
