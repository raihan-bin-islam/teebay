<script setup lang="ts">
import { defineProps } from 'vue'
import { useField } from 'vee-validate'
import { computed } from 'vue'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { CalendarIcon } from 'lucide-vue-next'
import type { DateRange } from 'reka-ui'

// Props: name must match your form schema, plus optional labels & limits
const props = defineProps<{
  name: string
  label?: string
  description?: string
  placeholder?: string
  numberOfMonths?: number
  min?: CalendarDate
  max?: CalendarDate
}>()

// Formatter for display
const df = new DateFormatter('en-US', { dateStyle: 'medium' })

const { value: raw } = useField<{ start: string; end: string }>(props.name)

const range = computed<DateRange | null>({
  get: () => {
    if (raw.value?.start && raw.value?.end) {
      return {
        start: parseDate(raw.value.start),
        end: parseDate(raw.value.end),
      }
    }
    return null
  },
  set: (val) => {
    if (val) {
      raw.value = {
        start: val?.start?.toString() ?? '',
        end: val?.end?.toString() ?? '',
      }
    } else {
      raw.value = { start: '', end: '' }
    }
  },
})
</script>

<template>
  <FormField :name="props.name">
    <FormItem class="flex flex-col">
      <FormLabel>{{ props.label || 'Select date range' }}</FormLabel>

      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="outline"
              class="justify-start text-left font-normal"
              :class="{ 'text-muted-foreground': !range }"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              <span class="flex-1">
                <template v-if="range?.start">
                  <template v-if="range?.end">
                    {{ df.format(range.start.toDate(getLocalTimeZone())) }}
                    –
                    {{ df.format(range.end.toDate(getLocalTimeZone())) }}
                  </template>
                  <template v-else>
                    {{ df.format(range.start.toDate(getLocalTimeZone())) }}
                  </template>
                </template>
                <template v-else>
                  {{ props.placeholder || 'Pick a date range' }}
                </template>
              </span>
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0 max-w-full">
          <RangeCalendar
            class="w-full max-w-full"
            v-model="range"
            initial-focus
            :number-of-months="props.numberOfMonths || 2"
            :min-value="props.min || new CalendarDate(1900, 1, 1)"
            :max-value="props.max || today(getLocalTimeZone()).add({ years: 10 })"
          />
        </PopoverContent>
      </Popover>

      <FormDescription v-if="props.description">
        {{ props.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
