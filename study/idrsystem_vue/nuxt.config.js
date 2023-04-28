export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static', // 정적호스팅 사이트 설정

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '(주)아이디알시스템 IDRSYSTEM',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:title', content: '(주)아이디알시스템 IDRSYSTEM' },
      { property: 'og:url', content: 'https://www.idrsystems.co.kr' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: '시스템통합,소프트웨어개발,정보인프라구축서비스' },
      { property: 'og:image', content: 'https://idrsys-site.s3.ap-northeast-2.amazonaws.com/homepage/images/favicon/or_img.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/style.js', body: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/default.scss',
    '@/assets/scss/display.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/custom-plugin' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'https://www.idrsystems.co.kr',
    gzip: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Generate
  generate: {
    dir: 'dist',
    subFolders: true,
    devtools: true
  },
  router: {
    mode: 'history',
    base: process.env.NODE_ENV === 'production' ? '' : '/idrsystem_vue/',
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/',
        redirect: {
          name: 'main'
        }
      })
    }
  }
}
