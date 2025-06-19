"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"
import { PageContainer } from "@/components/layout/page-container"
import { BookingSummary } from "@/components/booking/booking-summary"
import { PaymentForm, type PaymentFormData } from "@/components/payment/payment-form"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { buildUrl } from "@/lib/navigation"

function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { bookingStore, flightStore } = useStore()
  const { toast } = useToast()

  const flightId = searchParams.get("flightId") || ""
  const departureDate = searchParams.get("date") || ""
  const passengersParam = searchParams.get("passengers") || "1"
  const passengers = Number.parseInt(passengersParam, 10)
  const seatsParam = searchParams.get("seats") || ""
  const selectedSeats = seatsParam ? seatsParam.split(",") : []

 
  useEffect(() => {
    if (flightId && !flightStore.selectedFlight) {
      flightStore.getFlightById(flightId)
    }
  }, [flightId, flightStore])

  const calculateTotalPrice = () => {
    if (!flightStore.selectedFlight) return 0

    const basePrice = flightStore.selectedFlight.price * passengers
    const taxes = basePrice * 0.1

    return basePrice + taxes
  }

  const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    try {
     
      bookingStore.setPaymentMethod(paymentData.paymentMethod as any)

     
      const booking = await bookingStore.createBooking()

      if (booking) {
        toast({
          title: "Booking Confirmed",
          description: "Your flight has been successfully booked!",
        })

       
        router.push(
          buildUrl("/booking-confirmation", {
            bookingId: booking.id,
          }),
        )
      } else if (bookingStore.error) {
        toast({
          title: "Booking Failed",
          description: bookingStore.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (flightStore.isLoadingFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p className="text-lg font-medium">Loading payment details...</p>
        </div>
      </PageContainer>
    )
  }

  if (!flightStore.selectedFlight) {
    return (
      <PageContainer className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Flight not found</p>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment</h1>
        <p className="text-muted-foreground">Complete your booking by providing payment details</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            isProcessing={bookingStore.isCreating}
            totalAmount={calculateTotalPrice()}
          />
        </div>

        <div>
          <BookingSummary
            flight={flightStore.selectedFlight}
            departureDate={departureDate}
            passengers={passengers}
            seats={selectedSeats}
            price={flightStore.selectedFlight.price * passengers}
            taxes={calculateTotalPrice() - flightStore.selectedFlight.price * passengers}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default observer(PaymentPage)
