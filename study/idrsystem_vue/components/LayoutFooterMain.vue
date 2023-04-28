<!-- Please remove this file from your project -->
<template>
  <!-- main_footer -->
  <footer id="footer" class="main_footer">
    <div class="inner">
      <div class="ft_num_wrap">
        <div
          class="ft_num"
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="300"
        >
          <p class="num_tit">
            <img src="~/assets/images/main/footer_num_1.png" alt="1">
          </p>
          <ul class="dot_ul">
            <li
              v-for="(item, idx) in txtInfo.serviceList"
              :key="idx"
              class="item"
              @click="doRemove(idx)"
            >
              {{ item.txt }}
            </li>
          </ul>
        </div>
        <div
          class="ft_num"
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="600"
        >
          <p class="num_tit">
            <img src="~/assets/images/main/footer_num_2.png" alt="2">
          </p>
          <ul class="dot_ul sm">
            <li>회사명 : {{ txtInfo.name }}</li>
            <li>대표자 : {{ txtInfo.ceo }}</li>
            <li class="no_sep">
              사업자번호 : {{ txtInfo.bizno }}
            </li>
          </ul>
        </div>
        <div
          class="ft_num"
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="900"
        >
          <p class="num_tit">
            <img src="~/assets/images/main/footer_num_3.png" alt="3">
          </p>
          <ul class="dot_ul sm">
            <li>{{ txtInfo.zipcode }}</li>
            <li>{{ txtInfo.addr_v2 }}</li>
            <li>
              대표번호 :
              <a :href="'tel:' + txtInfo.tel">{{ txtInfo.tel }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <p>{{ txtInfo.copyright }}</p>
      </div>
    </div>
  </footer>
  <!-- //main_footer -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutFooterMain',
  computed: {
    ...mapGetters({
      txtInfo: 'modules/companyInfo/getState'
    })
  }
}
</script>
