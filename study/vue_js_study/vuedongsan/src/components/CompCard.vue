<template>
  <div>
    <img :src="item.image" :alt="item.title" class="room-img">

    <!--  함수 안에 넣고 싶으면  -->
    <!--    <h4 @click="$emit('openModal', item.id)">{{ item.title }}</h4>-->
    <h4 @click="send()">{{ item.title }}</h4>
    <p>{{ item.price }} 만원</p>
    <!--    <p>{{ item.content }}</p>-->
    <!--    <button @click="increase(index)">허위매물신고</button>-->
    <!--    <span>신고수 : {{ item.alert }}</span>-->
  </div>
</template>

<script>
export default {
  name: "CompCard",
  props: {
    item: Object,
    // index: Number,
  },
  methods: {
    send() {
      // $emit을 함수 안에 넣으려면 this가 앞에 와야함
      this.$emit('openModal', this.item.id);
    }
  }
}
</script>

<style scoped>

</style>