import { createError, defineNuxtRouteMiddleware } from '#app'
import { isHiddenPage } from '~/utils/hiddenPages'

/**
 * The pages listed in ~/utils/hiddenPages stay linked everywhere, but opening
 * one returns a genuine 404 and renders app/error.vue.
 *
 * Throwing (rather than redirecting) keeps the URL the visitor clicked in the
 * address bar and sends a real 404 status, so crawlers treat it as missing
 * rather than indexing a redirect.
 *
 * Nothing here needs editing to open the pages — just empty HIDDEN_PAGES.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (!isHiddenPage(to.path)) return

  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
})
