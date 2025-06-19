"use server"

import { api } from "@/lib/api/api-factory"
import type { Destination } from "@/types"

export async function getAllDestinations() {
  try {
    const destinations = await api.destination.getAllDestinations()
    console.log("Fetched destinations:", destinations)
    return { destinations, success: true }
  } catch (error) {
    return { destinations: [], success: false, error }
  }
}

export async function getDestinationDetails(id: number | string) {
  try {
    console.log("Fetching destination details for ID:", id)
    const destination = await api.destination.getDestinationById(Number(id))
    return { destination, success: true }
  } catch (error) {
    return { destination: null, success: false }
  }
}

export async function searchDestinations(query: string = "", region?: string) {
  try {
    let destinations: Destination[] = []
    if (query) {
      destinations = await api.destination.searchDestinations(query)
    } else {
      destinations = await api.destination.getAllDestinations()
    }
    if (region && region !== "all") {
      destinations = destinations.filter((d) => d.region === region)
    }
    return { destinations, success: true }
  } catch (error) {
    return { destinations: [], success: false }
  }
}

export async function toggleFavoriteDestination(id: number, isFavorite: boolean) {
  if (typeof window !== "undefined") {
    const key = "favoriteDestinationIds"
    const saved = localStorage.getItem(key)
    let favorites: number[] = saved ? JSON.parse(saved) : []
    if (isFavorite) {
      if (!favorites.includes(id)) favorites.push(id)
    } else {
      favorites = favorites.filter((favId) => favId !== id)
    }
    localStorage.setItem(key, JSON.stringify(favorites))
  }
}