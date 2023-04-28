<template>
  <!-- intro_box -->
  <section class="intro_box">
    <!--  mobile title, lnb  -->
    <h2 class="cont_tit">
      Contact
    </h2>
    <custom-select
      :options="depth2Menu_contact"
      :default="depth2Menu_contact[0].title"
      class="select"
      :class="{ active: isHeaderActive }"
    />
    <!--  mobile title, lnb  -->
    <div class="inner">
      <!-- left_bx -->
      <div class="left_bx">
        <!-- numbers_wrap -->
        <ul class="numbers_wrap" data-aos="fade-up">
          <!--
                    <li v-for="(time, idx) in txtInfo.introInfo.time" :key="idx">
            <span class="nmb_num">{{ time.num }}</span>
            <span class="nmb_txt">{{ time.txt }}</span>
          </li>
                    -->
          <li>
            <span class="nmb_num">{{ fromBirthYear }}</span>
            <span class="nmb_txt">년</span>
          </li>
          <li>
            <span class="nmb_num">{{ fromBirthDay }}</span>
            <span class="nmb_txt">일</span>
          </li>
          <li>
            <span class="nmb_num">{{ fromBirthHour }}</span>
            <span class="nmb_txt">시간</span>
          </li>
          <li>
            <span class="nmb_num">{{ fromBirthSecond }}</span>
            <span class="nmb_txt">초</span>
          </li>
        </ul>
        <!-- //numbers_wrap -->

        <div class="txt_wrap" data-aos="fade-up" data-aos-delay="300">
          <p class="tw_1" v-html="txtInfo.introInfo.pageTit" />
          <p class="tw_2" v-html="txtInfo.introInfo.pageDesc" />
        </div>
      </div>
      <!-- //left_bx -->

      <!-- right_bx -->
      <div class="right_bx" data-aos="fade-up" data-aos-delay="500">
        <!-- visual_table -->
        <table cellpadding="0" cellspacing="0" class="visual_table">
          <colgroup>
            <col width="50%">
          </colgroup>
          <tbody>
            <tr>
              <td colspan="2" class="td_img">
                <img
                  class="wif_logo"
                  src="@/assets/images/contact/cntc_img_01.png"
                  alt="모래시계 이미지"
                >
              </td>
            </tr>
            <tr>
              <td
                class="td_bg_1 t_lg"
                v-html="txtInfo.introInfo.tabeDesc1"
              />
              <td
                class="td_bg_2 t_sy"
                v-html="txtInfo.introInfo.tabeDesc2"
              />
            </tr>
            <tr>
              <td
                class="td_bg_3 t_sm"
                v-html="txtInfo.introInfo.tabeDesc3"
              />
              <td class="td_img">
                <img
                  class="wif_logo"
                  src="@/assets/images/contact/cntc_img_02.png"
                  alt="하늘 이미지"
                >
              </td>
            </tr>
          </tbody>
        </table>
        <!-- //visual_table -->
      </div>
      <!-- //right_bx -->
    </div>
  </section>
  <!-- //intro_box -->
</template>

<script>
import { mapGetters } from 'vuex'
import AOS from 'aos'
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
    },
    birthDate () {
      const birthYear =
        this.txtInfo.introInfo.birthYear
      const birthMonth =
        this.txtInfo.introInfo.birthMonth
      const birthDay =
        this.txtInfo.introInfo.birthDay
      const birthDate = new Date(birthYear, birthMonth, birthDay)
      return birthDate
    },
    now () {
      const now = new Date()
      return now
    },
    fromBirthGap () {
      const fromBirthGap = this.now.getTime() - this.birthDate.getTime()
      return fromBirthGap
    },
    fromBirthYear () {
      const birthYear = Math.ceil(
        this.fromBirthGap / (1000 * 60 * 60 * 24 * 365)
      )
      return birthYear.toLocaleString()
    },
    fromBirthDay () {
      const birthDay = Math.ceil(this.fromBirthGap / (1000 * 60 * 60 * 24))
      return birthDay.toLocaleString()
    },
    fromBirthHour () {
      const birthHour = Math.ceil(this.fromBirthGap / (1000 * 60 * 60))
      return birthHour.toLocaleString()
    },
    fromBirthSecond () {
      const birthSecond = Math.ceil(this.fromBirthGap / (1000 * 60))
      return birthSecond.toLocaleString()
    }
  },
  mounted () {
    AOS.init({
      duration: 1200
    })
  }
}
</script>
