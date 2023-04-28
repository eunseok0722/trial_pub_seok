const mutaions = {
  gnbModalToggle (state, payload) {
    if (payload === undefined) {
      state.gnbModalShow = !state.gnbModalShow
      for (let i = 0; i < state.gnbInfo.length; i++) {
        state.gnbInfo[i].d2Toggle = false
      }
    } else {
      state.gnbModalShow = payload
    }
  },
  d2Toggle (state, payload) {
    if (state.gnbInfo[payload].d2Toggle === true) {
      state.gnbInfo[payload].d2Toggle = false
    } else {
      for (let i = 0; i < state.gnbInfo.length; i++) {
        state.gnbInfo[i].d2Toggle = false
      }
      state.gnbInfo[payload].d2Toggle = true
    }
  }
}
export default mutaions
