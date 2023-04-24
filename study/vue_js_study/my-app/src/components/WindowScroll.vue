<template>
  <div class="window-scroll">
    현재 window.scrollY는 {{ scrollY }}입니다.
  </div>
</template>

<script>
export default {
  name: 'WindowScroll',
  computed: {
    scrollY: function () {
      // 사용자 정의 된 인스턴스 속성인 $window의 scrollY값 불러오기
      return this.$window.scrollY
    }
  }
}
</script>

<style scoped>

</style>
