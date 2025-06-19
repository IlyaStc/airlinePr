import { bookingApi } from "./booking-api-axios"
import { flightApi } from "./flight-api-axios"
import { destinationApi } from "./destination-api-axios"
import { userApi } from "./user-api-axios"

export const api = {
  booking: bookingApi,
  flight: flightApi,
  destination: destinationApi,
  user: userApi,
}
