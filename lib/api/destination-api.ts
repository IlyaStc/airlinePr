import type { Destination } from "@/types"

export interface DestinationApi {
  getAllDestinations(): Promise<Destination[]>
  getFeaturedDestinations(): Promise<Destination[]>
  getDestinationById(id: number): Promise<Destination>
  searchDestinations(query: string): Promise<Destination[]>
}