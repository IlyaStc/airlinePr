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
import { ChevronLeft, Info, Plane, CalendarIcon, MapPin, Users, Luggage } from "lucide-react"

export default function ManageBookingPage() {
  const [bookingStatus, setBookingStatus] = useState<"idle" | "found" | "error">("idle")
  const [bookingReference, setBookingReference] = useState("")
  const [lastName, setLastName] = useState("")
  const [date, setDate] = useState<Date>()

  const handleRetrieveBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (bookingReference && lastName) {
      setBookingStatus("found")
    } else {
      setBookingStatus("error")
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
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Manage Your Booking</h1>
          <p className="mt-2 text-muted-foreground">View, change, or cancel your reservation</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {bookingStatus === "found" ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Booking Details</CardTitle>
                        <CardDescription>Booking Reference: {bookingReference}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Print Itinerary
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6 space-y-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold">New York (JFK) to London (LHR)</h3>
                          <p className="text-muted-foreground">Flight SK123 • May 15, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Confirmed
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Plane className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Outbound Flight</p>
                            <p className="font-medium">SkyWings Airlines SK123</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Departure</p>
                            <p className="font-medium">19:30</p>
                            <p className="text-sm">May 15, 2025</p>
                            <p className="text-sm">New York (JFK)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Arrival</p>
                            <p className="font-medium">07:45</p>
                            <p className="text-sm">May 16, 2025</p>
                            <p className="text-sm">London (LHR)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">7h 15m</p>
                            <p className="text-sm">Non-stop</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Aircraft</p>
                            <p className="font-medium">Boeing 787-9</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Plane className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Return Flight</p>
                            <p className="font-medium">SkyWings Airlines SK456</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Departure</p>
                            <p className="font-medium">11:20</p>
                            <p className="text-sm">May 22, 2025</p>
                            <p className="text-sm">London (LHR)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Arrival</p>
                            <p className="font-medium">14:10</p>
                            <p className="text-sm">May 22, 2025</p>
                            <p className="text-sm">New York (JFK)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">7h 50m</p>
                            <p className="text-sm">Non-stop</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Aircraft</p>
                            <p className="font-medium">Boeing 787-9</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="mb-4 text-lg font-medium">Passenger Information</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Passenger 1</p>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-muted-foreground">Ticket: 012-3456789012</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Passenger 2</p>
                            <p className="font-medium">Jane Doe</p>
                            <p className="text-sm text-muted-foreground">Ticket: 012-3456789013</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Modify Your Booking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Change Flight Dates</p>
                          <p className="text-sm text-muted-foreground">Reschedule your journey</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          Change
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Luggage className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Add Baggage</p>
                          <p className="text-sm text-muted-foreground">Purchase additional baggage allowance</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          Add
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Select Seats</p>
                          <p className="text-sm text-muted-foreground">Choose your preferred seating</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Special Assistance</p>
                          <p className="text-sm text-muted-foreground">Request wheelchair or other assistance</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          Request
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                            <line x1="6" x2="18" y1="17" y2="17" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Special Meals</p>
                          <p className="text-sm text-muted-foreground">Request dietary accommodations</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          Request
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Travel Insurance</p>
                          <p className="text-sm text-muted-foreground">Protect your journey</p>
                        </div>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Cancel Booking</CardTitle>
                    <CardDescription>Please review our cancellation policy before proceeding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Cancellation fees may apply depending on your fare type and how close to departure you are
                      cancelling. Economy fares: 70% refund if cancelled more than 72 hours before departure.
                      Business/First Class fares: 85% refund if cancelled more than 48 hours before departure.
                    </p>
                    <Button variant="destructive">Cancel Booking</Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Retrieve Your Booking</CardTitle>
                  <CardDescription>Enter your booking details to view or modify your reservation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="reference" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="reference">Booking Reference</TabsTrigger>
                      <TabsTrigger value="ticket">E-Ticket Number</TabsTrigger>
                    </TabsList>
                    <TabsContent value="reference" className="mt-6">
                      <form onSubmit={handleRetrieveBooking}>
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="bookingReference">Booking Reference</Label>
                            <Input
                              id="bookingReference"
                              placeholder="Enter 6-character code (e.g., ABC123)"
                              value={bookingReference}
                              onChange={(e) => setBookingReference(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Enter last name as it appears on your booking"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>

                          {bookingStatus === "error" && (
                            <Alert variant="destructive">
                              <Info className="h-4 w-4" />
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>
                                We couldn't find a booking with the provided details. Please check your information and
                                try again.
                              </AlertDescription>
                            </Alert>
                          )}

                          <Button type="submit" className="w-full">
                            Retrieve Booking
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    <TabsContent value="ticket" className="mt-6">
                      <form onSubmit={handleRetrieveBooking}>
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="eticketNumber">E-Ticket Number</Label>
                            <Input id="eticketNumber" placeholder="Enter 13-digit e-ticket number" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastNameTicket">Last Name</Label>
                            <Input id="lastNameTicket" placeholder="Enter last name as it appears on your booking" />
                          </div>
                          <Button type="submit" className="w-full">
                            Retrieve Booking
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">What You Can Manage</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      View your complete itinerary
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      Change flight dates and times
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      Select or change seats
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      Add baggage or special services
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      Cancel your booking
                    </li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Change Policy</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Changes to your booking may incur fees depending on your fare type and how close to departure you
                    are making changes.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Need Help?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If you need assistance with your booking, please contact our customer service team.
                  </p>
                  <Button variant="outline" className="mt-2 w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Trip?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Pre-Flight Checklist</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                      </svg>
                      Check-in online (opens 24h before flight)
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                      </svg>
                      Verify travel documents are valid
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                      </svg>
                      Check baggage allowance
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                      </svg>
                      Review airport arrival time recommendations
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
