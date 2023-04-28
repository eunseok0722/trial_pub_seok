const mutaions = {
  checkDevice (state) {
    // 모바일기기 체크
    const _webAgent = navigator.userAgent.toLowerCase()
    // 모바일 장치명
    const _mobileMachine = [
      'iphone',
      'ipod',
      'ipad',
      'android',
      'blackberry',
      'windows ce',
      'nokia',
      'webos',
      'opera mini',
      'sonyericsson',
      'opera mobi',
      'iemobile'
    ]
    for (let i = 0; i < _mobileMachine.length; i++) {
      if (_webAgent.includes(_mobileMachine[i])) {
        state.isMobile = true
        break
      } else {
        state.isMobile = false
      }
    }
  },
  incrementMoveKey (state) {
    state.moveKey++
  },
  headerFixedToggle (state, payload) {
    state.isHeaderFixed = payload
  },
  setScrollY (state, payload) {
    state.scrollY = payload
  },
  setIsHeaderActive (state, payload) {
    state.isHeaderActive = payload
  },
  /*
  handleScroll(state) {
    if (state.scrollY < 400 || state.lastScrollY > state.scrollY) {
      state.isHeaderActive = true;
    } else {
      state.isHeaderActive = false;
    }
    if (state.timer === null) {
      state.timer = setTimeout(function () {
        state.lastScrollY = state.scrollY;
        state.scrollY = window.scrollY;
        clearTimeout(state.timer);
        state.timer = null;
      }, 100);
    }
  },
  */
  handleScroll (state) {
    if (state.scrollY < 400 || state.lastScrollY > state.scrollY) {
      state.isHeaderActive = true
    } else {
      state.isHeaderActive = false
    }
    state.lastScrollY = state.scrollY
    state.scrollY = window.scrollY
  }
}
export default mutaions
