<template>
  <section class="section section-temp sec-main-author">
    <div class="temp-header">
      <div class="section-tit">AUTHOR</div>
      <div class="btn-view-more">
        <router-link to="/authors">ALL AUTHORS</router-link>
      </div>
    </div>
    <div class="temp-contents">
      <!--   Author list   -->
      <ul class="list-ty2">
        <li class="ty-item" v-for="(item, index) in mainAuthorList" v-bind:key="item.id">
          <div class="ty-cover">
            <router-link :to="`/authors/${item.id}`">
              <img :src="imgPath+item.url" :alt="item.name">
              <i class="blind">Author 자세히보기</i>
            </router-link>
          </div>
          <div class="ty-text">
            <div class="article-summary">
              <div class="post-tit">
                <router-link :to="`/authors/${item.id}`">
                  {{ item.name }}
                </router-link>
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
</template>

<script>
export default {
  name: "MainAuthor",
  data: () => ({}),
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    mainAuthorList() {
      return this.$store.state.moduleAuthors.mainAuthorList
    }
  }

}
</script>

