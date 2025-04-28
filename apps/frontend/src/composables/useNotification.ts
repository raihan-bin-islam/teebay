// composables/useNotification.ts
import { useToast } from 'primevue/usetoast'

export function useNotification() {
  const toast = useToast()

  function success(message: string, summary = 'Success') {
    toast.add({ severity: 'success', summary, detail: message, life: 3000 })
  }

  function error(message: string, summary = 'Error') {
    toast.add({ severity: 'error', summary, detail: message, life: 3000 })
  }

  function info(message: string, summary = 'Info') {
    toast.add({ severity: 'info', summary, detail: message, life: 3000 })
  }

  function warn(message: string, summary = 'Warning') {
    toast.add({ severity: 'warn', summary, detail: message, life: 3000 })
  }

  return { success, error, info, warn }
}
