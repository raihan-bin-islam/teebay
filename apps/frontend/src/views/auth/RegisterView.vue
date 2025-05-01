<script setup lang="ts">
import RegistrationForm from '@/components/auth/RegistrationForm.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <Card class="min-w-xl max-w-xl">
      <CardHeader class="text-center text-2xl font-bold">SIGN UP</CardHeader>
      <CardContent>
        <RegistrationForm />
        <div class="mt-4 mx-auto w-fit">
          <span>
            Already have an account?
            <RouterLink to="/login">
              <a class="text-blue-500 hover:underline">Sign In</a>
            </RouterLink>
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
