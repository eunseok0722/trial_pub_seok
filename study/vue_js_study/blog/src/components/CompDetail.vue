<template>
  <div class="contents">
    <section>
      <h5>{{ item.title }} 상세페이지</h5>
      <p>{{ item.date }}</p>
      <p>{{ item.content }}</p>

      <button @click="$router.push({name: 'CompList'})">리스트</button>
      <!--   뒤로가기 쉽게 하는 방법    -->
      <!--      <button @click="$router.go(-1)">리스트</button>-->

      <div class="mt-5">
        <router-link to="/detail/0/author" class="p-3">작가소개</router-link>
        <router-link to="/detail/0/comment" class="p-3">댓글</router-link>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CompDetail",
  data() {
    return {
      item: this.contents[this.id],
    }
  },
  props: {
    contents: Array,
    id: String,
  },
  created() {
  },

}
</script>

<style scoped>

</style>