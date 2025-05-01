<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import DateRangePicker from '../inputs/DateRangePicker.vue'
import { toast } from 'vue-sonner'
import { RentPeriod } from '@/types/product'
import { calculateTotalRent } from '@/lib/utils'

type FormValues = {
  rentalPeriod: {
    start: string | null
    end: string | null
  }
}

const props = defineProps<{
  tenure: RentPeriod
  rentPrice: number
  onSubmitDate: (values: { startDate: string; endDate: string }) => void
}>()

const isModalOpen = ref(false)
const { values, handleSubmit } = useForm<FormValues>({
  initialValues: {
    rentalPeriod: {
      start: null,
      end: null,
    },
  },
})

const rentTotal = computed(() => {
  return calculateTotalRent(
    values.rentalPeriod.start ?? '',
    values.rentalPeriod.end ?? '',
    props.tenure,
    props.rentPrice,
  )
})

const handleOpenChange = (val: boolean) => {
  isModalOpen.value = val
}
const handleClose = () => {
  isModalOpen.value = false
}
const onSubmit = handleSubmit((values) => {
  if (!values.rentalPeriod.start || !values.rentalPeriod.end)
    return toast.error('Please select a rental period')

  props.onSubmitDate({ startDate: values.rentalPeriod.start, endDate: values.rentalPeriod.end })
})
</script>
<template>
  <main>
    <Dialog :open="isModalOpen" @update:open="handleOpenChange">
      <DialogTrigger :as-child="true">
        <Button variant="warning" class="active:scale-90 cursor-pointer">Rent</Button>
      </DialogTrigger>
      <DialogContent hideCloseBtn>
        <DialogHeader>
          <h2 class="text-xl font-medium">Rental Period</h2>
        </DialogHeader>
        <form @submit="onSubmit">
          <DateRangePicker class="w-full" name="rentalPeriod" label="Select rental period" />
          <h2 class="mt-4">
            Total rent for this period (<span class="text-sky-500">${{ rentTotal }}</span
            >)
          </h2>
          <DialogFooter class="mt-10">
            <Button variant="destructive" @click="handleClose">Go Back</Button>
            <Button type="submit">Confirm Rent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </main>
</template>
