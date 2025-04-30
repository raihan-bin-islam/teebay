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
      </CardContent>
    </Card>
  </div>
</template>
