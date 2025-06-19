"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, MapPin, Globe, TrendingUp, Heart, HeartOff } from "lucide-react"
import { Destination } from "@/types"


interface DestinationGridProps {
  initialDestinations?: Destination[]
  isLoading?: boolean
  onSearch?: (query: string) => void
  onFilterChange?: (filter: string) => void
  onFavoriteToggle?: (id: number, isFavorite: boolean) => void
}

export function DestinationGrid({
  initialDestinations = [],
  isLoading = false,
  onSearch,
  onFilterChange,
  onFavoriteToggle,
}: DestinationGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [continent, setContinent] = useState("all")
  const [view, setView] = useState("grid")
  const [favorites, setFavorites] = useState<number[]>([])
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations)
  const [sortBy, setSortBy] = useState("popular")

  useEffect(() => {
    if (initialDestinations.length > 0) {
      setDestinations(initialDestinations)
    }
  }, [initialDestinations])

  useEffect(() => {
   
    const savedFavorites = localStorage.getItem("favoriteDestinations")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchTerm(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const handleFilterChange = (value: string) => {
    setContinent(value)
    if (onFilterChange) {
      onFilterChange(value)
    }
  }

  const handleFavoriteToggle = (id: number) => {
    let newFavorites: number[]
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id)
    } else {
      newFavorites = [...favorites, id]
    }
    setFavorites(newFavorites)
    localStorage.setItem("favoriteDestinations", JSON.stringify(newFavorites))
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !favorites.includes(id))
    }
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
   
  }

 
  const filteredDestinations = destinations.filter((destination) => {
    const city = destination.city || destination.airport?.city || ""
    const country = destination.country || destination.airport?.country || ""
    const matchesSearch =
      city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesContinent = continent === "all" || destination.region === continent
    return matchesSearch && matchesContinent
  })

 
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 w-full md:w-2/3" />
          <Skeleton className="h-10 w-full md:w-1/3" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search destinations..." className="pl-9" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="flex gap-2">
          <Select value={continent} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Africa">Africa</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="North America">North America</SelectItem>
              <SelectItem value="Oceania">Oceania</SelectItem>
              <SelectItem value="South America">South America</SelectItem>
              <SelectItem value="Middle East">Middle East</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              <SelectItem value="nameAsc">Name: A to Z</SelectItem>
              <SelectItem value="nameDesc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{filteredDestinations.length} destinations found</div>
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-6">
          {filteredDestinations.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden group">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg?height=400&width=600"}
                      alt={`${destination.city || destination.airport?.city}, ${destination.country || destination.airport?.country}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleFavoriteToggle(destination.id)
                      }}
                      className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-800 transition-all hover:bg-white"
                    >
                      {favorites.includes(destination.id) ? (
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      ) : (
                        <HeartOff className="h-5 w-5" />
                      )}
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center gap-1 text-white">
                        <MapPin className="h-4 w-4" />
                        <h3 className="text-xl font-bold">
                          {destination.city || destination.airport?.city}
                        </h3>
                      </div>
                      <p className="text-white/90">{destination.country || destination.airport?.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Flights from</p>
                        <p className="text-lg font-bold">
                          {typeof destination.price === "number" ? `$${destination.price}` : destination.price}
                        </p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/destinations/${destination.id}`}>Explore</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No destinations found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {filteredDestinations.length > 0 ? (
            <div className="space-y-4">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 w-full md:h-auto md:w-1/3">
                      <Image
                        src={destination.image || "/placeholder.svg?height=400&width=600"}
                        alt={`${destination.city || destination.airport?.city}, ${destination.country || destination.airport?.country}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-xl font-bold">
                            {destination.city || destination.airport?.city}, {destination.country || destination.airport?.country}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{destination.description}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Flights from</p>
                          <p className="text-lg font-bold">
                            {typeof destination.price === "number" ? `$${destination.price}` : destination.price}
                          </p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/destinations/${destination.id}`}>Explore</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No destinations found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {filteredDestinations.filter((d) => favorites.includes(d.id)).length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations
                .filter((d) => favorites.includes(d.id))
                .map((destination) => (
                  <Card key={destination.id} className="overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={destination.image || "/placeholder.svg?height=400&width=600"}
                        alt={`${destination.city || destination.airport?.city}, ${destination.country || destination.airport?.country}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleFavoriteToggle(destination.id)
                        }}
                        className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-800 transition-all hover:bg-white"
                      >
                        {favorites.includes(destination.id) ? (
                          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        ) : (
                          <HeartOff className="h-5 w-5" />
                        )}
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center gap-1 text-white">
                          <MapPin className="h-4 w-4" />
                          <h3 className="text-xl font-bold">
                            {destination.city || destination.airport?.city}
                          </h3>
                        </div>
                        <p className="text-white/90">{destination.country || destination.airport?.country}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Flights from</p>
                          <p className="text-lg font-bold">
                            {typeof destination.price === "number" ? `$${destination.price}` : destination.price}
                          </p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/destinations/${destination.id}`}>Explore</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No favorite destinations</h3>
              <p className="mt-2 text-muted-foreground">
                Add destinations to your favorites by clicking the heart icon
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
