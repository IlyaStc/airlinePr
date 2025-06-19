import React, { createContext, useContext } from "react"
import { FlightStore } from "./flight-store"
import { DestinationStore } from "./destination-store"
import { BookingStore } from "./booking-store"
import { UserStore } from "./user-store"
import { api } from "@/lib/api/api-factory"

export class RootStore {
  flightStore: FlightStore
  destinationStore: DestinationStore
  bookingStore: BookingStore
  userStore: UserStore

  constructor() {
    this.flightStore = new FlightStore(this, api.flight)
    this.destinationStore = new DestinationStore(this, api.destination)
    this.bookingStore = new BookingStore(this, api.booking)
    this.userStore = new UserStore(this, api.user)
  }
}

const StoreContext = createContext<RootStore | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = React.useMemo(() => new RootStore(), [])
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error("useStore must be used within a StoreProvider")
  return store
}