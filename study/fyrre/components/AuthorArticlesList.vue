<template>
  <section class="section section-temp sec-main-author">
    <div class="temp-header">
      <div class="author-tit">Articles by <span>{{ authorName }}</span></div>
    </div>

    <div class="temp-contents">
      <!--  Articles by Author List  -->
      <ul class="list-ty2 ty2">
        <li class="ty-item" v-for="(item, index) in authorArticlesList" v-bind:key="item.id">
          <div class="ty-cover">
            <router-link :to="`/magazine/${item.id}`">
              <img :src="imgPath+item.url" :alt="item.tit">
              <i class="blind">Articles 자세히보기</i>
            </router-link>
          </div>
          <div class="ty-text">
            <div class="article-summary">
              <div class="post-tit">
                <router-link :to="`/magazine/${item.id}`">
                  {{ item.tit }}
                </router-link>
              </div>
            </div>
            <ul class="detail-list">
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
        </li>
      </ul>
      <!--  //Articles by Author List  -->
    </div>
  </section>
</template>

<script>
export default {
  name: "MainAuthor",
  data: () => ({
  }),
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    authorArticlesList() {
      return this.$store.state.moduleAuthors.AuthorArticlesList
    },
  },
  props: {
    authorName: String
  }
}
</script>