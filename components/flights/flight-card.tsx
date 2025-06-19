import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, Clock, Wifi, Coffee } from "lucide-react"
import { format } from "date-fns"
import { buildUrl, ROUTES } from "@/lib/navigation"
import { calculateDuration, formatTime } from "@/lib/utils"

interface FlightCardProps {
  flight: any
  departureDate: string
  passengers: number
}

export function FlightCard({ flight, departureDate, passengers }: FlightCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "EEE, MMM d, yyyy")
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              <span className="font-medium">{flight.airline}</span>
              <span className="text-sm text-muted-foreground">{flight.flightNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{calculateDuration(flight.departureTime, flight.arrivalTime)}</span>
              {flight.stops === 0 ? (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  Non-stop
                </span>
              ) : (
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  {flight.stops} stop
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
          <div className="space-y-1 md:col-span-1">
            <p className="text-2xl font-bold">{formatTime(flight.departureTime)}</p>
            <p className="font-medium">
              {flight.from.city} ({flight.from.city})
            </p>
            <p className="text-sm text-muted-foreground">{formatDate(departureDate)}</p>
          </div>

          <div className="flex items-center md:col-span-2">
            <div className="relative w-full">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-muted"></div>
              <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"></div>
              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"></div>
              {flight.stops > 0 && (
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                  <div className="mt-1 whitespace-nowrap rounded-md bg-muted px-2 py-1 text-xs">
                    {flight.stopLocation}
                    <br />
                    {flight.stopDuration} layover
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 text-right md:col-span-1">
            <p className="text-2xl font-bold">{formatTime(flight.arrivalTime)}</p>
            <p className="font-medium">
              {flight.to.city} ({flight.to.code})
            </p>
            <p className="text-sm text-muted-foreground">
              {flight.arrivalTime < flight.departureTime
                ? formatDate(new Date(new Date(departureDate).getTime() + 24 * 60 * 60 * 1000).toISOString())
                : formatDate(departureDate)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {flight.amenities.includes("wifi") && (
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs">
                <Wifi className="h-3 w-3" />
                <span>Wi-Fi</span>
              </div>
            )}
            {flight.amenities.includes("power") && (
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 2h10" />
                  <path d="M5 8h14" />
                  <path d="M5 14h14" />
                  <path d="M7 20h10" />
                </svg>
                <span>Power Outlets</span>
              </div>
            )}
            {flight.amenities.includes("entertainment") && (
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m10 10 5 3-5 3Z" />
                </svg>
                <span>Entertainment</span>
              </div>
            )}
            {flight.amenities.includes("meal") && (
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs">
                <Coffee className="h-3 w-3" />
                <span>Meal Service</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Price per passenger</p>
              <p className="text-2xl font-bold">${flight.price}</p>
            </div>
            <Button asChild>
              <Link
                href={buildUrl(ROUTES.FLIGHT_DETAILS(flight.id), {
                  date: departureDate,
                  passengers: passengers.toString(),
                })}
              >
                Select
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
