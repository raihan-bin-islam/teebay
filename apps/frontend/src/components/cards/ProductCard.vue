<script setup lang="ts">
import EditProductModal from '@/components/products/EditProductModal.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Product } from '@/types/product'
import { Trash2 } from 'lucide-vue-next'
import BuyProductModal from '../products/BuyProductModal.vue'
import RentProductModal from '../products/RentProductModal.vue'
import type { RentPayload } from '@/types/transaction'

const {
  product,
  onClickBuy,
  onClickRent,
  onDelete,
  hideEdit = false,
} = defineProps<{
  product: Product
  hideEdit?: boolean
  onDelete?: (id: number) => void
  onClickBuy?: (id: number) => void
  onClickRent?: (data: RentPayload) => void
}>()
</script>

<template>
  <Card class="shadow-none py-4 bg-muted/50 h-full">
    <CardContent class="relative space-y-4 py-1 h-full">
      <div class="absolute top-0 right-4 flex items-center gap-2">
        <EditProductModal v-if="!hideEdit" :id="product.id" />
        <Button
          v-if="typeof onDelete === 'function'"
          @click="onDelete(product.id)"
          class="active:scale-90 cursor-pointer"
          size="icon"
          variant="destructive"
          ><Trash2 />
        </Button>
      </div>
      <div class="space-x-2">
        <Badge v-bind:key="category.id" v-for="category in product.categories">{{
          category.name
        }}</Badge>
      </div>
      <div>
        <h4 class="text-xl mb-1 font-semibold">
          {{ product.title }}
        </h4>
        <p class="text-muted-foreground max-w-5xl line-clamp-3">
          {{ product.description }}
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6 mt-4 text-lg">
            <p>
              Price: <span class="text-primary">${{ product.price }}</span>
            </p>
            <p class="capitalize">
              Rent:
              <span class="text-primary">${{ product.rentPrice }} </span>
              Per {{ product.rentPeriod?.toLowerCase() }}
            </p>
          </div>
          <p>Views {{ product.views }}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter v-if="typeof onClickBuy === 'function' || typeof onClickRent === 'function'">
      <div class="ml-auto flex items-center gap-4">
        <RentProductModal
          v-if="product.rentPrice && product.rentPeriod"
          :tenure="product.rentPeriod"
          :rent-price="product.rentPrice"
          @submit-date="
            ({ startDate, endDate }) => onClickRent?.({ productId: product.id, startDate, endDate })
          "
        />
        <BuyProductModal @click="() => onClickBuy?.(product.id)" />
      </div>
    </CardFooter>
  </Card>
</template>
