<template>
  <div id="header">
    <div class="header-wrap">
      <!--   header-pc   -->
      <div :class="{inactive: inactive}" class="header-pc section">
        <div class="header-contents">
          <div class="header-logo">
            <NuxtLink to="/">
              <img :alt="logoImg.name" :src="require(`~/assets/images/${logoImg.url}`)">
              <i class="blind">fyrre magazine 메인</i>
            </NuxtLink>
          </div>
          <div class="header-nav">
            <div :class="{active: navActive}" class="nav-menu-wrap header-mobile">
              <!--      pc | navigation menu list        -->
              <ul class="nav-menu-list">
                <li
                  v-for="item in navMenuItem" :key="item.id"
                  class="item" @click="navChange">
                  <NuxtLink :to="item.path" >{{ item.name }}</NuxtLink>
                </li>
              </ul>
              <!--      //pc | navigation menu list        -->
            </div>

            <div class="nav-border"></div>
            <div class="nav-sns">
              <!--      SNS link list        -->
              <NavSnsList :nav-sns-item="navSnsItem"></NavSnsList>
            </div>
            <!--      //SNS link list        -->

            <!--      mobile navigation button      -->
            <div class="nav-mobile">
              <button
                :class="{active:navActive}"
                class="nav-mobile-btn"
                @click="navChange"
              >
                <span class="btn-ln-1"></span>
                <span class="btn-ln-2"></span>
                <span class="btn-ln-3"></span>
              </button>
            </div>
            <!--      mobile navigation button      -->
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <!--   //header-pc   -->
    <!--   header-mobile   -->
    <!--      <div :class="{'header-mobile':true, section:true, active:navActive}">-->
    <!--        &lt;!&ndash;    mobile | navigation menu list    &ndash;&gt;-->
    <!--        <ul class="nav-menu-list">-->
    <!--          <li v-for="(item, index) in navMenuItem" :key="item.id" class="item">-->
    <!--            <NuxtLink :to="item.path" @click="navChange">{{ item.name }}-->
    <!--            </NuxtLink >-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--        &lt;!&ndash;    mobile | navigation menu list    &ndash;&gt;-->
    <!--      </div>-->
    <!--   //header-mobile   -->
  </div>
</template>

<script>
import {mapState, mapGetters } from 'vuex';
// import NavSnsList from "~/components/NavSnsList.vue";

export default {
  name: "CompHeader",
  components: {
    // NavSnsList,
  },
  props: [],
  data() {
    return {}
  },
  getters: {},
  computed: {
    ...mapState('header', {
      // navMenuItem: state => state.navMenuItem,
      logoImg: state => state.logoImg,
      navActive: state => state.navActive,
      // inactive: state => state.inactive,
    }),
    ...mapState({
      navSnsItem: state => state.navSnsItem,
      path: state => state.path,
    }),
    ...mapGetters('header', {
      navMenuItem: 'navMenuItem',
      scrollY: 'scrollY',
      lastScrollY: 'lastScrollY',
      inactive: 'inactive',
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    navChange() {
      this.$store.commit('header/navChange')
    },
    handleScroll() {
      this.$store.commit('header/handleScroll');
    }
  }
}
</script>

