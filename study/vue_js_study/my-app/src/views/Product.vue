<template>
  <div class="product">
    <h1>{{ detail.name }}</h1>
    <p>이 페이지는 ID. {{ $route.params.id }}의 상세 정보를 출력합니다.</p>
    <nav class="nav">
      <router-link :to="{ name: 'product-home' }" exact>상품 상세</router-link>

      <!-- 이름을 정하지 않을 경우 -->
      <router-link :to="`/product/${ id }/review`">리뷰</router-link>
      <!-- 이름 있는 라우트를 사용할 경우 -->
      <router-link :to="{ name: 'product-review' }" exact>리뷰</router-link>
    </nav>
    <!-- 여기에 자식이 들어감 -->
    <router-view/>
  </div>
</template>
<!--기존버전 template -->
<!--<template>-->

<!--  <div class="product" v-if="item" key="product">-->
<!--    <h1>{{ detail.name }}</h1>-->
<!--    <dl class="product-table">-->
<!--      <dt>상품 이름</dt>-->
<!--      <dd>{{ item.name }}</dd>-->
<!--      <dt>가격</dt>-->
<!--      <dd>{{ item.price }}원</dd>-->
<!--      <dt>상품 설명</dt>-->
<!--      <dd>{{ item.content }}</dd>-->
<!--    </dl>-->
<!--  </div>-->
<!--  <div v-else key="loading">상품 정보를 읽어 들이고 있습니다...</div>-->
<!--</template>-->

<script>
// 기존버전. api 를 직접 불러와서 해당 자료를 이용
// import products from '@/api/products.js'
// 변경버전. vuex의 store를 이용해서 store/product.js의 내용을 이용
import {
  mapGetters
} from 'vuex'

export default {
  props: {
    id: Number
  },
  // 기존버전. api의 데이터 직접 가져왔었음
  // data () {
  //   return {
  //     item: null
  //   }
  // },
  // 변경버전 vuex의 내용을 computed 산출속성으로 가져옴
  computed: mapGetters('product', ['detail']),
  watch: {
    id: {
      handler () {
        // 기존내용. products.js에서 내용 비동기로 받이와서 저장하기
        // products.asyncFind(this.id, item => {
        //   this.item = item
        // })
        //  변경버전 vuex 이용 product 모듈의 load 뮤테이션을 this. id를 받아서 수행
        this.$store.dispatch('product/load', this.id)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    // 부모를 이동할 떄 상품 상세 데이터 제거하기
    this.$store.dispatch('product/destroy')
  }
}
</script>

<style scoped>

</style>
