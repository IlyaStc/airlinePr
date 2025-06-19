import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, addDays, differenceInMinutes } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, formatString = "PPP") {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, formatString)
}

export function formatTime(date: Date | string, formatString = "h:mm a") {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, formatString)
}

export function formatDateTime(date: Date | string, formatString = "PPP p") {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, formatString)
}

export function addDaysToDate(date: Date | string, days: number) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return addDays(dateObj, days)
}

export function calculateDuration(start: Date | string, end: Date | string) {
  const startDate = typeof start === "string" ? new Date(start) : start
  const endDate = typeof end === "string" ? new Date(end) : end

  const minutes = differenceInMinutes(endDate, startDate)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}

export function buildUrl(baseUrl: string, params: Record<string, string | undefined>) {
  const url = new URL(baseUrl, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value)
    }
  })

  return url.toString()
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string) {
  return password.length >= 6
}

export function validateFlightSearch(criteria: any) {
  const errors: Record<string, string> = {}

  if (!criteria.from) {
    errors.from = "Departure location is required"
  }

  if (!criteria.to) {
    errors.to = "Arrival location is required"
  }

  if (criteria.from === criteria.to) {
    errors.to = "Departure and arrival locations cannot be the same"
  }

  if (!criteria.departureDate) {
    errors.departureDate = "Departure date is required"
  }

  if (Object.keys(errors).length > 0) {
    const error = new Error("Validation failed")
    ;(error as any).errors = errors
    throw error
  }
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error)
    return defaultValue
  }
}

export function setToStorage(key: string, value: any) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error)
  }
}

export function removeFromStorage(key: string) {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error)
  }
}
