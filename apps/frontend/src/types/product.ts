import type { User } from '@/types/user'
import type { GenericObject } from 'vee-validate'

// Enum for Product Status
export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
}
export enum RentPeriod {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}
// Category Type
export type Category = {
  id: number
  name: string
  products: Product[]
}

// Product Type
export type Product = {
  id: number
  title: string
  description: string
  price: number
  rentPrice?: number
  rentPeriod?: RentPeriod
  status: ProductStatus
  owner: User
  ownerId: number
  categories: Category[]
  transactions: Transaction[]
  rentals: Rental[]
  views?: number
}

// Transaction Type
export type Transaction = {
  id: number
  product: Product
  productId: number
  buyer: User
  buyerId: number
  seller: User
  sellerId: number
  createdAt: string
}

// Rental Type
export type Rental = {
  id: number
  product: Product
  productId: number
  renter: User
  renterId: number
  owner: User
  ownerId: number
  startDate: string
  endDate: string
  createdAt: string
}

export type ProductCreateFormData = GenericObject & {
  title: string
  description: string
  price: number | null
  rentPrice?: number | null
  rentPeriod?: string
  categoryIds: number[]
}
export type ProductUpdateInput = Partial<ProductCreateFormData>
export type RentalCreateInput = {
  productId: number
  startDate: string
  endDate: string
}
