/* footer component 정의 */
<template>
  <!-- #Footer -->
  <div id="footer">
    <div class="footer-wrap">
      <div class="footer-pc">
        <div class="footer-contents">
          <!--     footer newsticker      -->
          <news-ticker :news-ticker-list="footerNewsTickerList"></news-ticker>
          <!--     //footer newsticker      -->
          <div class="footer-nav section">
            <!--      footer | subscibe form      -->
            <div class="footer-subscribe">
              <div class="sbsc-text">
                <p>DESIGN NEWS TO <br>YOUR INBOX</p>
              </div>
              <div class="subscribe-form">
                <input type="email" placeholder="Email">
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
                  <img :src="imgPath+logoWhite" alt="fyrre_magazine">
                  <i class="blind">fyrre magazine 메인</i>
                </a>
              </div>
              <div class="sitemap-list-wrap">
                <!--      sitemap list          -->
                <ul class="sitemap-list">
                  <li v-for="(item, index) in siteMapList" v-bind:key="item.id" class="sitemap-item">
                    <router-link :to="item.url">{{ item.name }}</router-link>
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
                <nav-sns-list :nav-sns-item="navSnsItem"></nav-sns-list>
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
import NavSnsList from "./NavSnsList.vue";
import NewsTicker from "../components/NewsTicker.vue";

export default {
  name: "compFooter",
  components: {
    'nav-sns-list': NavSnsList,
    'news-ticker': NewsTicker,
  },
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    logoWhite() {
      return this.$store.state.moduleFooter.logoImgWhite.url
    },
    footerNewsTickerList() {
      return this.$store.state.moduleFooter.footerNewsTickerList
    },
    siteMapList() {
      return this.$store.state.moduleFooter.sitemapList
    },
    navSnsItem() {
      return this.$store.state.navSnsItemWhite
    },

  },
  props: [],
  data() {
    return {}
  },
}
</script>

