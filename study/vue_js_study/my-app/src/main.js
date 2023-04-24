// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'
import router from './router'
import windowPlugin from './components/windowPlugin' // 사용자 정의 컴포넌트 임포트하기
Vue.use(Vuex)
Vue.use(windowPlugin) // 뷰에 사용자 정의 컴포넌트 사용 등록하기
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, // 스토어 등록하기
  router, // 라우터 등록하기
  windowPlugin, // 사용자 플러그인 등록하기
  render: h => h(App)
  // components: { App },
  // template: '<App/>',
})
