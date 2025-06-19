"use client"

import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plane, Calendar, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export const BookingHistory = observer(() => {
  const { bookingStore } = useStore()
  const [activeTab, setActiveTab] = useState("upcoming")
  useEffect(() => {

    bookingStore.getUserBookings()
    console.log("Booking history loaded:", bookingStore.bookings)
  }, [bookingStore])

  const bookings = activeTab === "upcoming" ? bookingStore.bookings : bookingStore.pastBookings

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>View and manage your flight bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {bookingStore.isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-primary" />
                        <h3 className="text-lg font-bold">
                          {booking.flight.from} to {booking.to}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <p>{booking.departureDate}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <p>Flight {booking.flightNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:items-end">
                      <Badge variant={booking.status === "Confirmed" ? "default" : "outline"}>{booking.status}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {activeTab === "upcoming" && (
                          <Button variant="outline" size="sm">
                            Check-in
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {activeTab === "upcoming" ? "No upcoming bookings found" : "No past bookings found"}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {bookingStore.isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-primary" />
                        <h3 className="text-lg font-bold">
                          {booking.from} to {booking.to}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <p>{booking.departureDate}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <p>Flight {booking.flightNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:items-end">
                      <Badge variant="outline">Completed</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No past bookings found</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
})
