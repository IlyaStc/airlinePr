import { makeObservable, observable, action, computed, runInAction } from "mobx"
import type { Flight, Destination, Airport, SearchFlightsParams } from "@/types"
import type { RootStore } from "./root-store"
import type { FlightApi } from "@/lib/api/flight-api"

export class FlightStore {
  flights: Flight[] = []
  selectedFlight: Flight | null = null
  popularDestinations: Destination[] = []
  allDestinations: Destination[] = []
  airports: Airport[] = []
  searchCriteria: SearchFlightsParams = {
    from: "",
    to: "",
    departureDate: null,
    returnDate: null,
    passengers: 1,
    cabinClass: "economy",
  }
  isSearching = false
  isLoadingDestinations = false
  isLoadingAirports = false
  searchError: string | null = null

  constructor(
    private rootStore: RootStore,
    private flightApi: FlightApi,
  ) {
    makeObservable(this, {
      flights: observable,
      selectedFlight: observable,
      popularDestinations: observable,
      allDestinations: observable,
      airports: observable,
      searchCriteria: observable,
      isSearching: observable,
      isLoadingDestinations: observable,
      isLoadingAirports: observable,
      searchError: observable,
      searchFlights: action,
      loadPopularDestinations: action,
      loadAllDestinations: action,
      loadAirports: action,
      getFlightById: action,
      setSearchCriteria: action,
      clearSelectedFlight: action,
      filteredFlights: computed,
      setDepartureLocation: action,
      setArrivalLocation: action,
      setDepartureDate: action,
      setReturnDate: action,
      setPassengers: action,
      setCabinClass: action,
    })
  }

  async searchFlights() {
    this.isSearching = true
    this.searchError = null
    try {
      const flights = await this.flightApi.searchFlights(this.searchCriteria)
      console.log("Search Flights Results:", flights)
      runInAction(() => { this.flights = flights })
    } catch (error: any) {
      runInAction(() => { this.searchError = error?.message || "Failed to search flights" })
    } finally {
      runInAction(() => { this.isSearching = false })
    }
  }

  async loadPopularDestinations() {
    this.isLoadingDestinations = true
    try {
      const destinations = await this.flightApi.getPopularDestinations()
      runInAction(() => { this.popularDestinations = destinations })
    } finally {
      runInAction(() => { this.isLoadingDestinations = false })
    }
  }

  async loadAllDestinations() {
    this.isLoadingDestinations = true
    try {
      const destinations = await this.flightApi.getAllDestinations()
      runInAction(() => { this.allDestinations = destinations })
    } finally {
      runInAction(() => { this.isLoadingDestinations = false })
    }
  }

  async loadAirports() {
    this.isLoadingAirports = true
    try {
      const airports = await this.flightApi.getAirports()
      runInAction(() => { this.airports = airports })
    } finally {
      runInAction(() => { this.isLoadingAirports = false })
    }
  }

  async getFlightById(id: number) {
    this.isSearching = true
    this.searchError = null
    try {
      const flight = await this.flightApi.getFlightById(id)
      console.log("Flight Details:", flight)
      runInAction(() => { this.selectedFlight = flight })
    } catch (error: any) {
      runInAction(() => { this.searchError = error?.message || "Failed to load flight" })
    } finally {
      runInAction(() => { this.isSearching = false })
    }
  }

  setSearchCriteria(criteria: Partial<SearchFlightsParams>) {
    this.searchCriteria = { ...this.searchCriteria, ...criteria }
  }

  clearSelectedFlight() {
    this.selectedFlight = null
    this.searchError = null
  }

  setDepartureLocation(location: string) {
    this.searchCriteria.from = location
  }

  setArrivalLocation(location: string) {
    this.searchCriteria.to = location
  }

  setDepartureDate(date: Date | null) {
    this.searchCriteria.departureDate = date
  }

  setReturnDate(date: Date | null) {
    this.searchCriteria.returnDate = date
  }

  setPassengers(count: number) {
    this.searchCriteria.passengers = count
  }

  setCabinClass(cabinClass: string) {
    this.searchCriteria.cabinClass = cabinClass
  }

  get filteredFlights() {
    return this.flights.filter(f =>
      (!this.searchCriteria.from || f.from.code === this.searchCriteria.from) &&
      (!this.searchCriteria.to || f.to.code === this.searchCriteria.to)
    )
  }
}