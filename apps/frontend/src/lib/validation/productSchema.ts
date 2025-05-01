import { RentPeriod } from '@/types/product'
import * as yup from 'yup'

export const createProductSchema = yup.object({
  title: yup.string().required('Title is required'),
  categories: yup.array().min(1, 'Select at least one category'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required').min(0, 'Must be ≥ 0'),
  rentPrice: yup.number().required('Rent price is required').min(0, 'Must be ≥ 0'),
  rentPeriod: yup
    .string<RentPeriod>()
    .oneOf([RentPeriod.DAY, RentPeriod.WEEK, RentPeriod.MONTH], 'Select a rent period')
    .required('Rent period is required'),
})
