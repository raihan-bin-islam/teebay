<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <Card class="min-w-xl max-w-xl">
      <CardHeader class="text-center text-2xl font-bold">SIGN IN</CardHeader>
      <CardContent>
        <LoginForm />
        <div class="mt-4 mx-auto w-fit">
          <span>
            Do you have an account?
            <RouterLink to="/register">
              <a class="text-blue-500 hover:underline">Signup</a>
            </RouterLink>
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
