import { z } from "zod"

/**
 * Zod schema for validating flight search criteria
 */
export const flightSearchSchema = z.object({
  from: z.string().min(3).max(3),
  to: z.string().min(3).max(3),
  departureDate: z.date(),
  returnDate: z.date().optional().nullable(),
  passengers: z.number().int().min(1).max(9),
  cabinClass: z.enum(["economy", "premium", "business", "first"]),
  directOnly: z.boolean().optional(),
  flexibleDates: z.boolean().optional(),
})


export function validateFlightSearch(data: unknown) {
  return flightSearchSchema.parse(data)
}

