export default {
  mainMagazineList(state) {
    return state.mainMagazineList.slice(0, 7);
  },
  mgzLstLength(state) {
    return state.mainMagazineList.length;
  },
  mgzList(state) {
    return state.mainMagazineList.slice(state.pageDft.from, state.pageDft.to);
  },
}
