<script setup lang="ts">
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
defineProps<{
  name: string
  label: string
  placeholder?: string
  options: { label: string; value: string }[]
}>()
</script>

<template>
  <FormField :key="name" :name="name" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Select v-bind="componentField">
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="placeholder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="opt in options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
