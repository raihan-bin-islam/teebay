<script setup lang="ts">
import ProductCard from '@/components/cards/ProductCard.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTransaction } from '@/composables/useTransaction'
import { computed, ref, watch } from 'vue'

const tabs = ['bought', 'sold', 'borrowed', 'lent']
const selectedTab = ref(tabs[0])

const { boughtProducts, soldProducts, borrowedProducts, lentProducts } = useTransaction({
  enableQueries: !!selectedTab.value,
})

const products = computed(() =>
  selectedTab.value === tabs[0]
    ? boughtProducts.value
    : selectedTab.value === tabs[1]
      ? soldProducts.value
      : selectedTab.value === tabs[2]
        ? borrowedProducts.value
        : lentProducts.value,
)

const handleChangeTab = (tab: string | number) => {
  selectedTab.value = tab as string
}

watch(products, () => console.log({ products: products }))
</script>

<template>
  <Tabs class="pt-4" :default-value="selectedTab" @update:model-value="handleChangeTab">
    <TabsList class="grid w-full grid-cols-4">
      <TabsTrigger :key="tab" v-for="tab in tabs" :value="tab" class="capitalize">
        {{ tab }}
      </TabsTrigger>
    </TabsList>
    <TabsContent :key="tab" v-for="tab in tabs" :value="tab">
      <ProductCard :key="product?.id" v-for="product in products" :product="product" hideEdit />
    </TabsContent>
  </Tabs>
</template>
