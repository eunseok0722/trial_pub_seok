<!-- Please remove this file from your project -->
<template>
  <!-- works_footer -->
  <div class="sub_footer_wrap">
    <div class="only_m">
      <!-- sub_footer mobile -->
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
            <div class="copyright">
              <p>
                {{ txtInfo.cprt01 }}<br class="only_m">{{ txtInfo.cprt02 }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="btn_top on"
          :class="{ on: txtInfo.scrollY > 0 }"
          @click="scrollTop"
        >
          <button />
        </div>
      </footer>
      <!-- // sub_footer_mobile  -->
    </div>
    <div class="only_pc">
      <!-- sub_footer -->
      <footer id="footer" class="sub_footer_work">
        <div class="ft_info_wrap">
          <ul class="service_ul">
            <li
              v-for="(item, idx) in txtInfo.serviceList"
              :key="idx"
              class="item"
              @click="doRemove(idx)"
            >
              {{ item.txt }}
            </li>
          </ul>
          <ul class="sep_ul">
            <li>회사명 : {{ txtInfo.name }}</li>
            <li>대표자 : {{ txtInfo.ceo }}</li>
            <li class="no_sep">
              {{ txtInfo.addr }}
            </li>
            <li class="no_sep">
              대표번호 :
              <a :href="'tel:' + txtInfo.tel">{{ txtInfo.tel }}</a>
            </li>
            <li class="no_sep">
              사업자번호 : {{ txtInfo.bizno }}
            </li>
          </ul>
          <div class="copyright">
            <p>{{ txtInfo.copyright }}</p>
          </div>
        </div>
      </footer>
      <!-- //sub_footer -->
    </div>
  </div>
  <!-- //works_footer -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutFooterWorks',
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      txtInfo: 'modules/companyInfo/getState'
    })
  }
}
</script>
