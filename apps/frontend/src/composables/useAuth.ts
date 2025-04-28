// composables/useAuth.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { useNotification } from './useNotification'
import { LOGIN_MUTATION, REGISTER_MUTATION } from '@/graphql/mutations/authMutations'

const tokenKey = 'auth-token'

const token = ref<string | null>(localStorage.getItem(tokenKey))

export function useAuth() {
  const router = useRouter()
  const { success, error } = useNotification()

  const { mutate: loginMutation, loading: loginLoading } = useMutation(LOGIN_MUTATION)
  const { mutate: registerMutation, loading: registerLoading } = useMutation(REGISTER_MUTATION)

  async function handleLogin(values: { email: string; password: string }) {
    try {
      const response = await loginMutation({
        email: values.email,
        password: values.password,
      })

      if (response?.data?.login) {
        const newToken = response.data.login.token
        token.value = newToken
        localStorage.setItem(tokenKey, newToken)

        success('Logged in successfully!')
        router.push('/')
      }
    } catch (err: unknown) {
      console.error(err)
      error('Login failed. Please check your credentials.')
    }
  }

  async function handleRegister(values: { email: string; password: string }) {
    try {
      const response = await registerMutation({
        email: values.email,
        password: values.password,
      })

      if (response?.data?.register) {
        const newToken = response.data.register.token
        token.value = newToken
        localStorage.setItem(tokenKey, newToken)

        success('Registration successful!')
        router.push('/')
      }
    } catch (err: unknown) {
      console.error(err)
      error('Registration failed. Please try again.')
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem(tokenKey)
    router.push('/login')
  }

  function isAuthenticated() {
    return !!token.value
  }

  function getToken() {
    return token.value
  }

  return {
    token,
    logout,
    isAuthenticated,
    getToken,
    handleLogin,
    handleRegister,
    loginLoading,
    registerLoading,
  }
}
