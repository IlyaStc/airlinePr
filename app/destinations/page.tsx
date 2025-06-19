
import { getAllDestinations } from "@/app/actions/destination-actions"
import ClientDestinationsPage from "./ClientDestinationsPage"

export const metadata = {
  title: "Explore Destinations | SkyWings Airlines",
  description: "Discover amazing destinations around the world with SkyWings Airlines. Find your next adventure today!",
}

export default async function DestinationsPage() {
  const res = await getAllDestinations()
  console.log("Fetched destinations:", res)
  const { destinations = [] } = await getAllDestinations()
  return <ClientDestinationsPage initialDestinations={destinations} />
}
