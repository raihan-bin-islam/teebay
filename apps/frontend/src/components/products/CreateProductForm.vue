<script setup lang="ts">
import ProductForm from '@/components/products/ProductForm.vue'
import { useProducts } from '@/composables/useProducts'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import type { ProductCreateFormData, RentPeriod } from '@/types/product'

const { createProduct } = useProducts()
const router = useRouter()

async function handleCreate(values: ProductCreateFormData) {
  try {
    await createProduct(values)
    toast.success('Product created successfully')
    router.push('/')
  } catch (error) {
    console.error(error)
    toast.error('Failed to create product')
  }
}

const initialValues = {
  title: '',
  description: '',
  categoryIds: [],
  price: null,
  rentPrice: null,
  rentPeriod: 'day' as RentPeriod,
}
</script>

<template>
  <ProductForm :initial-values="initialValues" :on-submit="handleCreate" />
</template>
