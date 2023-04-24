<template>
  <div class="filter-1" :class="filter" :style="`background-image:url(${imgUrl})`" @click="fire(filter)">
    <!--  슬롯 자식요소에 slot 태그 작성  -->
<!--    <slot name="a"></slot>-->
    <slot name="b"></slot>
    <!--  네임드 슬롯이라고 함 슬롯에는 html을 전송할 수 있기 때문에 html을 전송할 용도로 사용  -->

    <!--   slot props 문법 : 부모가 자식데이터가 필요한 경우       -->
<!--    <slot :msg="msg"></slot>-->
<!--  위와 같이 작명을 해서 자식에서 부모로 보낸다.  -->

<!--  mitt 사용예제  -->
<!--    <button @click="fire">버튼</button>-->

  </div>
</template>

<script>
export default {
  name: "FilterBox",
  data() {
    return {
      msg: 'hello'
    }
  },
  props: {
    imgUrl: String,
    filter: String,
  },
  methods: {
    // mitt 사용하는 법
    fire(data) {
      // mitt를 사용해서 seletedFilter라는 이벤트를 실행
      // this.emitter.emit('EventName', 'Data')
      this.emitter.emit('selectedFilter', data)
    }
  }
}
</script>

<style scoped>

</style>