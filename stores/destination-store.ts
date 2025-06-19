import { makeObservable, observable, action, computed, runInAction } from "mobx"
import type { Destination } from "@/types"
import type { RootStore } from "./root-store"
import type { DestinationApi } from "@/lib/api/destination-api"

export class DestinationStore {
  destinations: Destination[] = []
  featuredDestinations: Destination[] = []
  currentDestination: Destination | null = null
  favoriteDestinationIds: number[] = []
  searchQuery = ""
  regionFilter = "all"
  sortOption = "popularity"
  isLoading = false
  error: string | null = null

  constructor(
    private rootStore: RootStore,
    private destinationApi: DestinationApi,
  ) {
    makeObservable(this, {
      destinations: observable,
      featuredDestinations: observable,
      currentDestination: observable,
      favoriteDestinationIds: observable,
      searchQuery: observable,
      regionFilter: observable,
      sortOption: observable,
      isLoading: observable,
      error: observable,
      loadDestinations: action,
      getDestinationById: action,
      toggleFavoriteDestination: action,
      setSearchQuery: action,
      setRegionFilter: action,
      setSortOption: action,
      clearCurrentDestination: action,
      filteredDestinations: computed,
      favoriteDestinations: computed,
      uniqueRegions: computed,
    })
  }

  async loadDestinations() {
    this.isLoading = true
    this.error = null
    try {
      const destinations = await this.destinationApi.getAllDestinations()
      runInAction(() => { this.destinations = destinations })
    } catch (error: any) {
      this.error = error?.message || "Failed to load destinations"
    } finally {
      this.isLoading = false
    }
  }

  async getDestinationById(id: number): Promise<Destination | null> {
    this.isLoading = true
    this.error = null
    try {
      const cached = this.destinations.find((d) => d.id === id)
      if (cached) {
        runInAction(() => { this.currentDestination = cached })
        return cached
      }
      const destination = await this.destinationApi.getDestinationById(id)
      runInAction(() => { this.currentDestination = destination })
      return destination
    } catch (error: any) {
      this.error = error?.message || "Failed to load destination"
      return null
    } finally {
      this.isLoading = false
    }
  }

  toggleFavoriteDestination(id: number) {
    if (this.favoriteDestinationIds.includes(id)) {
      this.favoriteDestinationIds = this.favoriteDestinationIds.filter((fId) => fId !== id)
    } else {
      this.favoriteDestinationIds = [...this.favoriteDestinationIds, id]
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("favoriteDestinationIds", JSON.stringify(this.favoriteDestinationIds))
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }

  setRegionFilter(region: string) {
    this.regionFilter = region
  }

  setSortOption(option: string) {
    this.sortOption = option
  }

  clearCurrentDestination() {
    this.currentDestination = null
  }

  get filteredDestinations() {
    let filtered = [...this.destinations]
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.airport?.city.toLowerCase().includes(query) ||
          d.airport?.country.toLowerCase().includes(query)
      )
    }
    if (this.regionFilter !== "all") {
      filtered = filtered.filter((d) => d.region === this.regionFilter)
    }
    switch (this.sortOption) {
      case "price":
        filtered.sort((a, b) => {
         
          const priceA = (a as any).price || 0
          const priceB = (b as any).price || 0
          return priceA - priceB
        })
        break
      case "name":
        filtered.sort((a, b) => (a.airport?.city || "").localeCompare(b.airport?.city || ""))
        break
      case "popularity":
      default:
        filtered.sort((a, b) => ((b as any).popularity || 0) - ((a as any).popularity || 0))
        break
    }
    return filtered
  }

  get favoriteDestinations() {
    return this.destinations.filter((d) => this.favoriteDestinationIds.includes(d.id))
  }

  get uniqueRegions() {
    const regions = this.destinations.map((d) => d.region).filter(Boolean)
    return ["all", ...Array.from(new Set(regions))]
  }
}