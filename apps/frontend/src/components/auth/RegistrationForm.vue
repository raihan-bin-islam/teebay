<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { useForm } from 'vee-validate'
import { registerSchema } from '@/lib/validation/authSchema'
import { useAuth } from '@/composables/useAuth'
import { Textarea } from '@/components/ui/textarea'

const { handleRegister } = useAuth()
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: registerSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  await handleRegister(values)
})
</script>

<template>
  <form class="w-full grid grid-cols-2 gap-4" @submit="onSubmit">
    <FormField v-slot="{ field }" name="firstName" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your first name" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ field }" name="lastName" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your last name" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="col-span-2">
      <FormField v-slot="{ field }" name="address" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter your address" v-bind="field" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ field }" name="phone" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Phone Number</FormLabel>
        <FormControl>
          <Input type="tel" placeholder="Enter your phone number" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
          <Input type="password" placeholder="Enter your password" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ field }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Confirm your password" v-bind="field" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="col-span-2" type="submit"> Submit </Button>
  </form>
</template>
