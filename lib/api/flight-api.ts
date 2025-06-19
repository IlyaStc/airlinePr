import type { Flight, Destination, Airport, SearchFlightsParams } from "@/types"

export interface FlightApi {
  searchFlights(params: SearchFlightsParams): Promise<Flight[]>
  getFlightById(id: number): Promise<Flight>
  getAllDestinations(): Promise<Destination[]>
  getPopularDestinations(): Promise<Destination[]>
  getDestinationById(id: number): Promise<Destination>
  getAirports(): Promise<Airport[]>
}