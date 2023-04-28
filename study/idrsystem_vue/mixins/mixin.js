import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import AOS from 'aos'
import VueGtag from 'vue-gtag'
import CustomPlugin from '~/plugins/custom-plugin'

Vue.use(VueGtag, {
  config: { id: 'G-N9JMF3K58J' }
})

Vue.use(CustomPlugin)

// console.log('mixin.Js')
export default {
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      gnbModalShow: 'modules/gnbData/gnbModalShow'
    })
  },
  mounted () {
    this.checkDevice()
    this.$nextTick(function () {
      document.addEventListener('load', this.scrollHandler, false)
      document.addEventListener('scroll', this.scrollHandler, false)
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
      })
    })
    setTimeout(this.callAOS, 400)
  },
  beforeUnmount: function () {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    ...mapMutations({
      checkDevice: 'modules/common/checkDevice'
    }),
    getBodyScrollTop: function () {
      // 가장큰 숫자 반환 (y축 방향으로 스크롤한 거리들 크로스브라우징용)
      return Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      )
    },
    scrollHandler: function (_evt) {
      // header 모션
      const _header = document.querySelector('#header')
      if (_header) {
        if (
          this.getBodyScrollTop() > this.beforeTop &&
          this.getBodyScrollTop() > 0
        ) {
          if (
            this.getBodyScrollTop() > 0 &&
            !_header.classList.contains('fixed')
          ) {
            this.$store.commit('modules/common/headerFixedToggle', true)
          }
        } else if (
          this.getBodyScrollTop() === 0 &&
            header.classList.contains('fixed')
        ) {
          this.$store.commit('modules/common/headerFixedToggle', false)
        }
        this.beforeTop = this.getBodyScrollTop()
      }

      // Common Var
      const _conWorks = document.querySelector('.con_works')
      const _worksBoxs = document.querySelectorAll('.works_box').length
      const _worksBoxsPst = []
      let _scrollW
      if (this.isMobile) {
        _scrollW = window.scrollY + 120
      } else {
        _scrollW = window.scrollY
      }
      let _currentWorkBox = 1

      // works 모션
      if (_conWorks) {
        for (let i = 1; i <= _worksBoxs; i++) {
          _worksBoxsPst.push(document.getElementById('works_' + i).offsetTop)
        }
        for (let i = 1; i <= _worksBoxsPst.length; i++) {
          if (_worksBoxsPst[i - 1] <= _scrollW) {
            if (_scrollW < _worksBoxsPst[i] - 1) {
              _currentWorkBox = i
            } else if (_scrollW >= _worksBoxsPst[i]) {
              _currentWorkBox = _worksBoxsPst.length
            }
          }
        }
        this.$store.commit('modules/worksInfo/setIdx', { qIdx: _currentWorkBox })
      }
    },
    callAOS: function () {
      AOS.init({
        duration: 1200
      })
    }
  }
}
