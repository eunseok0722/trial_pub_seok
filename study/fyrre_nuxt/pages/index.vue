<template>
  <div id="content">
    <!--  section | headline -->
    <section class="section">
      <div class="main-title-svg">
        <svg
          fill="none" height="216" viewBox="0 0 1520 216" width="1520"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M160.207 212.622H208.476L129.113 0H79.9553L0 212.622H45.308L61.5952 167.018H144.216L160.207 212.622ZM103.35 49.1577L131.778 131.186H74.3288L103.35 49.1577Z"
            fill="black"/>
          <path
            d="M279.39 212.622V137.405H307.523L355.496 212.622H409.095L354.311 130.594C384.517 120.525 402.284 97.7232 402.284 68.9985C402.284 24.875 371.191 0 317.591 0H234.378V212.622H279.39ZM279.39 37.3125H315.518C342.762 37.3125 357.273 47.9732 357.273 68.9985C357.273 89.7276 342.762 100.388 315.518 100.388H279.39V37.3125Z"
            fill="black"/>
          <path
            d="M528.688 212.622V40.5699H595.91V0H416.751V40.5699H483.676V212.622H528.688Z"
            fill="black"/>
          <path
            d="M759.865 96.5387C746.539 82.0283 740.616 74.0327 740.616 63.0759C740.616 50.9345 749.204 42.3467 760.753 42.3467C772.894 42.3467 781.482 49.75 782.963 63.6681H821.164C820.868 31.0937 796.881 9.47619 760.753 9.47619C724.921 9.47619 698.269 31.9821 698.269 62.7797C698.269 74.9211 701.823 85.5818 709.226 95.9464C686.72 108.68 673.098 127.632 673.098 150.138C673.098 189.82 701.527 215.287 745.947 215.287C765.491 215.287 783.555 207.884 799.546 193.966L817.018 212.622H867.656L823.237 164.649C832.121 148.065 838.043 127.632 838.339 109.865H800.731C800.435 119.341 799.546 128.817 797.769 137.405L759.865 96.5387ZM712.484 147.769C712.484 135.628 719.295 125.856 730.252 120.229L778.521 171.46C770.229 178.271 759.865 181.824 748.908 181.824C724.921 181.824 712.484 166.722 712.484 147.769Z"
            fill="black"/>
          <path
            d="M1089.26 212.622V172.052H996.871V0H951.859V212.622H1089.26Z" fill="black"/>
          <path
            d="M1165.18 212.622V0H1120.17V212.622H1165.18Z" fill="black"/>
          <path
            d="M1253.67 212.622V131.482H1331.55V92.6889H1253.67V39.0893H1346.06V0H1208.66V212.622H1253.67Z"
            fill="black"/>
          <path
            d="M1520 173.533H1421.98V122.598H1509.04V83.805H1421.98V39.0893H1517.93V0H1376.97V212.622H1520V173.533Z"
            fill="black"/>
        </svg>
      </div>
      <div class="main-newsticker">
        <div class="ticker-title">
          NEWS TICKER+++
        </div>
        <!--    news-ticker component    -->
        <news-ticker :news-ticker-list="newsTickerList"></news-ticker>
        <!--    //news-ticker component    -->
      </div>
    </section>
    <!--  //section | headline -->
    <!--  section | main article part -->
    <section class="section sec-main-mgzn">
      <div class="mgzn-hd">
        <!--        headline-text            -->
        <div class="hl-cont">
          <div class="hl-tit">
            <NuxtLink to="/magazine/2">
              {{ headlineDetail.tit }}
            </NuxtLink >
          </div>
          <div class="hl-txt">
            <div class="hl-desc">
              {{ headlineDetail.description }}
            </div>
            <div class="article-detail">
              <div>
                <ul class="detail-list">
                  <li>
                    <span class="tit-r">Text</span>
                    <span class="txt-r">{{ headlineDetail.text }}</span>
                  </li>
                  <li>
                    <span class="tit-r">Date</span>
                    <span class="txt-r">{{ headlineDetail.date }}</span>
                  </li>
                  <li>
                    <span class="tit-r">Duration</span>
                    <span class="txt-r">{{ headlineDetail.duration }}</span>
                  </li>
                </ul>
              </div>
              <div class="label-category">
                LABEL
              </div>
            </div>
          </div>
        </div>
        <!--        // headline-text            -->
        <!--        headline-image            -->
        <div class="hl-img">
          <NuxtLink to="/magazine/2">
            <img
              :alt="headlineDetail.tit"
              :src="require(`~/assets/images/${headlineDetail.img}`)">
          </NuxtLink >
        </div>
        <!--        //headline-image            -->
      </div>
      <!--  main magazine list    -->
      <div class="mgzn-cont">
        <!--        magazine-list            -->
        <div class="mgzn-articles">
          <ul class="list-ty">
            <li v-for="item in mainMagazineList" :key="item.id" class="ty-item">
              <div class="article-contents">
                <div class="ty-cover">
                  <NuxtLink :to="`/magazine/${item.id}`">
