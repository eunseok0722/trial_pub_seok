const mutaions = {
  setYearIdx (state, payload) {
    state.selectedYear = payload.qYear
    state.selectedIdx = payload.qIdx
    state.selectedType = payload.qType
  },
  setIdx (state, payload) {
    state.selectedIdx = payload.qIdx
    // console.log(`state.selectedIdx : ${state.selectedIdx}`)
  }
}
export default mutaions
