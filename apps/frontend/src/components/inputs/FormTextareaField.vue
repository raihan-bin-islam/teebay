<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

defineProps<{
  name: string
  label: string
  placeholder?: string
}>()
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Textarea v-bind="componentField" :placeholder="placeholder" class="resize-none" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
