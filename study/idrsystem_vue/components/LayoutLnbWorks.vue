<template>
  <!-- depth2 Menu : Works -->
  <swiper
    ref="workLnbWrap"
    class="work_lnb_wrap swiper"
    :class="{ active: isHeaderActive }"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(lnbMenu2, key, idx) in depth2Menu_works"
      :key="key"
      :data-idx="lnbMenu2.title == selectedYear?swiperOnLoad(idx):null"
      :class="{ on: lnbMenu2.title == selectedYear }"
      class="list_item"
    >
      <a @click="workYearMove(lnbMenu2.title, lnbMenu2.type)">
        <span>{{ lnbMenu2.title }}</span>
      </a>
    </swiper-slide>
  </swiper>
  <!-- //depth2 Menu : Works -->
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'LayoutLnbWorks',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        // Optional parameters
        slidesPerView: 5,
        centeredSlidesBounds: true,
        slideToClickedSlide: true,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
        updateOnWindowResize: true
        // initialSlide: 0
        // resizeObserver: true,
        // observe: true,
        // observeParents: true,
        // init: true,
      }

    }
  },
  computed: {
    ...mapGetters({
      selectedYear: 'modules/worksInfo/selectedYear',
      depth2Menu_works: 'modules/worksData/getState',
      nowIdx: 'modules/worksInfo/nowIdx',
      isHeaderActive: 'modules/common/isHeaderActive'
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    workLnbSwiper () {
      return this.$refs.workLnbWrap.$swiper
    }
  },
  mounted () {
  },
  methods: {
    workYearMove: function (selectedYear, worksType) {
      this.$router.push({
        path: '/works/base',
        query: { year: selectedYear, idx: 1, type: worksType }
      })
      // window.scrollTo(0, 0)
      this.$store.commit('modules/common/incrementMoveKey')
      this.$store.commit('modules/gnbData/gnbModalToggle', false)
    },
    swiperOnLoad (idx) {
      this.workLnbSwiper.slideTo(idx, 0)
    }
  }
}
</script>
