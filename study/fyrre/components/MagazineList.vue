<template>
  <div class="temp-contents">
    <!--  magazine | list  -->
    <ul class="list-ty3">
      <transition name="mgzn" mode="in-out" v-for="(item, index) in postsList" v-bind:key="item.id">
        <li class="ty-item main-podcast-item"
            v-if="showList(item.category)">
          <div class="ty3-top">
            <div class="txt-r">{{ item.date }}</div>
            <div class="label-category">
              {{ item.category }}
            </div>
          </div>
          <div class="ty-cover">
            <router-link :to="{ name:'magazine-post', params: {id: item.id}}">
              <img :src="imgPath+item.url" alt="item.tit">
              <i class="blind">Post 자세히보기</i>
            </router-link>
          </div>
          <div class="ty-text">
            <div class="article-summary">
              <div class="post-tit">
                <router-link :to="`/magazine/${item.id}`">
                  {{ item.tit }}
                </router-link>
              </div>
              <div class="txt-r post-lh">
                {{ item.description }}
              </div>
            </div>
            <ul class="detail-list">
              <li>
                <span class="tit-r">Text</span>
                <span class="txt-r">{{ item.text }}</span>
              </li>
              <li>
                <span class="tit-r">Duration</span>
                <span class="txt-r">{{ item.duration }}</span>
              </li>
            </ul>
          </div>
        </li>
      </transition>
    </ul>
    <!--  //magazine | list  -->
  </div>

</template>

<script>
export default {
  name: "MagazineMain",
  data: () => ({}),
  props: {
    postsList: Object,
    ctgr: String,
  },
  computed: {
    imgPath() {
      return this.$store.state.path.img
    },
    // ctgr() { return this.$store.state.moduleMagazine.ctgr },
  },
  methods: {
    showList(state) {
      return this.ctgr == state || this.ctgr == 'ALL'
    }
  }
}
</script>

