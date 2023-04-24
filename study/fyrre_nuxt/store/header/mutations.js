export default {
  navChange(state) {
    state.navActive = !state.navActive;
  },
  handleScroll(state) {
    if (state.timer === null) {
      state.timer = setTimeout(function () {
        state.lastScrollY = state.scrollY;
        state.scrollY = window.scrollY;
        // 스크롤 시 동작
        state.inactive = state.scrollY >= 150 && state.lastScrollY < state.scrollY;
        clearTimeout(state.timer);
        state.timer = null;
      }, 200);
    }
  },
}
