<script setup lang="ts">
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
defineProps<{
  onClick: () => void
}>()

const isModalOpen = ref(false)

const handleOpenChange = (val: boolean) => {
  isModalOpen.value = val
}
const handleClose = () => {
  isModalOpen.value = false
}
</script>
<template>
  <main>
    <Dialog :open="isModalOpen" @update:open="handleOpenChange">
      <DialogTrigger :as-child="true">
        <Button class="active:scale-90 cursor-pointer">Buy</Button>
      </DialogTrigger>
      <DialogContent hideCloseBtn>
        <h2 class="text-xl font-medium">Are you sure you want to buy this product</h2>
        <DialogFooter>
          <Button variant="destructive" @click="handleClose">No</Button>
          <Button @click="onClick">Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </main>
</template>