<!--                  <NuxtLink :to="{ name: `MagazinePost`, params: { id: `${item.id}`}}">-->
                    <img :alt="item.tit" :src="require(`~/assets/images/${item.url}`)">
                    <i class="blind">기사 자세히 보기</i>
                  </NuxtLink>
                </div>
                <div class="ty-text">
                  <div class="article-summary">
                    <div class="post-tit">
                      <NuxtLink :to="`/magazine/${item.id}`">{{ item.tit }}</NuxtLink >
                    </div>
                    <div class="txt-l post-lh">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="article-detail">
                    <div class="detail-list-wrap">
                      <ul class="detail-list">
                        <li>
                          <span class="tit-r">Text</span>
                          <span class="txt-r">{{ item.text }}</span>
                        </li>
                        <li>
                          <span class="tit-r">Date</span>
                          <span class="txt-r">{{ item.date }}</span>
                        </li>
                        <li>
                          <span class="tit-r">Read</span>
                          <span class="txt-r">{{ item.duration }}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="label-category">
                      {{ item.category }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="btn-view-more">
            <NuxtLink to="/magazine">ALL ARTICLES</NuxtLink >
          </div>
        </div>
        <!--        //magazine-list            -->
        <!--        magazine-aside            -->
        <div class="magazine-aside">
          <!--  latest published magazine  -->
          <div class="magazine-latest">
            <div class="latest-tit">
              <div class="tit-l">PRINTMAGAZINE</div>
              <div class="article-tit">{{ latestMagazine.pub }}</div>
            </div>
            <div class="latest-view">
              <div class="latest-cover">
                <NuxtLink to="/magazine">
                  <img :alt="latestMagazine.pub" :src="require(`~/assets/images/${latestMagazine.img}`)">
                  <i class="blind">최신 발행본 보기</i>
                </NuxtLink >
              </div>
              <div class="btn-s btn-ty-b">
                <NuxtLink to="/magazine">BUTTON</NuxtLink >
              </div>
            </div>
          </div>
          <!--  //latest published magazine  -->
          <!-- most popular -->
          <div class="most-popular">
            <div class="tit-l">
              MOST POPULAR
            </div>
            <div class="most-popular-articles">
              <!--    most popular Article list      -->
              <ul class="pop-art-list">
                <li v-for="item in mostPopularList" :key="item.id" class="art-item">
                  <div class="popular-txt popular-num">{{ item.id }}</div>
                  <div class="pop-art-desc">
                    <div class="popular-txt">
                      <NuxtLink :to="`/magazine/${item.link}`">{{ item.tit }}</NuxtLink >
                    </div>
                    <div class="detail-list-wrap">
                      <ul class="detail-list">
                        <li>
                          <span class="tit-r">Text</span>
                          <span class="txt-r">{{ item.text }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <!--    //most popular Article list      -->
            </div>
          </div>
          <!-- //most popular -->
          <!-- newsletter subscribe -->
          <div class="newsletter-subs-wrap">
            <div class="newsletter-subs">
              <div class="subs-txt">
                <div class="tit-l">NEWSLETTER</div>
                <div class="post-tit">Design News to your inbox</div>
              </div>
              <div class="subscribe-form ty2">
                <div class="input-wrap">
                  <input placeholder="Email" type="email">
                </div>
                <div class="btn-s btn-ty-b">
                  <button>SIGN UP</button>
                </div>
              </div>
            </div>
          </div>
          <!-- //newsletter subscribe -->
        </div>
        <!--        //magazine-aside            -->
      </div>
      <!--  //main magazine list    -->
    </section>
    <!--  //section | magazine article part -->

    <!--     section podcast       -->
    <section class="section section-temp sec-main-podcast">
      <div class="temp-header">
        <div class="section-tit">PODCAST</div>
        <div class="btn-view-more">
          <NuxtLink to="/podcast">ALL EPISODES</NuxtLink >
        </div>
      </div>
      <!--   podcast list component   -->
      <podcast-list></podcast-list>
      <!--   //podcast list component   -->
    </section>
    <!--     //section podcast       -->

    <!--  section Author list  -->
    <section class="section section-temp sec-main-author">
      <div class="temp-header">
        <div class="section-tit">AUTHOR</div>
        <div class="btn-view-more">
          <NuxtLink to="/authors">ALL AUTHORS</NuxtLink >
        </div>
      </div>
      <div class="temp-contents">
        <!--   Author list   -->
        <ul class="list-ty2">
          <li v-for="item in mainAuthorList" :key="item.id" class="ty-item">
            <div class="ty-cover">
              <NuxtLink :to="`/authors/${item.id}`">
                <img :src="require(`~/assets/images/${item.url}`)" :alt="item.name">
                <i class="blind">Author 자세히보기</i>
              </NuxtLink >
            </div>
            <div class="ty-text">
              <div class="article-summary">
                <div class="post-tit">
                  <NuxtLink :to="`/authors/${item.id}`">
                    {{ item.name }}
                  </NuxtLink >
                </div>
              </div>
              <ul class="detail-list">
                <li>
                  <span class="tit-r">Job</span>
                  <span class="txt-r">{{ item.job }}</span>
                </li>
                <li>
                  <span class="tit-r">City</span>
                  <span class="txt-r">{{ item.city }}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!--   //Author list   -->
      </div>
    </section>
    <!--  //section Author list  -->
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',
  data() {
    return {}
  },
  computed: {
    ...mapState('main', {
      newsTickerList: state => state.newsTickerList,
      headlineDetail: state => state.headlineDetail,
      mostPopularList: state => state.mostPopularList,
      latestMagazine: state => state.latestMagazine,
    }),
    ...mapState('authors', {
      mainAuthorList: state => state.mainAuthorList,
    }),
    ...mapGetters('magazine', {
      mainMagazineList: 'mainMagazineList',
    }),

  }

}
</script>
