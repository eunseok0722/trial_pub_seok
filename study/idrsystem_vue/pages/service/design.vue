<template>
  <!-- design_box -->
  <section class="design_box">
    <!--  mobile title, lnb  -->
    <h2 class="cont_tit">
      Service
    </h2>
    <custom-select
      :options="depth2Menu_service"
      :default="depth2Menu_service[2].title"
      :class="{ active: isHeaderActive }"
      class="select"
    />
    <!--  mobile title, lnb  -->

    <!-- sub_bg_wrap -->
    <div class="sub_bg_wrap">
      <img
        v-if="!isMobile"
        src="@/assets/images/service/srvc_sub_bg_03.png"
        alt="UX/UI Design"
      >
      <img
        v-if="isMobile"
        src="@/assets/images/service/srvc_sub_bg_03_m.png"
        alt="UX/UI Design"
      >
    </div>
    <!-- //sub_bg_wrap -->

    <div class="inner">
      <div
        v-for="(blkItem, idx) in txtInfo.designList"
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
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- //design_box -->
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
  }
}
</script>
