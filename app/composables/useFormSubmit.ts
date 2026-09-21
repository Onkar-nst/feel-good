import { ref } from 'vue'

/**
 * Shared submit state for the site's forms: one in-flight flag, one success
 * flag, one readable error. `post` sends JSON to a server route and surfaces
 * the server's own message (statusMessage) when it rejects.
 */
export function useFormSubmit(endpoint: string) {
  const sending = ref(false)
  const sent = ref(false)
  const error = ref('')

  async function post(body: Record<string, unknown>) {
    if (sending.value) return false
    sending.value = true
    error.value = ''
    try {
      await $fetch(endpoint, { method: 'POST', body })
      sent.value = true
      return true
    } catch (e) {
      const data = (e as { data?: { statusMessage?: string } })?.data
      error.value = data?.statusMessage || 'Something went wrong. Please try again, or message us on WhatsApp.'
      return false
    } finally {
      sending.value = false
    }
  }

  function reset() {
    sent.value = false
    error.value = ''
  }

  return { sending, sent, error, post, reset }
}
