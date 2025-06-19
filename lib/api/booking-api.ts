import type { Booking, BookingCreateRequest } from "@/types"

export interface BookingApi {
  getUserBookings(userId: number): Promise<Booking[]>
  getBookingByReference(reference: string, lastName: string): Promise<Booking>
  createBooking(data: BookingCreateRequest): Promise<Booking>
  cancelBooking(bookingId: number): Promise<void>
  checkIn(
    bookingReference: string
  ): Promise<any>
}