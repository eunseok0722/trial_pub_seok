<template>
  <div id="header">
    <div class="header-wrap">
      <!--   header-pc   -->
      <div class="header-pc section" :class="{inactive : inactivate}">
        <div class="header-contents">
          <div class="header-logo">
            <router-link to="/">
              <img :src="imgPath+logoImgUrl" alt="fyrre_magazine">
              <i class="blind">fyrre magazine 메인</i>
            </router-link>
          </div>
          <div class="header-nav">
            <div :class="{'nav-menu-wrap': true, 'header-mobile':true, active:navActive}">
              <!--      pc | navigation menu list        -->
              <ul class="nav-menu-list">
                <li v-for="(item, index) in navMenuItem" v-bind:key="item.id"
                    class="item">
                  <router-link v-bind:to="item.path" v-on:click="navChange">{{ item.name }}</router-link>
                </li>
              </ul>
              <!--      //pc | navigation menu list        -->
            </div>

            <div class="nav-border"></div>
            <div class="nav-sns">
              <!--      SNS link list        -->
              <nav-sns-list :nav-sns-item="navSnsItem"></nav-sns-list>
              <!--      //SNS link list        -->
            </div>
            <!--      mobile navigation button      -->
            <div class="nav-mobile">
              <button :class="{'nav-mobile-btn':true, active:navActive}"
                      v-on:click="navChange">
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
      <!--   //header-pc   -->
      <!--   header-mobile   -->
      <!--      <div :class="{'header-mobile':true, section:true, active:navActive}">-->
      <!--        &lt;!&ndash;    mobile | navigation menu list    &ndash;&gt;-->
      <!--        <ul class="nav-menu-list">-->
      <!--          <li v-for="(item, index) in navMenuItem" v-bind:key="item.id" class="item">-->
      <!--            <router-link v-bind:to="item.path" v-on:click="navChange">{{ item.name }}-->
      <!--            </router-link>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--        &lt;!&ndash;    mobile | navigation menu list    &ndash;&gt;-->
      <!--      </div>-->
      <!--   //header-mobile   -->
    </div>
  </div>
</template>

<script>
import NavSnsList from "../components/NavSnsList.vue";

export default {
  name: "compHeader",
  props: [],
  data() {
    return {
      // scrollY: 0,
      // lastScrollY: 0,
      // timer: null,
    }
  },
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    logoImgUrl() {
      return this.$store.state.moduleHeader.logoImg.url
    },
    navMenuItem() {
      return this.$store.state.moduleHeader.navMenuItem
    },
    navActive() {
      return this.$store.state.moduleHeader.navActive
    },
    navSnsItem() {
      return this.$store.state.navSnsItem
    },
    inactivate() {
      return this.$store.state.moduleHeader.scrollY >= 150 && this.$store.state.moduleHeader.lastScrollY < this.$store.state.moduleHeader.scrollY
    }

  },
  methods: {
    navChange() {
      this.$store.commit('moduleHeader/navChange')
    },
    handleScroll() {
      this.$store.commit('moduleHeader/handleScroll')
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    'nav-sns-list': NavSnsList,
  }
}
</script>

