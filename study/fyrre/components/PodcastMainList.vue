<template>
  <section class="section sec-cont-gap">
    <div class="temp-contents">
      <!--   podcast list    -->
      <ul class="section-list">
        <li class="detail-list-wrap section-item" v-for="(item, index) in mainPodcastList" v-bind:key="item.id">
          <div class="podcast-cover-wrap flex-start-center">
            <div class="chart-rank popular-txt">
              {{ item.id }}
            </div>
            <div class="podcast-cover list">
              <router-link :to="`/podcast/${item.id}`">
                <img :src="imgPath+item.url" :alt="item.tit">
                <i class="blind">Podcast 자세히보기</i>
              </router-link>
            </div>
          </div>
          <div class="section-dtl">
            <div class="podcast-tit">
              <div class="post-tit post-ly-ty2">
                <router-link :to="`/podcast/${item.id}`">
                  {{ item.tit }}
                </router-link>
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
                  <router-link :to="`/podcast/${item.id}`">LISTEN</router-link>
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
    imgPath() { return this.$store.state.path.img },
    mainPodcastList() { return this.$store.state.modulePodcast.mainPodcastList }
  }
}
</script>

