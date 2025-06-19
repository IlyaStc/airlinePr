import { Suspense } from "react"
import { notFound } from "next/navigation"
import { PageContainer } from "@/components/layout/page-container"
import { DestinationDetails } from "@/components/destinations/destination-details"
import { getDestinationDetails } from "@/app/actions/destination-actions"
import { Skeleton } from "@/components/ui/skeleton"

export async function generateMetadata({ params }: { params: { Id: number } }) {
  const { destination, success } = await getDestinationDetails(params.Id)

  if (!success) {
    return {
      title: "Destination Not Found | SkyWings Airlines",
      description: "The destination you're looking for could not be found.",
    }
  }

  return {
    title: `${destination.city}, ${destination.country} | SkyWings Airlines`,
    description: destination.description,
  }
}

export default async function DestinationPage({ params }: { params: { Id: number } }) {
  const { destination, success } = await getDestinationDetails(params.Id)
  if (!success) {
    notFound()
  }

  return (
    <PageContainer>
      <Suspense fallback={<DestinationDetailsSkeleton />}>
        <DestinationDetails destination={destination} />
      </Suspense>
    </PageContainer>
  )
}

function DestinationDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[300px] w-full rounded-xl md:h-[400px]" />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg border">
            <div className="p-4">
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-2 h-4 w-1/2" />
              <Skeleton className="mb-4 h-8 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <div className="p-4">
              <Skeleton className="mb-4 h-6 w-3/4" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
