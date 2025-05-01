<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

import { useMultiStepForm } from '@/composables/useMultiStepForm'
import { useCategories } from '@/composables/useCategories'
import { createProductSchema } from '@/lib/validation/productSchema'
import { RentPeriod, type ProductCreateFormData } from '@/types/product'
import FormInputField from '@/components/inputs/FormInputField.vue'
import FormSelectField from '@/components/inputs/FormSelectField.vue'
import FormTextareaField from '@/components/inputs/FormTextareaField.vue'
import CategoryPicker from '@/components/inputs/CategoryPicker.vue'

const props = defineProps<{
  initialValues: ProductCreateFormData
  onSubmit: (values: typeof props.initialValues) => Promise<void>
  title?: string
  isEditMode?: boolean
}>()

const { categories: categoryOptions } = useCategories()
const rentPeriodOptions = Object.values(RentPeriod)

const { form, steps, currentStep, currentStepIndex, isLastStep, nextStep, prevStep } =
  useMultiStepForm({
    steps: ['title', 'categoryIds', 'description', 'price'] as const,
    validationSchema: createProductSchema,
    initialValues: props.initialValues,
  })

const handleSubmit = form.handleSubmit(async (values) => {
  await props.onSubmit(values as ProductCreateFormData)
})
</script>

<template>
  <Card
    :class="{
      'w-full shadow max-w-2xl': true,
      'm-0 p-0 shadow-none border-none': isEditMode,
      'mx-auto mt-10 p-6 bg-white rounded-lg': !isEditMode,
    }"
  >
    <CardHeader>
      <h2 class="text-2xl font-semibold">
        {{ title || `Product Form — Step ${currentStepIndex + 1} of ${steps.length}` }}
      </h2>
    </CardHeader>

    <form @submit.prevent="handleSubmit">
      <CardContent class="space-y-6">
        <!-- Step 1: Title -->
        <div
          :class="{
            block: currentStep === 'title' || !isEditMode,
            hidden: currentStep !== 'title' && !isEditMode,
          }"
        >
          <FormInputField name="title" label="Product Title" placeholder="Enter product title" />
        </div>

        <!-- Step 2: Categories -->
        <div
          :class="{
            block: currentStep === 'categoryIds' || !isEditMode,
            hidden: currentStep !== 'categoryIds' && !isEditMode,
          }"
        >
          <FormField name="categoryIds" v-slot="{ value, handleChange }">
            <FormItem>
              <FormLabel>Select Categories</FormLabel>
              <FormControl>
                <CategoryPicker
                  :categories="categoryOptions"
                  :selected="value"
                  @update:selected="handleChange"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <!-- Step 3: Description -->
        <div
          :class="{
            block: currentStep === 'description' || !isEditMode,
            hidden: currentStep !== 'description' && !isEditMode,
          }"
        >
          <FormTextareaField
            name="description"
            label="Product Description"
            placeholder="Enter description..."
          />
        </div>

        <!-- Step 4: Pricing -->
        <div v-if="currentStep === 'price' || isEditMode" class="space-y-4">
          <FormInputField type="number" name="price" label="Price" placeholder="Enter price" />
          <FormInputField
            type="number"
            name="rentPrice"
            label="Rent Price"
            placeholder="Enter rent price"
          />
          <FormSelectField
            name="rentPeriod"
            label="Rent Period"
            placeholder="Select rent period"
            :options="
              rentPeriodOptions.map((period) => ({
                label: period as string,
                value: period as string,
              }))
            "
          />
        </div>
      </CardContent>

      <CardFooter class="flex justify-between mt-8">
        <Button
          v-if="!props.isEditMode"
          variant="outline"
          type="button"
          :disabled="currentStepIndex === 0"
          @click="prevStep"
        >
          Back
        </Button>

        <template v-if="!isLastStep && !props.isEditMode">
          <Button type="button" @click="nextStep">Next</Button>
        </template>
        <template v-else>
          <Button type="submit">{{ isEditMode ? 'Update' : 'Submit' }}</Button>
        </template>
      </CardFooter>
    </form>
  </Card>
</template>
