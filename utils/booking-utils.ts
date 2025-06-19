/**
 * Generates a unique booking reference code
 * Format: 2 letters followed by 4 numbers (e.g., AB1234)
 */
export function generateBookingReference(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const prefix =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length))

  const numbers = Math.floor(1000 + Math.random() * 9000)

  return `${prefix}${numbers}`
}

/**
 * Calculates the price difference for a flight change
 */
export function calculateChangeFee(
  originalPrice: number,
  newPrice: number,
  daysBeforeDeparture: number,
): { changeFee: number; priceDifference: number; totalCost: number } {
 
  let changeFee = 50

 
  if (daysBeforeDeparture < 7) {
    changeFee = 100
  } else if (daysBeforeDeparture < 14) {
    changeFee = 75
  }

 
  const priceDifference = Math.max(0, newPrice - originalPrice)

 
  const totalCost = changeFee + priceDifference

  return { changeFee, priceDifference, totalCost }
}
