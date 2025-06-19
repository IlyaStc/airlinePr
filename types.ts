export interface User {
  id: number
  name: string
  email: string
  password: string
  bookings?: Booking[]
  role?: string
  firstName?: string
  lastName?: string
  tier: "Gold"
  memberSince: "2020"
  loyaltyPoints: "500"
  pointsToNextTier: "1000"
}

export interface Airport {
  id: number
  name: string
  city: string
  country: string
  iataCode: string
  icaoCode: string
  region: string
}

export interface Destination {
  id: number
  city: string
  country: string
  code: string
  airport?: Airport
  departingFlights?: Flight[]
  arrivingFlights?: Flight[]
  region?: string
  price?: number | string
  popularity?: number
}

export interface Flight {
  stops: number
  airline: "Airline"
  id: number
  flightNumber: string
  from: Destination
  to: Destination
  departureTime: Date | string
  arrivalTime: Date | string
  duration: Date | string
  cabinClass: string
  bookings?: Booking[]
  price?: number | string
  popularity?: number
}

export interface Booking {
  id: number
  bookingReference: string
  user: User
  flight: Flight
  passengers: Passenger[]
  payments: Payment[]
  status: string
}

export interface Passenger {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: Date | string
  passportNumber: string
  bookingId: Booking
  nationality?: string
  specialRequests?: string
}

export interface Payment {
  id: number
  booking: Booking
  amount: number
  method: string
  status: string
  paidAt: Date | string
}


export interface PassengerDetails {
  firstName: string
  lastName: string
  dateOfBirth: Date | string | null
  nationality?: string
  passportNumber?: string
  specialRequests?: string
}

export interface BookingCreateRequest {
  user?: number
  flight: number
  passengers: PassengerDetails[]
  contactEmail: string
  contactPhone: string
  seats: Record<string, string>
  paymentMethod: string
}

export interface SearchFlightsParams {
  from: string
  to: string
  departureDate: Date | string | null
  returnDate: Date | string | null
  passengers: number
  cabinClass: "economy" | "premium" | "business" | "first"
}