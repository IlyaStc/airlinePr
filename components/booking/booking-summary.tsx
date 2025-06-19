import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface BookingSummaryProps {
  flight: any
  departureDate: string
  passengers: number
  seats?: string[]
  fare?: string
  price: number
  taxes?: number
}

export function BookingSummary({
  flight,
  departureDate,
  passengers,
  seats,
  fare,
  price,
  taxes = 0,
}: BookingSummaryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "EEE, MMM d, yyyy")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="font-medium">{flight.from.city}</div>
              <div className="font-medium">{flight.to.city}</div>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <div>{formatDate(departureDate)}</div>
              <div>{flight.duration}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{flight.airline}</span> {flight.flightNumber}
            </div>
            <div className="text-sm">
              {formatDate(flight.departureTime)} - {formatDate(flight.arrivalTime)}
            </div>
          </div>
          <div className="rounded-md bg-muted p-2 text-sm">
            <div className="font-medium">{fare || "Economy"}</div>
            <div className="text-muted-foreground">
              {passengers} {passengers === 1 ? "passenger" : "passengers"}
            </div>
          </div>

          {seats && seats.length > 0 && (
            <div>
              <p className="text-sm font-medium">Selected Seats</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {seats.map((seat) => (
                  <span key={seat} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base fare</span>
              <span>${price - taxes}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & fees</span>
              <span>${taxes}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${price}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
