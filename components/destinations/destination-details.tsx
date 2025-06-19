"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Info, Utensils, Map, Heart, HeartOff, Plane, Hotel } from "lucide-react"

interface Attraction {
  id: number
  name: string
  description: string
  image: string
}

interface LocalTip {
  id: number
  title: string
  content: string
  author: string
}

interface HotelType {
  id: number
  name: string
  stars: number
  price: string
  image: string
}

interface Weather {
  temperature: string
  conditions: string
  bestMonths: string[]
}

interface DestinationDetailsProps {
  destination: {
    id: number
    city: string
    country: string
    region: string
    description: string
    longDescription?: string
    price: string
    image: string
    gallery?: string[]
    bestTimeToVisit?: string
    attractions?: Attraction[]
    hotels?: HotelType[]
    localTips?: LocalTip[]
    weather?: Weather
  }
}

export function DestinationDetails({ destination }: DestinationDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
   
    const savedFavorites = localStorage.getItem("favoriteDestinations")
    let favorites: number[] = savedFavorites ? JSON.parse(savedFavorites) : []
    if (isFavorite) {
      favorites = favorites.filter((id) => id !== destination.id)
    } else {
      favorites.push(destination.id)
    }
    localStorage.setItem("favoriteDestinations", JSON.stringify(favorites))
  }

  return (
    <div className="space-y-8">
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl md:h-[400px]">
        <Image
          src={destination.image || "/placeholder.svg?height=800&width=1200"}
          alt={`${destination.city}, ${destination.country}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-white">
                <MapPin className="h-5 w-5" />
                <h1 className="text-3xl font-bold">{destination.city}</h1>
              </div>
              <p className="text-xl text-white/90">{destination.country}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                ) : (
                  <HeartOff className="h-5 w-5 text-white" />
                )}
              </Button>
              <Button asChild className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Link href={`/book?destination=${destination.city}`}>
                  <Plane className="mr-2 h-4 w-4" />
                  Book Flights
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="attractions" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                Attractions
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-1">
                <Hotel className="h-4 w-4" />
                Hotels
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                Local Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">About {destination.city}</h2>
                  <p className="mt-2 text-muted-foreground">{destination.longDescription || destination.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Best Time to Visit</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <p>
                      {destination.bestTimeToVisit ||
                        "Year-round destination with peak season during summer months."}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Weather</h3>
                  <p className="mt-2 text-muted-foreground">
                    {destination.weather?.temperature ||
                      "Average temperatures range from 15°C to 30°C depending on the season."}{" "}
                    {destination.weather?.conditions || "Generally sunny with occasional rainfall."}
                  </p>
                </div>
                {destination.gallery && destination.gallery.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold">Gallery</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {destination.gallery.map((image, index) => (
                        <div key={index} className="relative h-48 overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${destination.city} gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="attractions" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Top Attractions in {destination.city}</h2>
                {destination.attractions && destination.attractions.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {destination.attractions.map((attraction) => (
                      <Card key={attraction.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={attraction.image || "/placeholder.svg?height=400&width=600"}
                            alt={attraction.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-xl font-bold">{attraction.name}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{attraction.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">Attractions coming soon</h3>
                    <p className="mt-2 text-muted-foreground">
                      We're currently updating our attraction information for {destination.city}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="hotels" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Recommended Hotels in {destination.city}</h2>
                {destination.hotels && destination.hotels.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {destination.hotels.map((hotel) => (
                      <Card key={hotel.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={hotel.image || "/placeholder.svg?height=400&width=600"}
                            alt={hotel.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-xl font-bold">{hotel.name}</h3>
                          <div className="mt-1 flex items-center">
                            {Array(hotel.stars)
                              .fill(0)
                              .map((_, i) => (
                                <svg key={i} className="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
                                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                                </svg>
                              ))}
                          </div>
                          <p className="mt-2 font-bold">{hotel.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">Hotels coming soon</h3>
                    <p className="mt-2 text-muted-foreground">
                      We're currently updating our hotel recommendations for {destination.city}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="tips" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Local Tips for {destination.city}</h2>
                {destination.localTips && destination.localTips.length > 0 ? (
                  <div className="space-y-4">
                    {destination.localTips.map((tip) => (
                      <Card key={tip.id}>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold">{tip.title}</h3>
                          <p className="mt-2 text-muted-foreground">{tip.content}</p>
                          <p className="mt-2 text-sm font-medium">— {tip.author}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">Local tips coming soon</h3>
                    <p className="mt-2 text-muted-foreground">
                      We're currently gathering insider tips from locals in {destination.city}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">Flights to {destination.city}</h3>
              <p className="mt-2 text-muted-foreground">Flights starting from</p>
              <p className="text-2xl font-bold">{destination.price}</p>
              <Button className="mt-4 w-full" asChild>
                <Link href={`/book?destination=${destination.city}`}>Search Flights</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">Weather in {destination.city}</h3>
              <div className="mt-4 space-y-2">
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Best months to visit:</span>
                  <span className="font-medium">
                    {destination.weather?.bestMonths?.join(", ") || "June - September"}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average temperature:</span>
                  <span className="font-medium">{destination.weather?.temperature || "15°C - 30°C"}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Conditions:</span>
                  <span className="font-medium">{destination.weather?.conditions || "Mostly sunny"}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">Nearby Destinations</h3>
              <div className="mt-4 space-y-3">
                <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Paris, France</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Amsterdam, Netherlands</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Brussels, Belgium</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
