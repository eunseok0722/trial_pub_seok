<template>
  <!-- history -->
  <section class="history_box">
    <!--  mobile title, lnb  -->
    <h2 class="cont_tit">
      Contact
    </h2>
    <custom-select
      :options="depth2Menu_contact"
      :default="depth2Menu_contact[1].title"
      class="select"
      :class="{ active: isHeaderActive }"
    />
    <!--  mobile title, lnb  -->
    <div class="inner">
      <div class="txt_wrap">
        <p class="tw_1" v-html="txtInfo.historyInfo.pageTit" />
        <p class="tw_2" v-html="txtInfo.historyInfo.pageDesc" />
      </div>
      <ul class="history_ul_wrap">
        <li
          v-for="(hisList, idx) in txtInfo.historyInfo.hisListData"
          :key="idx"
          :class="hisList.c"
        >
          <div class="hist_item">
            <span class="year">{{ hisList.year }}</span>
            <p
              v-for="(monList, idx2) in hisList.monList"
              :key="idx2"
              class="desc_line"
            >
              <b>{{ monList.month + '월' }}</b>
              <i>/</i><span v-html="monList.con" />
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <!-- //history -->
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
      txtInfo: 'modules/contactData/txtDbContact'
    }),
    depth2Menu_contact () {
      return this.$store.getters['modules/gnbData/gnbInfo'][3].depth2
    }
  }
}
</script>
