<script setup lang="ts">
import RegistrationForm from '@/components/auth/RegistrationForm.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <Card class="min-w-xl max-w-xl">
      <CardHeader class="text-center text-2xl font-bold">REGISTER</CardHeader>
      <CardContent>
        <RegistrationForm />
      </CardContent>
    </Card>
  </div>
</template>
