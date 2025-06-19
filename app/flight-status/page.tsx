"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, Plane, CalendarIcon, Clock, MapPin, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function FlightStatusPage() {
  const [searchStatus, setSearchStatus] = useState<"idle" | "found" | "error">("idle")
  const [flightNumber, setFlightNumber] = useState("")
  const [date, setDate] = useState<Date>()

  const handleSearchFlight = (e: React.FormEvent) => {
    e.preventDefault()
    if (flightNumber) {
      setSearchStatus("found")
    } else {
      setSearchStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8 flex items-center">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Flight Status</h1>
          <p className="mt-2 text-muted-foreground">Check the status of any SkyWings flight</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Flight</CardTitle>
                <CardDescription>Enter your flight details to check the current status</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="flightNumber" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="flightNumber">Flight Number</TabsTrigger>
                    <TabsTrigger value="route">Route</TabsTrigger>
                  </TabsList>
                  <TabsContent value="flightNumber" className="mt-6">
                    <form onSubmit={handleSearchFlight}>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="flightNumber">Flight Number</Label>
                          <div className="relative">
                            <Plane className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="flightNumber"
                              className="pl-8"
                              placeholder="e.g. SK123"
                              value={flightNumber}
                              onChange={(e) => setFlightNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="flightDate">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="flightDate"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {searchStatus === "error" && (
                        <Alert variant="destructive" className="mt-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                            We couldn't find a flight with the provided details. Please check your information and try
                            again.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="mt-6">
                        <Button type="submit" className="w-full">
                          Search Flight
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="route" className="mt-6">
                    <form onSubmit={handleSearchFlight}>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="departureAirport">From</Label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="departureAirport" className="pl-8" placeholder="Departure airport" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="arrivalAirport">To</Label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="arrivalAirport" className="pl-8" placeholder="Arrival airport" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="routeDate">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="routeDate"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button type="submit" className="w-full">
                          Search Flights
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {searchStatus === "found" && (
              <div className="mt-8 space-y-6">
                <Card>
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle>Flight SK123</CardTitle>
                        <CardDescription>New York (JFK) to London (LHR)</CardDescription>
                      </div>
                      <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        On Time
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6 grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Departure</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <p className="text-xl font-bold">19:30</p>
                          </div>
                          <p className="text-sm">Terminal 4, Gate B12</p>
                          <p className="text-sm">John F. Kennedy International Airport (JFK)</p>
                          <p className="text-sm">New York, USA</p>
                        </div>
                        <div className="rounded-md bg-green-50 p-2 text-sm text-green-800">
                          <p className="font-medium">Boarding at 18:50</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Arrival</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <p className="text-xl font-bold">07:45</p>
                            <p className="text-sm text-muted-foreground">(Next day)</p>
                          </div>
                          <p className="text-sm">Terminal 5, Gate A22</p>
                          <p className="text-sm">Heathrow Airport (LHR)</p>
                          <p className="text-sm">London, UK</p>
                        </div>
                        <div className="rounded-md bg-green-50 p-2 text-sm text-green-800">
                          <p className="font-medium">On Schedule</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="grid gap-6 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Flight Duration</p>
                        <p className="font-medium">7h 15m</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Aircraft</p>
                        <p className="font-medium">Boeing 787-9 Dreamliner</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Flight Status</p>
                        <p className="font-medium text-green-600">On Time</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Flight Progress</h3>
                      <div className="relative mb-4 h-2 w-full rounded-full bg-muted">
                        <div className="absolute left-0 top-0 h-2 w-1/3 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>JFK</span>
                        <span>In Flight (2h 25m elapsed)</span>
                        <span>LHR</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weather Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">New York (JFK)</h3>
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-bold">72°F</div>
                          <div>
                            <p className="font-medium">Partly Cloudy</p>
                            <p className="text-sm text-muted-foreground">Wind: 8 mph</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">London (LHR)</h3>
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-bold">59°F</div>
                          <div>
                            <p className="font-medium">Light Rain</p>
                            <p className="text-sm text-muted-foreground">Wind: 12 mph</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Flight Status Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Status Definitions</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="font-medium">On Time</span> - Flight is operating as scheduled
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="font-medium">Delayed</span> - Flight is delayed by 15+ minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="font-medium">Cancelled</span> - Flight has been cancelled
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="font-medium">In Air</span> - Flight is currently in the air
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="font-medium">Diverted</span> - Flight has been diverted to another airport
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="font-medium">Landed</span> - Flight has landed at its destination
                    </li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Flight Notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sign up for real-time flight status updates via email or SMS.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Input placeholder="Enter email or phone number" />
                    <Button variant="outline" className="w-full">
                      Subscribe to Updates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    { from: "New York", to: "London", code: "JFK-LHR" },
                    { from: "Los Angeles", to: "Tokyo", code: "LAX-NRT" },
                    { from: "Chicago", to: "Paris", code: "ORD-CDG" },
                    { from: "Miami", to: "Madrid", code: "MIA-MAD" },
                    { from: "San Francisco", to: "Sydney", code: "SFO-SYD" },
                  ].map((route, index) => (
                    <li key={index}>
                      <Button variant="ghost" className="w-full justify-start text-left">
                        <div>
                          <p className="font-medium">
                            {route.from} to {route.to}
                          </p>
                          <p className="text-xs text-muted-foreground">{route.code}</p>
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
