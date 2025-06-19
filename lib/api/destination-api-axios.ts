import axios from "./axios-instance"
import type { DestinationApi } from "./destination-api"
import type { Destination } from "@/types"

const BASE_URL = "/destinations"

export const destinationApi: DestinationApi = {
  async getAllDestinations() {
    const res = await axios.get<Destination[]>(BASE_URL)
    return res.data
  },
  async getFeaturedDestinations() {
    const res = await axios.get<Destination[]>(`${BASE_URL}/featured`)
    return res.data
  },
  async getDestinationById(id: number) {
    const res = await axios.get<Destination>(`${BASE_URL}/${id}`)
    return res.data
  },
  async searchDestinations(query: string) {
    const res = await axios.get<Destination[]>(`${BASE_URL}/search`, { params: { query } })
    return res.data
  },
}