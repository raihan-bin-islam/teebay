<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

defineProps<{
  name: string
  label: string
  type?: string
  placeholder?: string
}>()
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          v-bind="componentField"
          :type="type || 'text'"
          :placeholder="placeholder"
          class="w-full"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
