<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { Category } from '@/types/product'

const props = defineProps<{
  categories: Category[]
  selected: number[]
}>()

const emit = defineEmits(['update:selected'])

function toggleCategory(cat: number) {
  const newSelected = [...props.selected]
  const index = newSelected.indexOf(cat)
  if (index > -1) newSelected.splice(index, 1)
  else newSelected.push(cat)
  emit('update:selected', newSelected)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button
      v-for="cat in categories"
      :key="cat.id"
      size="sm"
      :variant="selected.includes(cat.id) ? 'default' : 'outline'"
      @click.prevent="toggleCategory(cat.id)"
    >
      {{ cat.name }}
    </Button>
  </div>
</template>
