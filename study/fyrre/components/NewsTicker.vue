<template>
  <div class="marquee-wrap">
    <!--  news-ticker text list  -->
    <ul class="marquee-text">
      <li v-for="(item, idx) in newsTickerList" v-bind:key="item.id">
        <router-link :to="item.path">
          {{ item.txt }}
        </router-link>
      </li>
    </ul>
    <!--  news-ticker text list  -->
  </div>
</template>

<script>
export default {
  name: "NewsTicker",
  props: {
    newsTickerList: Object
  }
}
</script>

