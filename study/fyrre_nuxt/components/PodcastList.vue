<template>
  <div class="temp-contents">
    <!--  podcast list   -->
    <ul class="list-ty3 ">
      <li v-for="item in mainPodcastList" :key="item.id" class="ty-item main-podcast-item">
        <div class="ty-cover">
          <NuxtLink :to="`/podcast/${item.id}`">
            <img :src="require(`~/assets/images/${item.url}`)" :alt="item.tit">
            <i class="blind">Podcast 자세히보기</i>
          </NuxtLink >
        </div>
        <div class="ty-text">
          <div class="article-summary">
            <div class="post-tit">
              <NuxtLink :to="`/podcast/${item.id}`">
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
import {mapGetters} from 'vuex'
export default {
  name: "MainPodcast",
  data: () => ({}),
  computed: {
    ...mapGetters('podcast', {
      mainPodcastList: 'mainPodcastList',
    }),
  }
}
</script>

