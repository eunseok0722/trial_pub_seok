<template>
  <div class="temp-contents">
    <!--  podcast list   -->
    <ul class="list-ty3 ">
      <li class="ty-item main-podcast-item" v-for="(item, index) in mainPodcastList" v-bind:key="item.id">
        <div class="ty-cover">
          <router-link :to="`/podcast/${item.id}`">
            <img :src="imgPath+item.url" :alt="item.tit">
            <i class="blind">Podcast 자세히보기</i>
          </router-link>
        </div>
        <div class="ty-text">
          <div class="article-summary">
            <div class="post-tit">
              <router-link :to="`/podcast/${item.id}`">
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
              <span class="tit-r">Duration</span>
              <span class="txt-r">{{ item.duration }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <!--  //podcast list   -->
  </div>
</template>

<script>
export default {
  name: "MainPodcast",
  data: () => ({}),
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    mainPodcastList() {
      return this.$store.state.modulePodcast.mainPodcastList.slice(0, 3)
    }
  }
}
</script>

