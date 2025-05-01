<script setup lang="ts">
import ProductCard from '@/components/cards/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { ShieldBan } from 'lucide-vue-next'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const { fetchAllProducts, allProducts } = useProducts()
onMounted(async () => await fetchAllProducts())
</script>
<template>
  <main class="py-4">
    <h2 class="text-2xl font-bold">All Products</h2>
    <div v-if="allProducts.length === 0">
      <div class="flex flex-col items-center justify-center py-10">
        <ShieldBan class="size-20 text-muted" />
        <p class="text-2xl font-semibold">No Products Found</p>
      </div>
    </div>
    <div v-if="allProducts.length > 0" class="space-y-3 py-4">
      <div v-for="product in allProducts" :key="product.id" class="w-full relative">
        <RouterLink class="z-50 absolute inset-0 w-full" :to="`/product/${product.id}`" />
        <ProductCard :product="product" hideEdit />
      </div>
    </div>
  </main>
</template>
