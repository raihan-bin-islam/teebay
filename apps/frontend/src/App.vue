<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { Button } from './components/ui/button'
import { useAuth } from './composables/useAuth'
const { isAuthenticated, logout } = useAuth()
</script>

<template>
  <Toaster :rich-colors="true" />

  <main class="w-svw h-svh overflow-hidden flex flex-col">
    <header class="bg-accent p-4">
      <div class="mx-auto max-w-6xl">
        <nav class="flex items-center justify-between mx-auto">
          <div
            :class="{
              'mx-auto pl-40 flex items-center justify-center gap-4 w-fit': true,
              'pl-20': isAuthenticated(),
            }"
          >
            <RouterLink to="/" class="hover:text-sky-600 font-medium">Home</RouterLink>
            <RouterLink to="/products" class="hover:text-sky-600 font-medium">Products</RouterLink>
            <RouterLink to="/transaction-history" class="hover:text-sky-600 font-medium"
              >Transaction History</RouterLink
            >
          </div>
          <div class="flex items-center gap-2.5">
            <Button v-if="!isAuthenticated()" :as-child="true">
              <RouterLink to="/login" class="hover:text-sky-600 font-medium">Login</RouterLink>
            </Button>
            <Button v-if="!isAuthenticated()" :as-child="true">
              <RouterLink to="/register" class="hover:text-sky-600 font-medium"
                >Register</RouterLink
              >
            </Button>
          </div>
          <Button v-if="isAuthenticated()" @click="logout">Logout</Button>
        </nav>
      </div>
    </header>
    <div class="grow max-w-6xl mx-auto w-full">
      <RouterView />
    </div>
  </main>
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
