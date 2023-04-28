<template>
  <div class="header_wrap">
    <header
      id="header"
      :class="{
        gnb_on: gnbModalShow,
        fixed: isHeaderFixed,
        active: isHeaderActive,
      }"
    >
      <!-- logo -->
      <h1 class="header_logo">
        <NuxtLink to="/main">
          <img
            v-if="!gnbModalShow"
            src="~/assets/images/common/logo_idr_top.png"
            alt="아이디알시스템 로고"
          >
          <img
            v-if="gnbModalShow"
            src="~/assets/images/common/logo_idr_top_w.png"
            alt="아이디알시스템 로고"
          >
        </NuxtLink>
      </h1>
      <!-- //logo -->

      <!-- depth2 Menu : Service -->
      <ul v-if="isDepth2_service" class="lnb_wrap lnb_d1_wrap">
        <NuxtLink
          v-for="(lnbMenu1, idx) in depth2Menu_service"
          :key="idx"
          class="d1_li"
          :to="lnbMenu1.to"
          tag="li"
          exact
          @click.native="gnbToggleOff"
        >
          <a href="#none" @click="gnbToggle">
            <span>{{ lnbMenu1.title }}</span>
          </a>
        </NuxtLink>
      </ul>
      <!-- //depth2 Menu : Service -->

      <!-- depth2 Menu : Works -->
      <ul v-if="isDepth2_works" class="lnb_wrap lnb_d1_wrap">
        <li
          v-for="(lnbMenu2, idx) in depth2Menu_works"
          :key="idx"
          class="d1_li"
          :class="{ on: lnbMenu2.title == selectedYear }"
        >
          <a @click="workYearMove(lnbMenu2.title, lnbMenu2.type)">
            <span>{{ lnbMenu2.title }}</span>
          </a>

          <ul v-if="lnbMenu2.contents.length > 0" class="lnb_d2_wrap pc_nav">
            <li
              v-for="(subMenu, idx2) in lnbMenu2.contents"
              :key="idx2"
              class="d2_li"
              :class="{ on: subMenu.id == selectedIdx }"
            >
              <a @click="scrollToAnchor(subMenu.id)">
                <span>{{ subMenu.id }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <!-- //depth2 Menu : Works -->

      <!-- depth2 Menu : contact -->
      <ul v-if="isDepth2_contact" class="lnb_wrap lnb_d1_wrap">
        <NuxtLink
          v-for="(lnbMenu3, idx) in depth2Menu_contact"
          :key="idx"
          class="d1_li"
          :to="lnbMenu3.to"
          tag="li"
          @click.native="gnbToggleOff"
        >
          <a href="#none">
            <span>{{ lnbMenu3.title }}</span>
          </a>
        </NuxtLink>
      </ul>
      <!-- //depth2 Menu : contact -->

      <!-- GnbBtn -->
      <button
        type="button"
        class="gnb_btn"
        :class="{ on: gnbModalShow }"
        title="메뉴버튼"
        @click="gnbToggle"
      >
        <span v-for="(line, idx) in 3" :key="idx" class="line" />
      </button>
      <!-- //GnbBtn -->
    </header>

    <div class="mo_nav">
      <ul
        v-for="(lnbMenu2, idx) in depth2Menu_works"
        :key="idx"
        class="mo_nav lnb_d2_wrap"
        :class="{
          on: lnbMenu2.title == selectedYear,
          hide: lnbMenu2.contents.length < 2,
        }"
      >
        <template v-if="lnbMenu2.contents.length > 0">
          <li
            v-for="(subMenu, idx3) in lnbMenu2.contents"
            :key="idx3"
            class="d2_li"
            :class="{ on: subMenu.id == selectedIdx }"
          >
            <a @click="scrollToAnchor(subMenu.id)">
              <div />
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LayoutHeader',
  data () {
    return {
      isDepth2_main: this.$route.path.includes('/main'),
      isDepth2_service: this.$route.path.includes('/service'),
      isDepth2_works: this.$route.path.includes('/works'),
      isDepth2_contact: this.$route.path.includes('/contact')
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      gnbData: 'modules/gnbData/getState',
      gnbModalShow: 'modules/gnbData/gnbModalShow',
      isHeaderFixed: 'modules/common/isHeaderFixed',
      isHeaderActive: 'modules/common/isHeaderActive',
      selectedYear: 'modules/worksInfo/selectedYear',
      selectedIdx: 'modules/worksInfo/selectedIdx',
      selectedType: 'modules/worksInfo/selectedType',
      worksData: 'modules/worksData/getState'
    }),
    depth2Menu_service () {
      return this.$store.getters['modules/gnbData/gnbInfo'][1].depth2
    },
    depth2Menu_works () {
      return this.$store.getters['modules/worksData/getState']
    },
    depth2Menu_contact () {
      return this.$store.getters['modules/gnbData/gnbInfo'][3].depth2
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    this.$store.commit('modules/common/setScrollY', 0)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations({
      handleScroll: 'modules/common/handleScroll'
    }),
    workYearMove: function (selectedYear, worksType) {
      this.$router.push({
        path: '/works/base',
        query: { year: selectedYear, idx: 1, type: worksType }
      })
      window.scrollTo(0, 0)
      this.$store.commit('modules/common/incrementMoveKey')
      this.$store.commit('modules/gnbData/gnbModalToggle', false)
    },
    scrollToAnchor: function (selectedAnchor) {
      this.commonScrollToAnchor(selectedAnchor)
      this.$store.commit('modules/gnbData/gnbModalToggle', false)
    }
  }
}
</script>
