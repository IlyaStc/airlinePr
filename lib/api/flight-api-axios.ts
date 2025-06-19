import axios from "./axios-instance"
import type { FlightApi } from "./flight-api"
import type { Flight, Destination, Airport, SearchFlightsParams } from "@/types"

const BASE_URL = "/flight"

export const flightApi: FlightApi = {
  async searchFlights(params: SearchFlightsParams) {
    const res = await axios.get<Flight[]>(`${BASE_URL}/search`, { params })
    return res.data
  },
  async getFlightById(id: number) {
    const res = await axios.get<Flight>(`${BASE_URL}/${id}`)
    return res.data
  },
  async getAllDestinations() {
    const res = await axios.get<Destination[]>("/destinations")
    return res.data
  },
  async getPopularDestinations() {
    const res = await axios.get<Destination[]>("/destinations/popular")
    return res.data
  },
  async getDestinationById(id: number) {
    const res = await axios.get<Destination>(`/destinations/${id}`)
    console.log("Destination data:", res.data)
    return res.data
  },
  async getAirports() {
    const res = await axios.get<Airport[]>("/airports")
    return res.data
  },
}