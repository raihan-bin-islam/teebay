import type { User } from '@/types/user'

export type AuthFormData = {
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
  password: string
}
export type AuthPayload = {
  token: string
  user: User
}
