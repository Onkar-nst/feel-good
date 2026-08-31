import { defineNuxtPlugin } from '#app'
import lightGallery from 'lightgallery'
import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

import 'lightgallery/css/lightgallery-bundle.css'
import 'lightgallery/css/lg-video.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-fullscreen.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('lightgallery', {
    mounted(el, binding) {
      const options = binding.value || {}
      
      const thumbnails = el.dataset.thumbnails ? true : false
      const video = el.dataset.video ? true : false
      const isVideoToggle = el.dataset.toggle === 'video'
      
      const defaultPlugins = [lgZoom, lgFullscreen]
      const videoPlugin = (video || isVideoToggle) ? [lgVideo] : []
      const thumbnailPlugin = thumbnails ? [lgThumbnail] : []
      const plugins = [...defaultPlugins, ...videoPlugin, ...thumbnailPlugin]
      
      const lgOptions = {
        plugins: plugins,
        download: false,
        autoplayVideoOnSlide: true,
        zoomFromOrigin: false,
        youtubePlayerParams: {
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
        },
        vimeoPlayerParams: {
          byline: 0,
          portrait: 0,
          color: '6366f1',
        },
        ...options
      }
      
      if (isVideoToggle) {
        lgOptions.selector = 'this'
      } else {
        lgOptions.selector = 'a'
      }
      
      el._lgInstance = lightGallery(el, lgOptions)
    },
    unmounted(el) {
      if (el._lgInstance) {
        el._lgInstance.destroy()
      }
    }
  })
})
