<template>
  <div id="container" ref="container" class="con_contact has_wnd_nav">
    <LayoutHeader />

    <LayoutGnb />

    <!-- contents | 컨텐츠영역 -->
    <div id="contents">
      <NuxtChild />
    </div>
    <!-- //contents | 컨텐츠영역 -->

    <!-- sub_footer -->
    <LayoutFooterSub />
    <!-- //sub_footer -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutHeader from '~/components/LayoutHeader.vue'
import LayoutGnb from '~/components/LayoutGnb.vue'
import LayoutFooterSub from '~/components/LayoutFooterSub.vue'

export default {
  name: 'PageContact',
  components: {
    LayoutHeader,
    LayoutGnb,
    LayoutFooterSub
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile'
    })
  }
}
</script>
