import axios from "./axios-instance"
import type { BookingApi } from "./booking-api"
import type { Booking, BookingCreateRequest } from "@/types"

const BASE_URL = "/booking"

export const bookingApi: BookingApi = {
  async getUserBookings(userId: number) {
    const res = await axios.get<Booking[]>(`${BASE_URL}/user/${userId}`)
    return res.data
  },
  async getBookingByReference(reference: string, lastName: string) {
    const res = await axios.get<Booking>(`${BASE_URL}/reference`, {
      params: { reference, lastName },
    })
    return res.data
  },
  async createBooking(data: BookingCreateRequest) {
    console.log("Creating booking with data:", data)
    const res = await axios.post<Booking>(BASE_URL, data)
    return res.data
  },
  async cancelBooking(bookingId: number) {
    await axios.post(`${BASE_URL}/${bookingId}/cancel`)
  },
  async checkIn(
    bookingReference: string,
  ) {
    const res = await axios.post<Booking>(`${BASE_URL}/checkin`, { bookingReference })
    return res.data
  },

}