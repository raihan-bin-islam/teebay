import type { Product, Rental, Transaction } from '@/types/product'

// User Type
export type User = {
  id: number
  firstName: string
  lastName: string
  address?: string
  phone?: string
  email: string
  password: string
  products: Product[]
  boughtProducts: Transaction[] // Deprecated
  soldProducts: Transaction[] // Deprecated
  rentedProducts: Rental[] // Deprecated
  lentProducts: Rental[] // Deprecated
  transactions: Transaction[]
  rentals: Rental[]
}
