<template>
  <div id="container" ref="container" class="con_main type2">
    <LayoutHeader />

    <LayoutGnb />

    <!-- contents | 컨텐츠영역 -->
    <div id="contents">
      <div class="inner">
        <!-- portfolio -->
        <PortfolioBox />
        <!-- //portfolio -->
      </div>
    </div>
    <!-- //contents | 컨텐츠영역 -->

    <!-- footer -->
    <LayoutFooterWorks v-if="isMobile" />
    <LayoutFooterMain v-if="!isMobile" />
    <!-- //footer -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutHeader from '~/components/LayoutHeader.vue'
import LayoutGnb from '~/components/LayoutGnb.vue'
import PortfolioBox from '~/components/PortfolioBox.vue'
import LayoutFooterMain from '~/components/LayoutFooterMain.vue'

export default {
  name: 'PageMain',
  components: {
    LayoutHeader,
    LayoutGnb,
    PortfolioBox,
    LayoutFooterMain
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile'
    })
  },
  mounted () {
    this.$store.commit('modules/worksInfo/setYearIdx', {
      qYear: null,
      qIdx: null,
      qType: null
    })
  }
}
</script>
