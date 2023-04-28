<template>
  <!-- sub_footer -->
  <footer id="footer" class="sub_footer">
    <div class="inner">
      <div class="ft_info_wrap">
        <ul class="service_ul">
          <li>{{ txtInfo.serviceList[0].txt }}</li>
          <li class="sf">
            /
          </li>
          <li>{{ txtInfo.serviceList[1].txt }}</li>
          <li class="sf">
            /
          </li>
          <li>{{ txtInfo.serviceList[2].txt }}</li>
        </ul>
        <div class="only_m">
          <ul class="sep_ul">
            <li>
              <div class="logo-wrap">
                <img :src="require('@/assets/images/common/'+ txtInfo.logo)" alt="IDR 로고">
              </div>
            </li>
            <li class="com-name">
              {{ txtInfo.name }}
            </li>
            <li>{{ txtInfo.addr_v2 }}</li>
            <li class="no_sep">
              대표번호 :
              <a :href="'tel:' + txtInfo.tel">{{ txtInfo.tel }}</a>
            </li>
            <li>사업자번호 : {{ txtInfo.bizno }}</li>
          </ul>
        </div>
        <div class="only_pc">
          <ul class="sep_ul">
            <li>회사명 : {{ txtInfo.name }}</li>
            <li>대표자 : {{ txtInfo.ceo }}</li>
            <li>{{ txtInfo.addr }}</li>
            <li class="no_sep">
              대표번호 :
              <a :href="'tel:' + txtInfo.tel">{{ txtInfo.tel }}</a>
            </li>
            <li>사업자번호 : {{ txtInfo.bizno }}</li>
          </ul>
        </div>
        <div class="copyright">
          <p>{{ txtInfo.cprt01 }}<br class="only_m">{{ txtInfo.cprt02 }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="isMobile"
      class="btn_top"
      :class="{ on: scrollY > 0 }"
      @click="scrollTop"
    >
      <button />
    </div>
  </footer>
  <!-- // sub_footer  -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutFooterSub',
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      txtInfo: 'modules/companyInfo/getState',
      scrollY: 'modules/common/scrollY'
    })
  }
}
</script>
