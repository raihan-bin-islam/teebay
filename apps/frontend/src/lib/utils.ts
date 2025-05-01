import { RentPeriod } from '@/types/product'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate total rent based on date range and tenure type.
 * @param startDate - Rental start date (string or Date)
 * @param endDate - Rental end date (string or Date)
 * @param tenure - Billing unit: "DAY", "WEEK", or "MONTH"
 * @param rate - Rate per unit (day/week/month)
 * @returns Total rent amount
 */
export const calculateTotalRent = (
  startDate: string | Date,
  endDate: string | Date,
  tenure: RentPeriod,
  rate: number,
): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (end <= start) return 0

  const msInDay = 1000 * 60 * 60 * 24

  const totalDays = (end.getTime() - start.getTime()) / msInDay

  switch (tenure) {
    case RentPeriod.DAY:
      return Math.round(totalDays * rate) || 0

    case RentPeriod.WEEK:
      const totalWeeks = totalDays / 7
      return Math.round(totalWeeks * rate) || 0

    case RentPeriod.MONTH:
      let totalMonths =
        (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

      // Add an extra month if end date goes past the same day of the next month
      if (end.getDate() > start.getDate()) {
        totalMonths += 1
      }

      totalMonths = Math.max(1, totalMonths) // Ensure at least 1 month is counted
      return Math.round(totalMonths * rate) || 0

    default:
      return 0
  }
}
