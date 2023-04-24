import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import product from '@/store/product.js'
import view from '@/store/view.js'
Vue.use(Vuex)

// 스토어 만들기
const store = new Vuex.Store({
  state: {
    count: 0,
    message: '초기 메시지'
  },
  getters: {
    // message를 사용하는 게터
    message (state) { return state.message }
  },
  mutations: {
    // 카운트 업하는 뮤테이션 등록하기
    increment (state) {
      state.count++
    },
    // 메시지를 변경하는 뮤테이션
    setMessage (state, payload) {
      state.message = payload.message
    }
  },
  actions: {
    // 메시지 변경 처리
    doUpdate ({ commit }, message) {
      commit('setMessage', { message })
    }
  },
  modules: {
    product,
    view
  }
})
export default store
//
// import store from '@/store.js'
// console.log(store.state.count)
//
// // increment를 커밋하기
// store.commit('increment')
// // 값이 변경된 것을 확인할 수 있음
// console.log(store.state.count)
