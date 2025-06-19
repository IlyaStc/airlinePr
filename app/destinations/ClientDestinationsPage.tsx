"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { searchDestinations, toggleFavoriteDestination } from "@/app/actions/destination-actions"
import { PageContainer } from "@/components/layout/page-container"
import { DestinationGrid } from "@/components/destinations/destination-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { Destination } from "@/types"

export default function ClientDestinationsPage({ initialDestinations }: { initialDestinations: Destination[] }) {
  return (
    <PageContainer
      title="Explore Destinations"
      description="Discover amazing destinations around the world with SkyWings Airlines"
    >
      <div className="space-y-8">
        <div className="rounded-lg bg-primary/5 p-6">
          <h2 className="text-2xl font-bold">Find Your Next Adventure</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our selection of popular destinations and find inspiration for your next trip. From bustling cities
            to serene beaches, we have flights to destinations all around the world.
          </p>
        </div>

        <Suspense fallback={<DestinationGridSkeleton />}>
          <ClientDestinationGrid initialDestinations={initialDestinations} />
        </Suspense>
      </div>
    </PageContainer>
  )
}

function DestinationGridSkeleton() {
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

function ClientDestinationGrid({ initialDestinations }: { initialDestinations: Destination[] }) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    const region = searchParams.get("region")

    if (query || region) {
      handleSearch(query || "", region || "all")
    }
  }, [searchParams])

  const handleSearch = async (query: string, region?: string) => {
    setIsLoading(true)
    const { destinations: results, success } = await searchDestinations(query, region)

    if (success) {
      setDestinations(results)
    }

    setIsLoading(false)
  }

  const handleFavoriteToggle = async (id: number, isFavorite: boolean) => {
    await toggleFavoriteDestination(id, isFavorite)
  }

  return (
    <DestinationGrid
      initialDestinations={destinations}
      isLoading={isLoading}
      onSearch={(query) => handleSearch(query)}
      onFilterChange={(region) => handleSearch("", region)}
      onFavoriteToggle={handleFavoriteToggle}
    />
  )
}
