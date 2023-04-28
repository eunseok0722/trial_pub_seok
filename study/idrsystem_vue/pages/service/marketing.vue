<template>
  <!-- marketing_box -->
  <section class="marketing_box">
    <!--  mobile title, lnb  -->
    <h2 class="cont_tit">
      Service
    </h2>
    <custom-select
      :options="depth2Menu_service"
      :default="depth2Menu_service[1].title"
      :class="{ active: isHeaderActive }"
      class="select"
    />
    <!--  mobile title, lnb  -->
    <!-- sub_bg_wrap -->
    <div class="sub_bg_wrap">
      <img
        v-if="!isMobile"
        src="@/assets/images/service/srvc_sub_bg_02.png"
        alt="AI-Marketing Curator"
      >
      <img
        v-if="isMobile"
        src="@/assets/images/service/srvc_sub_bg_02_m.png"
        alt="E-commerce"
      >
    </div>
    <!-- //sub_bg_wrap -->

    <div class="inner">
      <div
        v-for="(blkItem, idx) in txtInfo.curatorList"
        :key="idx"
        class="blk_item_wrap"
      >
        <p class="blk_label">
          {{ blkItem.label }}
        </p>
        <div class="blk_tit_con">
          <div class="blk_tit" v-html="blkItem.tit" />
          <div class="blk_con">
            <div v-html="blkItem.con" />
            <ul class="dot_ul">
              <li
                v-for="(dotListData, idx2) in blkItem.dotList"
                :key="idx2"
                :class="dotListData.c"
                v-html="dotListData.li"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- //marketing_box -->
</template>

<script>
import { mapGetters } from 'vuex'
import CustomSelect from '~/components/common/CustomSelect.vue'

export default {
  components: {
    CustomSelect
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      isHeaderActive: 'modules/common/isHeaderActive',
      txtInfo: 'modules/serviceData/txtDbService'
    }),
    depth2Menu_service () {
      return this.$store.getters['modules/gnbData/gnbInfo'][1].depth2
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
