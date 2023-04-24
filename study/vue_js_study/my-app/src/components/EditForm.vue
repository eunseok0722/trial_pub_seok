<template>
  <div>
    <div class="edit-form">
      <input type="text" :value="message" @input="doUpdate">
    </div>
    <div class="edit">
      <input v-model="message">
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  computed: {
    // message () { return this.$store.getters.message }
    //  하나의 산출 속성에서 입출력을 하면 간단하게 해결
    message: {
      get () {
        return this.$store.getters.message
      },
      set (value) {
        this.$store.dispatch('doUpdate', value)
      }
    }
  },
  methods: {
    doUpdate (event) {
      // input의 값을 기반으로 디스패치하기
      this.$store.dispatch('doUpdate', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>
