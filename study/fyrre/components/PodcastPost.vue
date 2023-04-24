<template>
  <!-- contents | 컨텐츠영역 -->
  <div id="content">
    <!--  section | post title -->
    <section class="section">
      <div class="flex-space-center post-top">
        <div class="btn-go-back">
          <a v-on:click="$router.go(-1)">GO BACK</a>
        </div>
        <div class="post-tit">
          PODCAST
        </div>
      </div>
    </section>
    <!--  //section | post title -->
    <!--  section | main-contents -->
    <section class="section sec-post-cont">
      <!--  post infomation    -->
      <div class="podcast-info">
        <div class="post-profile-wrap">
          <div class="post-cover-img">
            <img :src="imgPath+fndCont.coverImg" :alt="fndCont.tit">
          </div>
          <div class="profile-name">
            <div class="name-wrap flex-space-center">
              <span class="post-sub-tit">Listen On</span>
              <div class="nav-sns">
                <!--  music app list  -->
                <ul class="nav-sns-list ty2">
                  <li v-for="(item, index) in navListenItem" v-bind:key="item.id" class="sns-item">
                    <a v-bind:href="item.url" target="_blank" title="새창에서 열기">
                      <div :class="item.class"></div>
                    </a>
                  </li>
                </ul>
                <!--  //music app list  -->
              </div>
            </div>
          </div>
        </div>
        <div class="article-info">
          <ul class="article-info-list">
            <li class="info-item flex-space-center">
              <span class="tit-l">Date</span>
              <span class="txt-l">{{ fndCont.date }}</span>
            </li>
            <li class="info-item flex-space-center">
              <span class="tit-l">Read</span>
              <span class="txt-l">{{ fndCont.duration }}</span>
            </li>
            <li class="info-item flex-space-center">
              <span class="tit-l">Share</span>
              <div class="nav-sns">
                <nav-sns-list :nav-sns-item="navSnsItem"></nav-sns-list>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--  //post infomation    -->
      <!--   post content   -->
      <div class="post-cont-wrap">
        <div class="post-hl">
          <div class="post-hl-tit">
            <div class="tit-l">
              EPISODE 01
            </div>
            <div class="hl-tit-s">
              {{ fndCont.tit }}
            </div>
          </div>
          <div class="post-description post-sub-tit post-lh">
            {{ fndCont.postBold01 }}
          </div>
        </div>
        <div class="post-cont">
          <div class="post-text txt-l post-lh" v-html="fndCont.postText01">
          </div>
          <div class="post-callout">
            <div class="callout-cont-wrap">
              <div class="ornament">“</div>
              <div class="callout-text">
                <div class="callout-tit article-tit post-ly-ty2" v-html="fndCont.calloutMessage">
                </div>
                <div class="callout-from txt-r" v-html="fndCont.calloutFrom">
                  Nelson Mandela
                </div>
              </div>
            </div>
          </div>
          <div class="post-text txt-l post-lh" v-html="fndCont.postText02">
          </div>
        </div>
      </div>
      <!--   //post content   -->
    </section>
    <!--  //section | main-contents -->
    <!--  section | latest podcast -->
    <section class="section section-temp sec-main-podcast">
      <div class="temp-header">
        <div class="section-tit">Latest Episodes</div>
        <div class="btn-view-more">
          <router-link to="/podcast">ALL EPISODES</router-link>
        </div>
      </div>
      <!--  podcast list component -->
      <podcast-list></podcast-list>
      <!--  //podcast list component  -->
    </section>
    <!--  //section | latest podcast -->
  </div>
</template>

<script>
import PodcastList from './PodcastList.vue'
import NavSnsList from "../components/NavSnsList.vue";

export default {
  name: "PodcastPost",
  data: () => ({}),
  props: {
    id: Number
  },
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    navListenItem() {
      return this.$store.state.navListenItem
    },
    navSnsItem() {
      return this.$store.state.navSnsItem.slice(0, 3)
    },
    fndCont(id) {
      let dataBase = this.$store.state.modulePodcast.podcastCont;
      for (let i = 0; i < dataBase.length; i++) {
        // console.log(dataBase[i].id);
        if (dataBase[i].id === this.id) {
          return dataBase[i];
        }
      }
    }
  },
  components: {
    'podcast-list': PodcastList,
    'nav-sns-list': NavSnsList,
  }
}
</script>

