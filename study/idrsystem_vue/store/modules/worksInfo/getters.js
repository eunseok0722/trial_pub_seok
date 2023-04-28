const getters = {
  getState (state) {
    return state
  },
  selectedYear (state) {
    return state.selectedYear
  },
  selectedIdx (state) {
    return state.selectedIdx
  },
  selectedType (state) {
    return state.selectedType
  },
  nowIdx (state) {
    return state.nowIdx
  },
  setStartYear (state) {
    return state.setStartYear
  }
}
export default getters
