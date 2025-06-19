"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlightSearch } from "@/components/home/flight-search"
import { HotelSearch } from "@/components/home/hotel-search"
import { CarSearch } from "@/components/home/car-search"
import { MultiCitySearch } from "@/components/home/multi-city-search"

export function SearchTabs() {
  return (
    <Tabs defaultValue="flights" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="flights">Flights</TabsTrigger>
        <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
        <TabsTrigger value="hotels">Hotels</TabsTrigger>
        <TabsTrigger value="cars">Car Rental</TabsTrigger>
      </TabsList>
      <TabsContent value="flights" className="mt-4">
        <FlightSearch />
      </TabsContent>
      <TabsContent value="multi-city" className="mt-4">
        <MultiCitySearch />
      </TabsContent>
      <TabsContent value="hotels" className="mt-4">
        <HotelSearch />
      </TabsContent>
      <TabsContent value="cars" className="mt-4">
        <CarSearch />
      </TabsContent>
    </Tabs>
  )
}
