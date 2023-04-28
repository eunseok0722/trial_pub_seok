<template>
  <!-- recruit_box -->
  <section class="recruit_box">
    <!--  mobile title, lnb  -->
    <h2 class="cont_tit">
      Contact
    </h2>
    <custom-select
      :options="depth2Menu_contact"
      :default="depth2Menu_contact[2].title"
      class="select"
      :class="{ active: isHeaderActive }"
    />
    <!--  mobile title, lnb  -->
    <div class="inner">
      <!-- line_bx_wrap -->
      <div class="line_bx_wrap line_bx_01">
        <h5>
          IDR시스템의 <b>{{ txtInfo.recruitInfo[0].tit }}</b>
        </h5>
        <div class="line_bx">
          <p class="txt_desc" v-html="txtInfo.recruitInfo[0].desc" />
          <div class="tag_label_wrap">
            <span
              v-for="(tagList, idx) in txtInfo.recruitInfo[0].list"
              :key="idx"
              class="tag_label"
            >{{ tagList }}</span>
          </div>
        </div>
      </div>
      <!-- //line_bx_wrap -->

      <!-- line_bx_wrap -->
      <div class="line_bx_wrap line_bx_02">
        <h5>
          IDR시스템의 <b>{{ txtInfo.recruitInfo[1].tit }}</b>
        </h5>
        <div class="line_bx">
          <p class="txt_desc" v-html="txtInfo.recruitInfo[1].desc" />
          <ul class="rect_ul type1">
            <li
              v-for="(welfare, idx) in txtInfo.recruitInfo[1].list"
              :key="idx"
            >
              <div class="rect_item">
                <div class="rect">
                  <img class="wif_logo" :src="require('@/assets/images/contact/'+ welfare.img)" alt="복지아이콘">
                </div>
                <p v-html="welfare.con" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- //line_bx_wrap -->

      <!-- line_bx_wrap -->
      <div class="line_bx_wrap line_bx_03">
        <h5>
          IDR시스템의
          <b>{{ txtInfo.recruitInfo[2].tit }}</b>
        </h5>
        <div class="line_bx">
          <p class="txt_desc" v-html="txtInfo.recruitInfo[2].desc" />
          <ul class="rect_ul type2">
            <li
              v-for="(culture, idx) in txtInfo.recruitInfo[2].list"
              :key="idx"
            >
              <div class="rect_item">
                <div class="rect">
                  <span v-html="culture.con" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- //line_bx_wrap -->

      <!-- line_bx_wrap -->
      <div class="line_bx_wrap line_bx_04">
        <h5>
          IDR시스템의 <br class="only_m">
          <b>{{ txtInfo.recruitInfo[3].tit }}</b>
        </h5>
        <div class="line_bx">
          <div class="txt_desc">
            <p v-html="txtInfo.recruitInfo[3].desc" />
            <div class="ex_subject_wrap">
              <p>
                <b>개발파트&nbsp;&nbsp;</b>
                <span class="only_pc"><span class="gray_line" /></span>
                <i>이커머스 시스템구축 Java 개발자 채용</i>
                <small>상시 채용 진행 중</small>
                <span class="only_pc"><span class="gray_line" /></span>
              </p>
            </div>
          </div>

          <ul class="number_ul">
            <li v-for="(join, idx) in txtInfo.recruitInfo[3].list" :key="idx">
              <div class="number_item">
                <span class="number">{{ join.num }}</span>
                <p class="number_con" v-html="join.con" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- //line_bx_wrap -->
    </div>
  </section>
  <!-- //recruit_box -->
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
