<template>
  <!-- section | headline   -->
  <section class="section">
    <!--  Depth name, go back btn  -->
    <div class="flex-space-center post-top">
      <div class="btn-go-back">
        <a v-on:click="$router.go(-1)">GO BACK</a>
      </div>
      <div class="post-tit">
        MAGAZINE
      </div>
    </div>
    <!--  //Depth name, go back btn  -->
    <!-- post headline -->
    <div class="mgzn-post-hl">
      <!--  headline-text  -->
      <div class="headline-wrap">
        <div class="hl-cont">
          <div class="hl-tit">
            {{ fndCont.tit }}
          </div>
          <div class="hl-txt">
            <div class="hl-desc">
              {{ fndCont.headlineDescription }}
            </div>
          </div>
        </div>
        <div class="article-detail">
          <div>
            <ul class="detail-list">
              <li>
                <span class="tit-r">Text</span>
                <span class="txt-r">{{ fndCont.text }}</span>
              </li>
              <li>
                <span class="tit-r">Date</span>
                <span class="txt-r">{{ fndCont.date }}</span>
              </li>
              <li>
                <span class="tit-r">Read</span>
                <span class="txt-r">{{ fndCont.duration }}</span>
              </li>
            </ul>
          </div>
          <div class="label-category">
            {{ fndCont.category }}
          </div>
        </div>
      </div>
      <!--  // headline-text  -->
      <!--        headline-image            -->
      <div class="mgzn-post-hl-img">
        <img :src="imgPath+fndCont.bannerImg"
             :alt="fndCont.tit">
      </div>
      <!--        //headline-image            -->
    </div>
    <!-- //post headline -->
  </section>
  <!-- //section | headline   -->
  <!--  section | main-contents -->
  <section class="section sec-mgzn-post-cont">
    <!--  post information box  -->
    <div class="author-info">
      <div class="author-profile">
        <div class="profile-img">
          <router-link :to="`/authors/${fndCont.id}`">
            <img :src="imgPath+fndCont.profileImg"
                 :alt="fndCont.text">
            <i class="blind">자세히 보기</i>
          </router-link>
        </div>
        <div class="profile-name">
          <router-link :to="`/authors/${fndCont.id}`" class="post-tit post-ly-ty2">
            {{ fndCont.text }}
          </router-link>
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
            <span class="txt-l">2 Min</span>
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
    <!--  //post information box  -->
    <!--  post contents  -->
    <div class="post-cont">
      <div class="post-bold post-sub-tit post-lh">
        {{ fndCont.postBold01 }}
      </div>
      <div class="post-text txt-l post-lh" v-html="fndCont.postText01">
      </div>
      <div class="post-callout">
        <div class="callout-cont-wrap">
          <div class="ornament">“</div>
          <div class="callout-text">
            <div class="callout-tit article-tit post-ly-ty2" v-html="fndCont.calloutMessage">
            </div>
            <div class="callout-from txt-r" v-html="fndCont.calloutFrom">
            </div>
          </div>
        </div>
      </div>
      <div class="post-bold post-sub-tit post-lh" v-html="fndCont.postBold02">
      </div>
      <div class="post-text txt-l post-lh" v-html="fndCont.postText02">
      </div>
    </div>
    <!--  //post contents  -->
  </section>
  <!--  //section | main-contents -->

  <!--  section | latest posts list -->
  <section class="section section-temp sec-cont-gap">
    <div class="temp-header">
      <div class="section-tit">LATEST POSTS</div>
      <div class="btn-view-more">
        <router-link to="/magazine">SEE ALL</router-link>
      </div>
    </div>
    <!--  post list component -->
    <magazine-list :posts-list="mainMagazineList" :ctgr="ctgr"></magazine-list>
    <!--  //post list component  -->
  </section>
  <!--  //section | latest posts list -->

</template>

<script>
import MagazineList from './MagazineList.vue';
import NavSnsList from "../components/NavSnsList.vue";

export default {
  name: "MagazinePost",
  data: () => ({}),
  props: {
    id: Number
  },
  computed: {
    ctgr() {
      return 'ALL'
    },
    imgPath() {
      return this.$store.state.path.img
    },
    navSnsItem() {
      return this.$store.state.navSnsItem.slice(0, 3)
    },
    mainMagazineList() {
      return this.$store.state.moduleMagazine.mainMagazineList.slice(0, 3)
    },
    fndCont() {
      let dataBase = this.$store.state.moduleMagazine.magazineCont;
      for (let i = 0; i < dataBase.length; i++) {
        if (dataBase[i].id === this.id) {
          return dataBase[i];
        }
      }
    }
  },

  components: {
    'magazine-list': MagazineList,
    'nav-sns-list': NavSnsList,
  }
}
</script>

