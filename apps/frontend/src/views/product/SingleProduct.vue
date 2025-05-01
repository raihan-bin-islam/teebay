<script setup lang="ts">
import ProductCard from '@/components/cards/ProductCard.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useProducts } from '@/composables/useProducts'
import { useTransaction } from '@/composables/useTransaction'
import type { Product } from '@/types/product'
import type { RentPayload } from '@/types/transaction'
import { computed, onMounted, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = Number(route.params.id)
const product: ComputedRef<Product> = computed(() => {
  return productById.value as Product
})
const { fetchProductById, productById, isLoadingProductById } = useProducts()
const { buyProduct, rentProduct } = useTransaction()

const handleClickBuy = async (productId: number) => {
  await buyProduct({ productId })
}
const handleClickRent = async (data: RentPayload) => {
  await rentProduct({ data })
}
onMounted(async () => await fetchProductById(null, { id: productId }))
</script>
<template>
  <main class="py-4">
    <Skeleton v-if="isLoadingProductById" class="h-40" />
    <ProductCard
      v-if="!isLoadingProductById"
      :product="product"
      hideEdit
      @click-buy="handleClickBuy"
      @click-rent="handleClickRent"
    />
  </main>
</template>
