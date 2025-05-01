import { tokenKey } from '@/data/config'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/product/MyProducts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/product/AllProducts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/product/:id',
      name: 'productById',
      component: () => import('../views/product/SingleProduct.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/transaction-history',
      name: 'transactionHistory',
      component: () => import('../views/history/TransactionHistory.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/product/create',
      name: 'productCreate',
      component: () => import('../views/product/CreateProduct.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem(tokenKey)

  console.log({ isAuthenticated })

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
