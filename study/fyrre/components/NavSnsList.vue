<template>
  <!--  SNS link list  -->
  <ul class="nav-sns-list">
    <li v-for="(item, index) in navSnsItem" v-bind:key="item.id" class="sns-item">
      <a v-bind:href="item.url" target="_blank" title="새창에서 열기">
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
    navSnsItem: Object,
  }
}
</script>

