<template>
  <section class="section">
    <div class="flex-space-center post-top">
      <div class="btn-go-back">
        <a v-on:click="$router.go(-1)">GO BACK</a>
      </div>
      <div class="post-tit">
        AUTHOR
      </div>
    </div>
  </section>
  <!--  section | main-contents -->
  <section class="section sec-post-cont">
    <!--  Author information  -->
    <div class="podcast-info ty2">
      <div class="post-profile-wrap">
        <div class="post-cover-img">
          <img :src="imgPath+fndCont.profileImg" :alt="fndCont.text">
        </div>
      </div>
      <div class="article-info">
        <div class="info-item flex-space-center">
          <span class="tit-l">FOLLOW</span>
          <div class="nav-sns">
            <!--    SNS link component        -->
            <nav-sns-list :nav-sns-item="navSnsItemTy2"></nav-sns-list>
            <!--    //SNS link component        -->
          </div>
        </div>
      </div>
    </div>
    <!--  Author information  -->
    <!--  post contents  -->
    <div class="post-cont-wrap">
      <div class="post-hl">
        <div class="post-hl-tit">
          <div class="section-tit">
            {{ fndCont.text }}
          </div>
        </div>
        <div class="post-description post-sub-tit post-lh">
          {{ fndCont.postBold01 }}
        </div>
      </div>
      <div class="post-cont">
        <div class="post-text txt-l post-lh" v-html="fndCont.postText01">
        </div>
      </div>
    </div>
    <!--  post contents  -->
  </section>
  <!--  //section | main-contents -->
  <!--  author articles list component -->
  <author-articles-list :author-name="fndCont.text"></author-articles-list>
  <!--  //author articles list component -->
</template>

<script>
import AuthorArticlesList from "../components/AuthorArticlesList.vue";
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
    navSnsItemTy2() {
      return this.$store.state.navSnsItem.slice(0, 3)
    },
    fndCont() {
      let dataBase = this.$store.state.moduleAuthors.authorCont;
      for (let i = 0; i < dataBase.length; i++) {
        if (dataBase[i].id === this.id) {
          return dataBase[i];
        }
      }
    }
  },
  components: {
    'author-articles-list': AuthorArticlesList,
    'nav-sns-list': NavSnsList,
  }
}
</script>

