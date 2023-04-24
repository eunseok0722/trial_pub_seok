<template>
  <div v-for="item in contents" :key="item.number">
    <h5 @click="$router.push('/detail/'+ item.number)">
      <!--      route name과 query 로 연결하는 법   -->
      <!--      <router-link :to="{name: 'CompDetail', query: contents[index] }">{{ item.title }}</router-link></h5>-->
      <!--      path로 연결하는 법  -->
<!--            <router-link :to="`/detail/${item.number}`">{{ item.title }}</router-link>-->
      {{ item.title }}
    </h5>
    <p>{{ item.date }}</p>
  </div>
</template>

<script>
import compDetail from "@/components/CompDetail.vue";

export default {
  name: "CompList",
  computed: {
    compDetail() {
      return compDetail
    }
  },
  props: {
    contents: Array,
  }
}
</script>

<style scoped>

</style>