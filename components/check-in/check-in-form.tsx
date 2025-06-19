"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function CheckInForm() {
  const [bookingReference, setBookingReference] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

   
    await new Promise((resolve) => setTimeout(resolve, 1500))

   
    if (bookingReference.toUpperCase() === "SKYABC" && lastName.toLowerCase() === "smith") {
      setStatus("success")
    } else {
      setStatus("error")
      setErrorMessage("We couldn't find a booking with the provided details. Please check and try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="mx-auto max-w-md">
      {status === "success" ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Check-in Successful!</h3>
              <p className="mt-2 text-muted-foreground">
                You have successfully checked in for your flight. Your boarding pass is ready.
              </p>
              <div className="mt-6 space-y-4">
                <Button className="w-full">View Boarding Pass</Button>
                <Button variant="outline" className="w-full" onClick={() => setStatus("idle")}>
                  Check in for another flight
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {status === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="bookingReference">Booking Reference</Label>
              <Input
                id="bookingReference"
                placeholder="e.g., SKYABC"
                value={bookingReference}
                onChange={(e) => setBookingReference(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Your 6-character booking reference can be found in your confirmation email
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last name of the passenger"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                "Check In"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
