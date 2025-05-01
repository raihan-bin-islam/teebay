import { ref, computed } from 'vue'
import { useForm, type GenericObject, type Path } from 'vee-validate'
import type { ObjectSchema } from 'yup'

export interface MultiStepFormOptions<TValues extends Record<string, unknown>> {
  steps: Array<keyof TValues>
  validationSchema: ObjectSchema<GenericObject>
  initialValues: TValues
}

export function useMultiStepForm<TValues extends Record<string, unknown>>(
  options: MultiStepFormOptions<TValues>,
) {
  const { steps, validationSchema, initialValues } = options

  const currentStepIndex = ref(0)
  const maxStepIndex = steps.length - 1

  // Store validation status for each step
  const stepsValidation = ref<Record<string, boolean>>(
    steps.reduce(
      (acc, step) => {
        acc[String(step)] = false
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const form = useForm<TValues>({
    validationSchema,
    initialValues: initialValues as never,
    validateOnMount: false,
    keepValuesOnUnmount: true,
  })

  const currentStep = computed(() => steps[currentStepIndex.value])
  const isLastStep = computed(() => currentStepIndex.value === maxStepIndex)

  /** validate the current field, then advance if valid */
  async function nextStep() {
    const key = String(currentStep.value) as Path<TValues>
    const result = await form.validateField(key)

    if (!result.errors.length && currentStepIndex.value < maxStepIndex) {
      // Mark this step as validated
      stepsValidation.value[key] = true
      currentStepIndex.value++
    }
  }

  /** go back one step without validation */
  function prevStep() {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value--
    }
  }

  /** Go to a specific step if it's within range */
  function goToStep(index: number) {
    if (index >= 0 && index <= maxStepIndex) {
      currentStepIndex.value = index
    }
  }

  /** Check if a step is completed */
  function isStepCompleted(step: keyof TValues) {
    return stepsValidation.value[String(step)]
  }

  return {
    form,
    steps,
    currentStep,
    currentStepIndex,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    isStepCompleted,
  }
}
