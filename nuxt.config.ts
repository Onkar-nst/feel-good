import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },


  // Nuxt 4 source directory structure config
  future: {
    compatibilityVersion: 4,
  },

  // Redirection rules
  routeRules: {
    '/': { redirect: '/home' }
  },

  // App head settings
  app: {
    head: {
      title: 'The Feel Good Center | A Safe Space To Be Heard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'title', content: 'The Feel Good Center | A Safe Space To Be Heard' },
        { name: 'description', content: 'The Feel Good Center offers one to one listening sessions led with warmth, compassion, and zero judgment. A safe, judgment-free space to talk, express, and feel lighter. No therapy. No fixing. Just listening — with heart.' },
        { name: 'keywords', content: 'listening service, emotional support, safe space to talk, judgment free listening, 1:1 virtual listening sessions, emotional check in, emotional wellness, corporate wellbeing, employee mental wellness, feel heard, Kinjal Shah, The Feel Good Center, Mumbai' },
        { name: 'author', content: 'The Feel Good Center' },
        { name: 'robots', content: 'index, follow' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon-fgc.png' },
        { rel: 'apple-touch-icon', href: '/images/apple-touch-icon-fgc.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Inter:opsz,wght@14..32,100..900&display=swap' }
      ],
      script: [
        {
          // Arms the scroll-reveal hidden state before first paint, and un-arms
          // it after 2.5s so content can never be stranded invisible if the
          // reveal plugin fails to run.
          innerHTML: "document.documentElement.classList.add('reveal-ready');setTimeout(function(){document.querySelectorAll('[data-reveal]').forEach(function(n){n.classList.add('is-visible')})},2500);",
          tagPosition: 'head',
          type: 'text/javascript'
        }
      ]
    }
  },

  // Vite config for Tailwind CSS v4
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})
