<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
// import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { useAuth } from '@/composables/useAuth'

import { useForm } from 'vee-validate'
import { loginSchema } from '@/lib/validation/authSchema'

const { handleLogin } = useAuth()
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit((values) => {
  handleLogin(values)
  toast.success(JSON.stringify(values, null, 2))
})
</script>

<template>
  <form class="w-full space-y-6" @submit="onSubmit">
    <FormField v-slot="{ field }" name="email" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your email" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ field }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your password" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit"> Submit </Button>
  </form>
</template>
