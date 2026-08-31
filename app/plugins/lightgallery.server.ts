import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lightgallery', {
    getSSRProps() {
      return {}
    }
  })
})
