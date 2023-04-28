const getters = {
  moveKey (state) {
    return state.moveKey
  },
  isMobile (state) {
    return state.isMobile
  },
  isHeaderFixed (state) {
    return state.isHeaderFixed
  },
  isHeaderActive (state) {
    return state.isHeaderActive
  },
  scrollY (state) {
    return state.scrollY
  },
  lastScrollY (state) {
    return state.lastScrollY
  },
  timer (state) {
    return state.timer
  }
}
export default getters
