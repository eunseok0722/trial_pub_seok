<template>
  <section class="section sec-cont-gap-s">
    <div class="temp-contents">
      <!--   Authors list   -->
      <ul class="section-list">
        <li v-for="item in mainAuthorList" :key="item.id" class="detail-list-wrap section-item">
          <div class="author-profile-wrap flex-start-center">
            <div class="profile-img ty2">
              <NuxtLink :to="`/authors/${item.id}`">
                <img :src="require(`~/assets/images/${item.url}`)" :alt="item.name">
                <i class="blind">Podcast 자세히보기</i>
              </NuxtLink >
            </div>
          </div>
          <div class="section-dtl">
            <div class="podcast-tit">
              <div class="post-tit post-ly-ty2">
                <NuxtLink :to="`/authors/${item.id}`">
                  {{ item.name }}
                </NuxtLink >
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
                  <NuxtLink :to="`/authors/${item.id}`">ABOUT</NuxtLink >
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
    mainAuthorList() {
      return this.$store.state.authors.mainAuthorList
    },
  },
}
</script>

