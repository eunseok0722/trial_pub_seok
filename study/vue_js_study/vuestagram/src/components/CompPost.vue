<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="`background-image:url(${item.userImage})`" :class="item.filter">
<!--        <img :src="item.userImage" :alt="item.name" :class="item.filter">-->
      </div>
      <span class="profile-name">{{ item.name }}</span>
    </div>
    <div class="post-body" :style="`background-image:url(${item.postImage})`" :class="item.filter"  @click="$store.commit('clkLike', item.id)">
    </div>
    <div class="post-content">
      <p>{{ item.likes }} Likes</p>
      <p><strong>{{ item.name }}</strong> {{ item.content }}</p>
      <p class="date">{{ item.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompPost",
  props: {
    item: Object,
    selectedFilter: String,
  }
}
</script>

<style scoped>

</style>