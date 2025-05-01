<script setup lang="ts">
import ProductForm from '@/components/products/ProductForm.vue'
import { useProducts } from '@/composables/useProducts'
import { toast } from 'vue-sonner'
import { RentPeriod, type Product, type ProductCreateFormData } from '@/types/product'
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-vue-next'
const props = defineProps<{
  id: number
}>()

const isModalOpen = ref(false)

const { updateProduct, myProductById, fetchMyProductById } = useProducts()

async function handleUpdate(values: ProductCreateFormData) {
  console.log({ values })
  try {
    const response = await updateProduct({ id: props.id, data: { ...values } })
    console.log({ response })
    toast.success('Product updated successfully')
  } catch (error) {
    console.error(error)
    toast.error('Error updating product')
  } finally {
    isModalOpen.value = false
  }
}

const initialValues = ref<ProductCreateFormData>({
  title: '',
  description: '',
  categoryIds: [],
  price: null,
  rentPrice: null,
  rentPeriod: RentPeriod.DAY,
})

watch(myProductById, () => {
  const product = myProductById.value as Product
  initialValues.value = {
    categoryIds: product.categories.map((cat) => cat.id),
    rentPeriod: product.rentPeriod as RentPeriod,
    description: product.description,
    price: product?.price ?? 0,
    rentPrice: product?.rentPrice ?? 0,
    title: product.title,
  }
})
const onOpen = async () => {
  await fetchMyProductById(null, { id: props.id })
  isModalOpen.value = true
}
</script>

<template>
  <Dialog
    :modal="true"
    :open="isModalOpen"
    @update:open="(val: boolean) => (!val ? (isModalOpen = val) : null)"
  >
    <DialogTrigger :as-child="true">
      <Button
        @click.prevent="onOpen"
        type="button"
        class="active:scale-90 cursor-pointer border border-muted-foreground/20"
        size="icon"
        variant="secondary"
        ><Edit />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <template #default>
        <ProductForm
          :title="'Edit Product'"
          :is-edit-mode="true"
          :initial-values="initialValues"
          :on-submit="handleUpdate"
        />
      </template>
    </DialogContent>
  </Dialog>
</template>
