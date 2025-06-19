"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Plane } from "lucide-react"

export type SeatType = "standard" | "premium" | "exit"

export interface Seat {
  id: number
  row: number
  column: string
  type: SeatType
  price: number
  isAvailable: boolean
  isSelected?: boolean
}

interface SeatMapProps {
  seats: Seat[]
  maxSeats?: number
  onSeatSelect: (seatId: number) => void
}

export function SeatMap({ seats, maxSeats = Number.POSITIVE_INFINITY, onSeatSelect }: SeatMapProps) {
 
  const rows = Array.from(new Set(seats.map((seat) => seat.row))).sort((a, b) => a - b)
  const columns = Array.from(new Set(seats.map((seat) => seat.column))).sort()

 
  const seatsByRow = rows.map((row) => {
    return {
      row,
      seats: columns.map((column) => seats.find((seat) => seat.row === row && seat.column === column)),
    }
  })

 
  const selectedSeats = seats.filter((seat) => seat.isSelected).length

  return (
    <Card>
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Seat Map</CardTitle>
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span className="font-medium">Boeing 787-9</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-sm border border-gray-300 bg-white"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
            <span className="text-xs">Unavailable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-sm bg-primary"></div>
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-sm bg-blue-100"></div>
            <span className="text-xs">Premium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-sm bg-green-100"></div>
            <span className="text-xs">Exit Row</span>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="mx-auto mb-4 h-16 w-32 rounded-t-full border-2 border-gray-300"></div>

            <div className="grid grid-cols-6 gap-1">
              {columns.map((column) => (
                <div key={column} className="text-center text-xs font-medium">
                  {column}
                </div>
              ))}

              {seatsByRow.map((row) =>
                row.seats.map((seat, index) => {
                  if (!seat) return <div key={`empty-${row.row}-${index}`} className="h-8"></div>

                 
                  let bgColor = "bg-white"
                  if (!seat.isAvailable) bgColor = "bg-gray-300"
                  else if (seat.isSelected) bgColor = "bg-primary"
                  else if (seat.type === "premium") bgColor = "bg-blue-100"
                  else if (seat.type === "exit") bgColor = "bg-green-100"

                 
                  const isFirstInRow = index === 0

                  return (
                    <div key={seat ? seat.id : `empty-${row.row}-${index}`} className="relative">
                      {isFirstInRow && (
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-xs font-medium">{seat.row}</div>
                      )}
                      <button
                        className={`h-8 w-full rounded-sm border border-gray-300 ${bgColor} text-xs ${
                          seat.isSelected ? "text-white" : "text-gray-700"
                        } ${
                          !seat.isAvailable || (selectedSeats >= maxSeats && !seat.isSelected)
                            ? "cursor-not-allowed"
                            : "hover:border-primary"
                        }`}
                        onClick={() => onSeatSelect(seat.id)}
                        disabled={!seat.isAvailable || (selectedSeats >= maxSeats && !seat.isSelected)}
                        title={`Seat ${seat.id}${seat.price > 0 ? ` - $${seat.price}` : ""}`}
                      >
                        {seat.id}
                      </button>
                    </div>
                  )
                }),
              )}
            </div>

            <div className="mx-auto mt-4 h-16 w-16 rounded-b-full border-2 border-gray-300"></div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Seat Selection Information</p>
              <p className="text-sm text-muted-foreground">
                Premium seats offer extra legroom and priority boarding. Exit row seats have additional legroom but
                require passengers to assist in case of emergency. Standard seats are available throughout the cabin.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
