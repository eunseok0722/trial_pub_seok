<template>
  <section class="section sec-cont-gap">
    <div class="temp-contents">
      <!--   podcast list    -->
      <ul class="section-list">
        <li v-for="item in mainPodcastList" :key="item.id" class="detail-list-wrap section-item">
          <div class="podcast-cover-wrap flex-start-center">
            <div class="chart-rank popular-txt">
              {{ item.id }}
            </div>
            <div class="podcast-cover list">
              <NuxtLink :to="`/podcast/${item.id}`">
                <img :src="require(`~/assets/images/${item.url}`)" :alt="item.tit">
                <i class="blind">Podcast 자세히보기</i>
              </NuxtLink >
            </div>
          </div>
          <div class="section-dtl">
            <div class="podcast-tit">
              <div class="post-tit post-ly-ty2">
                <NuxtLink :to="`/podcast/${item.id}`">
                  {{ item.tit }}
                </NuxtLink >
              </div>
            </div>
            <ul class="detail-list dtl-list">
              <li class="dtl-item">
                <span class="tit-r">Date</span>
                <span class="txt-r">{{ item.date }}</span>
              </li>
              <li class="dtl-item">
                <span class="tit-r">Duration</span>
                <span class="txt-r">{{ item.duration }}</span>
              </li>
              <li class="dtl-item">
                <div class="btn-view-more">
                  <NuxtLink :to="`/podcast/${item.id}`">LISTEN</NuxtLink >
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <!--   podcast list    -->
    </div>
  </section>
</template>

<script>
export default {
  name: "PodcastList",
  data: () => ({}),
  computed: {
    mainPodcastList() { return this.$store.state.podcast.mainPodcastList }
  }
}
</script>

