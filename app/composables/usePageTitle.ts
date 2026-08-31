import { useHead } from '#unhead/composables'

export const usePageTitle = (pageTitle: string) => {
  useHead({
    title: `${pageTitle} | The Feel Good Center`
  })
}
