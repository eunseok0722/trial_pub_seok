<template>
  <div class="marquee-wrap">
    <!--  news-ticker text list  -->
        <ul class="marquee-text">
          <li v-for="item in newsTickerList" :key="item.id">
            <NuxtLink :to="item.path">
              {{ item.txt }}
            </NuxtLink >
          </li>
        </ul>
    <!--  news-ticker text list  -->
  </div>
</template>

<script>
export default {
  name: "NewsTicker",
  props: {
    newsTickerList: {
      type: [Array, Object],
      default: () => {
        return [
          {id: 1, txt: 'NEWSLETTER+++', path: '/magazine'},
          {id: 2, txt: 'NEWSLETTER+++', path: '/magazine'},
          {id: 3, txt: 'NEWSLETTER+++', path: '/magazine'},
        ]
      },
    }
  }
}
</script>

