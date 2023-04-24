<template>
  <div class="mgzn-cont">
    <!--        magazine-list            -->
    <div class="mgzn-articles">
      <ul class="list-ty">
        <li class="ty-item" v-for="(item, index) in mainMagazineList" v-bind:key="item.id">
            <div class="article-contents">
              <div class="ty-cover">
                <router-link :to="`/magazine/${item.id}`">
                  <img v-bind:src="imgPath+item.url" :alt="item.tit">
                  <i class="blind">기사 자세히 보기</i>
                </router-link>
              </div>
              <div class="ty-text">
                <div class="article-summary">
                  <div class="post-tit">
                    <router-link :to="`/magazine/${item.id}`">{{ item.tit }}</router-link>
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
        <router-link to="/magazine">ALL ARTICLES</router-link>
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
            <router-link to="/magazine">
              <img :src="imgPath+latestMagazine.img" :alt="latestMagazine.pub">
              <i class="blind">최신 발행본 보기</i>
            </router-link>
          </div>
          <div class="btn-s btn-ty-b">
            <router-link to="/magazine">BUTTON</router-link>
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
            <li class="art-item" v-for="(item, index) in mostPopularList" v-bind:key="item.id">
              <div class="popular-txt popular-num">{{ item.id }}</div>
              <div class="pop-art-desc">
                <div class="popular-txt">
                  <router-link :to="`/magazine/${item.link}`">{{ item.tit }}</router-link>
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
              <input type="email" placeholder="Email">
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

</template>

<script>

module.exports = {
  name: 'magazine-list',
  data: () => ({}),
  computed: {
    imgPath() { return this.$store.state.path.img },
    mainMagazineList() {
      return this.$store.state.moduleMagazine.mainMagazineList.slice(0, 7)
    },
    latestMagazine() {
      return this.$store.state.moduleMainPage.latestMagazine
    },
    mostPopularList() {
      return this.$store.state.moduleMainPage.mostPopularList
    }
  }
}
</script>