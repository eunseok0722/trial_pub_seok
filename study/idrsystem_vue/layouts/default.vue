<template>
  <!-- wrapper -->
  <div v-cloak id="wrapper">
    <Nuxt />
  </div>
  <!-- //wrapper -->
</template>

<script>
import commonJs from '~/mixins/mixin'

export default {
  mixins: [commonJs]
}
</script>
