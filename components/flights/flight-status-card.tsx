import { cn } from "@/lib/utils"
import { Clock, Calendar, Plane } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FlightStatusCardProps {
  flightNumber: string
  status: "scheduled" | "delayed" | "boarding" | "in-air" | "landed" | "cancelled" | "diverted"
  departureTime: string
  arrivalTime: string
  departureAirport: string
  arrivalAirport: string
  terminal?: string
  gate?: string
  className?: string
}

export function FlightStatusCard({
  flightNumber,
  status,
  departureTime,
  arrivalTime,
  departureAirport,
  arrivalAirport,
  terminal,
  gate,
  className,
}: FlightStatusCardProps) {
 
  const formatTime = (timeString: string) => {
    try {
      const time = new Date(timeString)
      return format(time, "h:mm a")
    } catch (e) {
      return timeString
    }
  }

 
  const getDate = (timeString: string) => {
    try {
      const time = new Date(timeString)
      return format(time, "MMM d, yyyy")
    } catch (e) {
      return ""
    }
  }

 
  const getStatusBadge = () => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Scheduled
          </Badge>
        )
      case "boarding":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Boarding
          </Badge>
        )
      case "in-air":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            In Air
          </Badge>
        )
      case "landed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Landed
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Delayed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Cancelled
          </Badge>
        )
      case "diverted":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Diverted
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between bg-primary/10 p-4">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-semibold">{flightNumber}</span>
          </div>
          <div>{getStatusBadge()}</div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-semibold">{formatTime(departureTime)}</p>
                <p className="text-xs text-muted-foreground">{departureAirport}</p>
              </div>
            </div>

            {(terminal || gate) && (
              <div className="rounded-md bg-muted p-2 text-sm">
                {terminal && (
                  <p>
                    Terminal: <span className="font-medium">{terminal}</span>
                  </p>
                )}
                {gate && (
                  <p>
                    Gate: <span className="font-medium">{gate}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Arrival</p>
                <p className="font-semibold">{formatTime(arrivalTime)}</p>
                <p className="text-xs text-muted-foreground">{arrivalAirport}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{getDate(departureTime)}</span>
        </div>

        <div className="text-xs">
          <span className="text-muted-foreground">Status last updated: </span>
          <span className="font-medium">Just now</span>
        </div>
      </CardFooter>
    </Card>
  )
}
