"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { observer } from "mobx-react-lite"
import { useStore } from "@/stores/root-store"

type DestinationCardProps = {
  city: string
  country: string
  price: string
  image: string
}

export const DestinationCard = observer(({ city, country, price, image }: DestinationCardProps) => {
  const { flightStore } = useStore()

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={`${city}, ${country}`} fill className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{city}</h3>
          <p className="text-white/90">{country}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Flights from</p>
            <p className="text-lg font-bold">{price}</p>
          </div>
          <Button
            size="sm"
            onClick={() => {
              flightStore.setDepartureLocation("Your City")
              flightStore.setArrivalLocation(city)
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})
