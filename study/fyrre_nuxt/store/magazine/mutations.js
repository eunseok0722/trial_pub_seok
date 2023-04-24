export default {
  ctgrState(state, payload) {
    state.ctgr = payload;
  },
  ctgrActivate(state, index) {
    for (let i = 0; i < state.categoriesList.length; i++) {
      state.categoriesList[i].ctgrActive = false
    }
    state.categoriesList[index].ctgrActive = true
  },
  pageNxt(state) {
    if (state.pageDft.to <= state.mainMagazineList.length) {
      state.pageDft.from += state.pageMove;
      state.pageDft.to += state.pageMove;
      window.scrollTo(0, 0);
    }
  },
  pagePrv(state) {
    if (state.pageDft.from > state.pageFrm) {
      state.pageDft.from -= state.pageMove;
      state.pageDft.to -= state.pageMove;
      window.scrollTo(0, 0);
    }

  }
}
