"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageContainer } from "@/components/layout/page-container"
import { BookingSummary } from "@/components/booking/booking-summary"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { buildUrl } from "@/lib/navigation"
import type { PassengerDetails } from "@/types/booking"

function PassengerDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { bookingStore, flightStore } = useStore()
  const { toast } = useToast()

  const flightId = searchParams.get("flightId") || ""
  const departureDate = searchParams.get("date") || ""
  const passengersParam = searchParams.get("passengers") || "1"
  const passengers = Number.parseInt(passengersParam, 10)

  const [isSubmitting, setIsSubmitting] = useState(false)

 
  useEffect(() => {
    if (passengers > 0) {
      bookingStore.initializeBooking(passengers)
    }

   
    if (flightId && !flightStore.selectedFlight) {
      flightStore.getFlightById(flightId)
    }
  }, [passengers, flightId, bookingStore, flightStore])

  const updatePassengerField = (index: number, field: keyof PassengerDetails, value: string | Date | null) => {
    bookingStore.updatePassenger(index, { [field]: value })
  }

  const updateContactField = (field: "email" | "phone", value: string) => {
    const currentContact = bookingStore.contactDetails
    bookingStore.setContactDetails(
      field === "email" ? value : currentContact.email,
      field === "phone" ? value : currentContact.phone,
    )
  }

  const validateForm = (): boolean => {
   
    for (let i = 0; i < bookingStore.passengerDetails.length; i++) {
      const passenger = bookingStore.passengerDetails[i]

      if (!passenger.firstName || !passenger.lastName) {
        toast({
          title: "Missing Information",
          description: `Please enter name for passenger ${i + 1}`,
          variant: "destructive",
        })
        return false
      }

      if (!passenger.dateOfBirth) {
        toast({
          title: "Missing Information",
          description: `Please enter date of birth for passenger ${i + 1}`,
          variant: "destructive",
        })
        return false
      }
    }

   
    if (!bookingStore.contactDetails.email) {
      toast({
        title: "Missing Contact Information",
        description: "Please provide contact email",
        variant: "destructive",
      })
      return false
    }

    if (!bookingStore.contactDetails.phone) {
      toast({
        title: "Missing Contact Information",
        description: "Please provide contact phone number",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 1000))

     
      router.push(
        buildUrl("/seat-selection", {
          flightId,
          date: departureDate,
          passengers: passengers.toString(),
        }),
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save passenger details",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (flightStore.isLoadingFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-lg font-medium">Loading flight details...</p>
        </div>
      </PageContainer>
    )
  }

  if (!flightStore.selectedFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Flight not found</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Passenger Details</h1>
        <p className="text-muted-foreground">
          Please provide details for all {passengers} {passengers === 1 ? "passenger" : "passengers"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {bookingStore.passengerDetails.map((passenger, index) => (
              <Card key={index} className="mb-8">
                <CardHeader>
                  <CardTitle>Passenger {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`firstName-${index}`}>First Name *</Label>
                      <Input
                        id={`firstName-${index}`}
                        value={passenger.firstName}
                        onChange={(e) => updatePassengerField(index, "firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
                      <Input
                        id={`lastName-${index}`}
                        value={passenger.lastName}
                        onChange={(e) => updatePassengerField(index, "lastName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth *</Label>
                      <Input
                        id={`dateOfBirth-${index}`}
                        type="date"
                        value={passenger.dateOfBirth ? passenger.dateOfBirth.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          updatePassengerField(index, "dateOfBirth", e.target.value ? new Date(e.target.value) : null)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`nationality-${index}`}>Nationality *</Label>
                      <Select
                        value={passenger.nationality}
                        onValueChange={(value) => updatePassengerField(index, "nationality", value)}
                      >
                        <SelectTrigger id={`nationality-${index}`}>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="cn">China</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="br">Brazil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`passportNumber-${index}`}>Passport Number</Label>
                      <Input
                        id={`passportNumber-${index}`}
                        value={passenger.passportNumber}
                        onChange={(e) => updatePassengerField(index, "passportNumber", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`specialRequests-${index}`}>Special Requests</Label>
                      <Input
                        id={`specialRequests-${index}`}
                        value={passenger.specialRequests}
                        onChange={(e) => updatePassengerField(index, "specialRequests", e.target.value)}
                        placeholder="Dietary requirements, assistance, etc."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={bookingStore.contactDetails.email}
                      onChange={(e) => updateContactField("email", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Your booking confirmation and updates will be sent to this email
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={bookingStore.contactDetails.phone}
                      onChange={(e) => updateContactField("phone", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll only contact you in case of flight changes or emergencies
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  "Continue to Seat Selection"
                )}
              </Button>
            </div>
          </div>

          <div>
            <BookingSummary
              flight={flightStore.selectedFlight}
              departureDate={departureDate}
              passengers={passengers}
              price={flightStore.selectedFlight.price * passengers}
            />
          </div>
        </div>
      </form>
    </PageContainer>
  )
}

export default observer(PassengerDetailsPage)
