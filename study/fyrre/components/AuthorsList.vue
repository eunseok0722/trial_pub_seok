<template>
  <section class="section sec-cont-gap-s">
    <div class="temp-contents">
      <!--   Authors list   -->
      <ul class="section-list">
        <li class="detail-list-wrap section-item" v-for="(item, index) in mainAuthorList" v-bind:key="item.id">
          <div class="author-profile-wrap flex-start-center">
            <div class="profile-img ty2">
              <router-link :to="`/authors/${item.id}`">
                <img :src="imgPath+item.url" :alt="item.name">
                <i class="blind">Podcast 자세히보기</i>
              </router-link>
            </div>
          </div>
          <div class="section-dtl">
            <div class="podcast-tit">
              <div class="post-tit post-ly-ty2">
                <router-link :to="`/authors/${item.id}`">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <ul class="detail-list dtl-list">
              <li class="dtl-item">
                <span class="tit-r">Job</span>
                <span class="txt-r">{{ item.job }}</span>
              </li>
              <li class="dtl-item">
                <span class="tit-r">City</span>
                <span class="txt-r">{{ item.city }}</span>
              </li>
              <li class="dtl-item">
                <div class="btn-view-more">
                  <router-link :to="`/authors/${item.id}`">ABOUT</router-link>
                </div>
              </li>
            </ul>
            <!--   //Authors list   -->
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "PodcastList",
  data: () => ({}),
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    mainAuthorList() {
      return this.$store.state.moduleAuthors.mainAuthorList
    },
  },
}
</script>

