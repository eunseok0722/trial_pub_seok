<template>
  <div class="temp-contents">
    <!--  magazine | list  -->
    <ul class="list-ty3">
      <transition v-for="item in postsList" :key="item.id" mode="in-out" name="mgzn">
        <li
          v-if="showList(item.category)"
          class="ty-item main-podcast-item">
          <div class="ty3-top">
            <div class="txt-r">{{ item.date }}</div>
            <div class="label-category">
              {{ item.category }}
            </div>
          </div>
          <div class="ty-cover">
            <NuxtLink :to="`/magazine/${item.id}`">
<!--            <NuxtLink to="/">-->
              <img :alt="item.tit" :src="require(`~/assets/images/${item.url}`)">
              <i class="blind">Post 자세히보기</i>
            </NuxtLink >
          </div>
          <div class="ty-text">
            <div class="article-summary">
              <div class="post-tit">
                <NuxtLink :to="`/magazine/${item.id}`">
                  {{ item.tit }}
                </NuxtLink >
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
  name: "MagazineList",
  props: {
    postsList: {
      type: [Array, Object],
      default: () => ({}),
    },
    ctgr: {
      type: String,
      default: 'ALL',
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    showList(state) {
      return this.ctgr === state || this.ctgr === 'ALL'
    }
  }
}
</script>

