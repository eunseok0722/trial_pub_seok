import products from '@/api/products.js'
// 상품 상세 전용 Vuex 모듈

export default {
  namespaced: true,
  data () {
    return {
      item: null
    }
  },
  state: {
    detail: {}
  },
  getters: {
    detail: state => state.detail
  },
  mutations: {
    set (state, { detail }) {
      state.detail = detail
    },
    clear (state) {
      state.detail = {}
    }
  },
  actions: {
    load ({ commit }, id) {
      products.asyncFind(id, detail => {
        commit('set', { detail })
      })
    },
    destroy ({ commit }) {
      commit('clear')
    }
  },
  //  이동 전에 컴포넌트 읽어들이기
  beforeRouteEnter (to, from, next) {
    products.asyncFind(Number(to.params.id), item => {
      next(vm => { vm.item = item })
    })
  },
  beforeRouteUpdate (to, from, next) {
    products.asyncFind(Number(to.params.id), item => {
      this.item = item
      next()
    })
  }
}
