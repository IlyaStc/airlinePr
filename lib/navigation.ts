export const ROUTES = {
  HOME: "/",
  BOOK: "/book",
  BOOK_PERSONALIZED: "/book/personalized",
  SEARCH_RESULTS: "/search-results",
  FLIGHT_DETAILS: (id: string) => `/flight-details/${id}`,
  PASSENGER_DETAILS: "/passenger-details",
  SEAT_SELECTION: "/seat-selection",
  PAYMENT: "/payment",
  BOOKING_CONFIRMATION: "/booking-confirmation",
  MANAGE_BOOKING: "/manage-booking",
  CHECK_IN: "/check-in",
  FLIGHT_STATUS: "/flight-status",
  DESTINATIONS: "/destinations",
  DESTINATION_DETAILS: (id: string) => `/destinations/${id}`,
  PROFILE: "/profile",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  HELP: "/help",
}

export function buildUrl(baseUrl: string, params: Record<string, string | undefined>) {
  const url = new URL(baseUrl, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value)
    }
  })

  return url.pathname + url.search
}
