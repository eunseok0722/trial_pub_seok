<template>
  <!-- commerce_box -->
  <section class="commerce_box">
    <!--  mobile title, lnb  -->
    <h2 class="cont_tit">
      Service
    </h2>
    <CustomSelect
      :options="depth2Menu_service"
      :default="depth2Menu_service[0].title"
      :class="{ active: isHeaderActive }"
      class="select"
    />
    <!--  mobile title, lnb  -->
    <!-- sub_bg_wrap -->
    <div class="sub_bg_wrap">
      <img
        v-if="!isMobile"
        src="@/assets/images/service/srvc_sub_bg_01.png"
        alt="E-commerce"
      >
      <img
        v-if="isMobile"
        src="@/assets/images/service/srvc_sub_bg_01_m.png"
        alt="E-commerce"
      >
    </div>
    <!-- //sub_bg_wrap -->

    <div class="inner">
      <div class="txt_wrap">
        <p class="tw_1" v-html="txtInfo.ecommerceMainT" />
        <p class="tw_2" v-html="txtInfo.ecommerceDescT" />
      </div>

      <div
        v-for="(blkItemList, i) in txtInfo.ecommerceList"
        :key="i"
        class="blk_item_wrap"
      >
        <p class="blk_label">
          {{ blkItemList.label }}
        </p>
        <div class="blk_tit_con">
          <div class="blk_tit" v-html="blkItemList.tit" />
          <div class="blk_con" v-html="blkItemList.con" />
        </div>
      </div>
    </div>
  </section>
  <!-- //commerce_box -->
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
