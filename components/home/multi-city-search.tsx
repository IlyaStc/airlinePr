"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Plus, Trash2, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

type FlightSegment = {
  from: string
  to: string
  date: Date | null
}

export function MultiCitySearch() {
  const [segments, setSegments] = useState<FlightSegment[]>([
    { from: "", to: "", date: null },
    { from: "", to: "", date: null },
  ])
  const [passengers, setPassengers] = useState("1")
  const [isSearching, setIsSearching] = useState(false)

  const addSegment = () => {
    if (segments.length < 5) {
      setSegments([...segments, { from: "", to: "", date: null }])
    }
  }

  const removeSegment = (index: number) => {
    if (segments.length > 2) {
      const newSegments = [...segments]
      newSegments.splice(index, 1)
      setSegments(newSegments)
    }
  }

  const updateSegment = (index: number, field: keyof FlightSegment, value: any) => {
    const newSegments = [...segments]
    newSegments[index] = { ...newSegments[index], [field]: value }
    setSegments(newSegments)
  }

  const handleSearch = () => {
    setIsSearching(true)
   
    setTimeout(() => {
      setIsSearching(false)
     
    }, 1500)
  }

  return (
    <>
      <div className="space-y-4">
        {segments.map((segment, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">From</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Departure city"
                  value={segment.from}
                  onChange={(e) => updateSegment(index, "from", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">To</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Arrival city"
                  value={segment.to}
                  onChange={(e) => updateSegment(index, "to", e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium leading-none">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !segment.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {segment.date ? format(segment.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={segment.date || undefined}
                      onSelect={(date) => updateSegment(index, "date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {segments.length > 2 && (
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSegment(index)}
                    className="h-10 w-10 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {segments.length < 5 && (
          <Button variant="outline" className="w-full gap-2" onClick={addSegment}>
            <Plus className="h-4 w-4" />
            Add Another Flight
          </Button>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Passengers</label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger>
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
          <div className="flex items-end">
            <Button className="w-full gap-2" onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search Flights
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
