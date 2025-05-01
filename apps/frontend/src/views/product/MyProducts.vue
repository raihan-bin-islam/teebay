<script setup lang="ts">
import ProductCard from '@/components/cards/ProductCard.vue'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/composables/useProducts'
import { ShieldBan } from 'lucide-vue-next'
import { onMounted } from 'vue'
const { myProducts, fetchMyProducts, deleteProduct } = useProducts()
const handleDeleteProduct = async (productId: number) => {
  await deleteProduct({ id: productId })
}
onMounted(async () => await fetchMyProducts())
</script>
<template>
  <main class="space-y-4">
    <div v-if="myProducts.length === 0">
      <div class="flex flex-col items-center justify-center py-10">
        <ShieldBan class="size-20 text-muted" />
        <p class="text-2xl font-semibold">No Products Found</p>
      </div>
    </div>
    <div class="space-y-2 pt-10 overflow-y-auto" v-if="myProducts.length > 0">
      <h2 class="text-2xl font-bold underline">My Products</h2>
      <div class="grid grid-cols-1 gap-4">
        <ProductCard
          v-bind:key="product.id"
          v-for="product in myProducts"
          @delete="handleDeleteProduct"
          :product="product"
        />
      </div>
    </div>

    <div
      :class="{ 'mx-auto w-fit': myProducts.length === 0, 'ml-auto w-fit': myProducts.length > 0 }"
    >
      <Button size="lg" :as-child="true">
        <a href="/product/create">Create Product</a>
      </Button>
    </div>
  </main>
</template>
