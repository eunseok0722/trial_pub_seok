<template>
  <!--  SNS link list  -->
  <ul class="nav-sns-list">
    <li v-for="item in navSnsItem" :key="item.id" class="sns-item">
      <a :href="item.url" target="_blank" title="새창에서 열기">
        <div :class="item.class"></div>
      </a>
    </li>
  </ul>
  <!--  //SNS link list  -->
</template>

<script>
export default {
  name: "NavSnsList",
  props: {
    navSnsItem: {
      type: [Array, Object],
      default: () => {}
    },
  }
}
</script>

