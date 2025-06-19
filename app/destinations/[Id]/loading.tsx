import { DestinationDetailsSkeleton } from "@/components/destinations/destination-details-skeleton"
import { PageContainer } from "@/components/layout/page-container"

export default function DestinationLoading() {
  return (
    <PageContainer>
      <DestinationDetailsSkeleton />
    </PageContainer>
  )
}
