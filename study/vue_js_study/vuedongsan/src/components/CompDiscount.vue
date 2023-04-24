<template>
  <div class="discount">
    <h4>지금 결제하면 {{ percent }}% 할인</h4>
  </div>
</template>

<script>
export default {
  name: "CompDiscount",
  data() {
    return {

    }
  },
  props: {
    percent: Number,
  }
}
</script>

<style scoped>
.discount {
  background: #eee;
  color: darkslateblue;
  padding: 10px;
  margin: 20px auto;
  border-radius: 5px;
  max-width: 450px;
}
</style>