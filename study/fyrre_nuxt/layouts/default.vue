<template>
  <!--start Contents-->

  <div id="app">
    <!-- wrapper -->
    <div id="wrapper">

      <!-- container -->
      <div id="container">
        <!--   header | 머릿말 -->
        <CompHeader></CompHeader>
        <!--   //header | 머릿말   -->

        <!-- contents | 컨텐츠영역 -->
        <Nuxt/>
        <!-- //contents | 컨텐츠영역 -->

      </div>
      <!-- //container -->

      <!--    footer | 꼬릿말  -->
      <CompFooter></CompFooter>
      <!--    //footer | 꼬릿말  -->
    </div>
    <!-- //wrapper -->
  </div>

  <!--end Contents-->
</template>

<script>
// import CompHeader from '~/components/CompHeader.vue'
// import CompFooter from '~/components/CompFooter.vue'


export default {
  name: "DefaultLayout",
  // components: {
  //   CompHeader,
  //   CompFooter,
  // }

}
</script>
