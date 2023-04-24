/* footer component 정의 */
<template>
  <!-- #Footer -->
  <div id="footer">
    <div class="footer-wrap">
      <div class="footer-pc">
        <div class="footer-contents">
          <!--     footer newsticker      -->
          <NewsTicker :news-ticker-list="footerNewsTickerList"></NewsTicker>
          <!--     //footer newsticker      -->
          <div class="footer-nav section">
            <!--      footer | subscibe form      -->
            <div class="footer-subscribe">
              <div class="sbsc-text">
                <p>DESIGN NEWS TO <br>YOUR INBOX</p>
              </div>
              <div class="subscribe-form">
                <input placeholder="Email" type="email">
                <div class="btn-s btn-ty-w">
                  <button>
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
            <!--      //footer | subscibe form      -->
            <!--      footer | sitemap      -->
            <div class="footer-sitemap">
              <div class="footer-logo">
                <a href="#">
                  <img :alt="logoImgWhite.name" :src="require(`~/assets/images/${logoImgWhite.url}`)">
                  <i class="blind">fyrre magazine 메인</i>
                </a>
              </div>
              <div class="sitemap-list-wrap">
                <!--      sitemap list          -->
                <ul class="sitemap-list">
                  <li v-for="item in sitemapList" :key="item.id" class="sitemap-item">
                    <NuxtLink :to="item.url">{{ item.name }}</NuxtLink >
                  </li>
                </ul>
                <!--      //sitemap list          -->
              </div>
            </div>
            <!--      //footer | sitemap      -->
            <!--      footer | bottom      -->
            <div class="footer-bottom">
              <div class="footer-copyright">
                <address>© Made by Pawel Gola - Powered by Webflow</address>
              </div>
              <div class="nav-sns">
                <NavSnsList :nav-sns-item="navSnsItem"></NavSnsList>
              </div>
            </div>
            <!--      //footer | bottom      -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #Footer -->
</template>

<script>

import {mapState} from "vuex";
// import NewsTicker from "~/components/NewsTicker.vue";
// import NavSnsList from "~/components/NavSnsList.vue";

export default {
  name: "CompFooter",
  components: {
    // NavSnsList,
    // NewsTicker,
  },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapState('footer', {
      footerNewsTickerList: state => state.footerNewsTickerList,
      sitemapList: state => state.sitemapList,
      logoImgWhite: state => state.logoImgWhite,
    }),
    ...mapState({
      navSnsItem: state => state.navSnsItemWhite,
      path: state => state.path,
    }),
  },
}
</script>

