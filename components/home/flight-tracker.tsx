"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plane } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/lib/navigation"

export function FlightTracker() {
  const router = useRouter()
  const [flightNumber, setFlightNumber] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!flightNumber) return

    setIsSubmitting(true)
   
    setTimeout(() => {
      router.push(`${ROUTES.FLIGHT_STATUS}?flightNumber=${flightNumber}&date=${date}`)
    }, 500)
  }

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-sky-50 to-blue-100 shadow-md">
      <CardHeader className="bg-primary/10 pb-4">
        <div className="flex items-center gap-2 text-primary">
          <Plane className="h-5 w-5" />
          <CardTitle className="text-lg">Track Your Flight</CardTitle>
        </div>
        <CardDescription>Check the status of any flight in real-time</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="flightNumber" className="text-sm font-medium">
              Flight Number
            </label>
            <div className="relative">
              <Input
                id="flightNumber"
                placeholder="e.g. SW123"
                className="pl-9"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                required
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Date
            </label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end bg-primary/5 px-6 py-4">
        <Button type="submit" onClick={handleSubmit} disabled={!flightNumber || isSubmitting}>
          {isSubmitting ? "Checking..." : "Check Status"}
        </Button>
      </CardFooter>
    </Card>
  )
}
