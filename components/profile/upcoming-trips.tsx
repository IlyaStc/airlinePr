"use client"

import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const UpcomingTrips = observer(() => {
  const { bookingStore } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Trips</CardTitle>
        <CardDescription>Your scheduled flights</CardDescription>
      </CardHeader>
      <CardContent>
        {bookingStore.isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : bookingStore.upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {bookingStore.upcomingBookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      {booking.from} to {booking.to}
                    </h3>
                    <p className="text-muted-foreground">
                      Flight {booking.flightNumber} • {booking.departureDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {booking.status}
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No upcoming trips found</div>
        )}
        <div className="mt-4 text-center">
          <Button variant="link">View All Bookings</Button>
        </div>
      </CardContent>
    </Card>
  )
})
