import { makeObservable, observable, action, computed, runInAction } from "mobx"
import type { Booking, PassengerDetails, BookingCreateRequest } from "@/types"
import type { RootStore } from "./root-store"
import type { BookingApi } from "@/lib/api/booking-api"

export class BookingStore {
  bookings: Booking[] = []
  currentBooking: Booking | null = null
  passengerDetails: PassengerDetails[] = []
  contactDetails = { email: "", phone: "" }
  selectedSeats: Record<string, string> = {}
  paymentMethod: string | null = null
  isLoading = false
  error: string | null = null

  constructor(
    private rootStore: RootStore,
    private bookingApi: BookingApi,
  ) {
    makeObservable(this, {
      bookings: observable,
      currentBooking: observable,
      passengerDetails: observable,
      contactDetails: observable,
      selectedSeats: observable,
      paymentMethod: observable,
      isLoading: observable,
      error: observable,
      getUserBookings: action,
      getBookingByReference: action,
      createBooking: action,
      cancelBooking: action,
      addPassenger: action,
      updatePassenger: action,
      removePassenger: action,
      setContactDetails: action,
      setSeat: action,
      setPaymentMethod: action,
      initializeBooking: action,
      resetBookingData: action,
      clearCurrentBooking: action,
      upcomingBookings: computed,
      pastBookings: computed,
    })
  }

  async getUserBookings(userId?: number): Promise<boolean> {
    const actualUserId = userId ?? this.rootStore.userStore.user?.id
    if (!actualUserId) {
      this.error = "User must be authenticated to view bookings"
      return false
    }
    this.isLoading = true
    this.error = null
    try {
      const bookings = await this.bookingApi.getUserBookings(actualUserId)
      runInAction(() => { this.bookings = bookings })
      return true
    } catch (error: any) {
      runInAction(() => { this.error = error?.message || "Failed to load bookings" })
      return false
    } finally {
      runInAction(() => { this.isLoading = false })
    }
  }

  async getBookingByReference(reference: string, lastName: string): Promise<Booking | null> {
    this.isLoading = true
    this.error = null
    try {
      const booking = await this.bookingApi.getBookingByReference(reference, lastName)
      runInAction(() => { this.currentBooking = booking })
      return booking
    } catch (error: any) {
      runInAction(() => { this.error = error?.message || "Failed to find booking" })
      return null
    } finally {
      runInAction(() => { this.isLoading = false })
    }
  }

  async createBooking() {
    const selectedFlight = this.rootStore.flightStore.selectedFlight
    if (!selectedFlight) {
      this.error = "No flight selected"
      return null
    }
    this.isLoading = true
    this.error = null
    try {
      const bookingData: BookingCreateRequest = {
        flight: selectedFlight.id,
        passengers: this.passengerDetails,
        contactEmail: this.contactDetails.email,
        contactPhone: this.contactDetails.phone,
        seats: this.selectedSeats,
        paymentMethod: this.paymentMethod || "credit_card",
      }
      const booking = await this.bookingApi.createBooking(bookingData)
      runInAction(() => {
        this.currentBooking = booking
        this.bookings = [booking, ...this.bookings]
        this.resetBookingData()
      })
      return booking
    } catch (error: any) {
      runInAction(() => { this.error = error?.message || "Failed to create booking" })
      return null
    } finally {
      runInAction(() => { this.isLoading = false })
    }
  }

  async cencelBooking(bookingId: number): Promise<boolean> {
    this.isLoading = true 
    this.error = null
    try { 
      await this.bookingApi.cancelBooking(bookingId)
      runInAction(() => {
        this.bookings = this.bookings.filter(b => b.id !== bookingId)
        if (this.currentBooking?.id === bookingId) {
          this.currentBooking = null
        }
      })
      return true
    } catch (error: any) {
      runInAction(() => { this.error = error?.message || "Failed to cancel booking" })
      return false  
    } finally {
      runInAction(() => { this.isLoading = false }) 
    }
  }

  async cancelBooking(bookingId: number) {
    this.isLoading = true
    this.error = null
    try {
      await this.bookingApi.cancelBooking(bookingId)
      runInAction(() => {
        this.bookings = this.bookings.map(b => b.id === bookingId ? { ...b, status: "cancelled" } : b)
        if (this.currentBooking?.id === bookingId) {
          this.currentBooking = { ...this.currentBooking, status: "cancelled" }
        }
      })
      return true
    } catch (error: any) {
      runInAction(() => { this.error = error?.message || "Failed to cancel booking" })
      return false
    } finally {
      runInAction(() => { this.isLoading = false })
    }
  }

  addPassenger(passenger: PassengerDetails) {
    this.passengerDetails.push(passenger)
  }

  updatePassenger(index: number, passenger: Partial<PassengerDetails>) {
    if (index >= 0 && index < this.passengerDetails.length) {
      this.passengerDetails[index] = { ...this.passengerDetails[index], ...passenger }
    }
  }

  removePassenger(index: number) {
    if (index >= 0 && index < this.passengerDetails.length) {
      this.passengerDetails.splice(index, 1)
    }
  }

  setContactDetails(email: string, phone: string) {
    this.contactDetails = { email, phone }
  }

  setSeat(passengerId: string, seatNumber: string) {
    this.selectedSeats[passengerId] = seatNumber
  }

  setPaymentMethod(method: string) {
    this.paymentMethod = method
  }

  initializeBooking(passengerCount: number) {
    this.resetBookingData()
    this.passengerDetails = Array(passengerCount).fill(null).map(() => ({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      nationality: "",
      passportNumber: "",
      specialRequests: "",
    }))
    if (this.rootStore.userStore.isAuthenticated && this.rootStore.userStore.user) {
      const user = this.rootStore.userStore.user
      this.contactDetails.email = user.email
      if (passengerCount === 1 && user.firstName && user.lastName) {
        this.passengerDetails[0] = { ...this.passengerDetails[0], firstName: user.firstName, lastName: user.lastName }
      }
    }
  }

  resetBookingData() {
    this.passengerDetails = []
    this.contactDetails = { email: "", phone: "" }
    this.selectedSeats = {}
    this.paymentMethod = null
    this.error = null
  }

  clearCurrentBooking() {
    this.currentBooking = null
    this.error = null
  }

  get upcomingBookings() {
    const now = new Date()
    return this.bookings.filter(b => new Date(b.flight.departureTime.toString()) > now)
  }   

  get pastBookings() {
    const now = new Date()
    return this.bookings.filter(b => new Date(b.flight.departureTime.toString()) <= now)
  }
}