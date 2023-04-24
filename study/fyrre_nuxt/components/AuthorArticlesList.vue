<template>
  <section class="section section-temp sec-main-author">
    <div class="temp-header">
      <div class="author-tit">Articles by <span>{{ authorName }}</span></div>
    </div>

    <div class="temp-contents">
      <!--  Articles by Author List  -->
      <ul class="list-ty2 ty2">
        <li v-for="item in authorArticlesList" :key="item.id" class="ty-item">
          <div class="ty-cover">
            <NuxtLink :to="`/magazine/${item.id}`">
              <img :src="require(`~/assets/images/${item.url}`)" :alt="item.tit">
              <i class="blind">Articles 자세히보기</i>
            </NuxtLink >
          </div>
          <div class="ty-text">
            <div class="article-summary">
              <div class="post-tit">
                <NuxtLink :to="`/magazine/${item.id}`">
                  {{ item.tit }}
                </NuxtLink >
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
  props: {
    authorName: {
      type: String,
      default: '',
    }
  },
  data: () => ({
  }),
  computed: {
    authorArticlesList() {
      return this.$store.state.authors.AuthorArticlesList
    },
  }
}
</script>
