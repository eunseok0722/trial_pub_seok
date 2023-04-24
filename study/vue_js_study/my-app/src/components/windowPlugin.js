// 사용자 정의 플러그인 만들기
let windowPlugin = {
  install: function (Vue) {
    // 플러그인 데이터 전용으로 Vue 인스턴스 사용하기
    let store = new Vue({
      data: {
        scrollY: 0
      }
    })
    // 윈도우 스크롤 이벤트 핸들하기
    let timer = null
    window.addEventListener('scroll', function () {
      if (timer === null) {
        timer = setTimeout(function () {
          // 200ms 간격으로 scrollY 속성에 할당하기
          store.scrollY = window.scrollY
          clearTimeout(timer)
          timer = null
        }, 200)
      }
    })
    // 인스턴스 속성에 등록하기
    Vue.prototype.$window = store.$data
  }
}
export default windowPlugin
