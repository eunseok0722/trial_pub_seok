<template>
  <div id="container" ref="container" class="con_works has_wnd_nav">
    <LayoutHeader />

    <LayoutGnb />

    <LayoutLnbWorks />

    <!-- contents | 컨텐츠영역 -->
    <div id="contents">
      <NuxtChild :key="moveKey" />
    </div>
    <!-- //contents | 컨텐츠영역 -->

    <!-- sub_footer -->
    <LayoutFooterWorks />
    <!-- //sub_footer -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutHeader from '~/components/LayoutHeader.vue'
import LayoutGnb from '~/components/LayoutGnb.vue'
import LayoutFooterWorks from '~/components/LayoutFooterWorks.vue'

export default {
  name: 'PageWorks',
  components: {
    LayoutHeader,
    LayoutGnb,
    LayoutFooterWorks
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      moveKey: 'modules/common/moveKey'
    })
  }
}
</script>
