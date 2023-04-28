<template>
  <!-- works_card -->
  <section
    :id="'works_' + worksBox.id"
    class="works_card"
    :class="worksBox.num"
    :data-num="worksBox.id"
  >
    <!--    <section class="works_card" id="'works_1">-->
    <span class="wif_subject">삼성전자 구축사례</span>
    <span class="wif_tit">삼성전자 주요 사업실적</span>
    <div class="container">
      <!-- line 1 -->
      <div class="card_wrap" data-aos="fade-up">
        <div class="item color1">
          <ul>
            <li class="title">
              2016.07 -2016.10
            </li>
            <li>삼성전자 G-CRM GMC 시스템</li>
            <li>동남아총괄 확산 및</li>
            <li>기능개선 프로젝트</li>
          </ul>
        </div>
        <div class="item color1">
          <ul>
            <li class="title">
              2016.06 -2016.10
            </li>
            <li>삼성전자 G-CRM</li>
            <li>중동총괄 확산 프로젝트</li>
          </ul>
        </div>
        <div class="item color1">
          <ul>
            <li class="title">
              2016.06 -2016.09
            </li>
            <li>삼성전자 G-CRM</li>
            <li>동남아 확산 프로젝트</li>
          </ul>
        </div>
        <div class="item color1">
          <ul>
            <li class="title">
              2015.01 -2016.03
            </li>
            <li>한국총괄 MIF 시스템</li>
            <li>추가 개발 및 운영</li>
          </ul>
        </div>

        <div class="item color2">
          <ul>
            <li class="title">
              2014.12 -2015.10
            </li>
            <li>삼성전자 한국총괄</li>
            <li>DM 시스템 개선</li>
          </ul>
        </div>
        <div class="item color2">
          <ul>
            <li class="title">
              2014.09 -2014.12
            </li>
            <li>G-CRM 시스템</li>
          </ul>
        </div>
        <div class="item color2">
          <ul>
            <li class="title">
              2014.03 -2014.09
            </li>
            <li>삼성전자 GCRM 프로젝트</li>
            <li>멤버십포탈 구축</li>
          </ul>
        </div>
        <div class="item color3">
          <ul>
            <li class="title">
              2013.09 -2013.10
            </li>
            <li>한국총괄 SAMSUNGBLUE</li>
            <li>사이트 및 멤버십 운영</li>
          </ul>
        </div>
        <div class="item color3">
          <ul>
            <li class="title">
              2013.05 - 2014.07
            </li>
            <li>삼성전자 B2B Partner Portal</li>
            <li>구축</li>
          </ul>
        </div>
        <div class="item color3">
          <ul>
            <li class="title">
              2013.05 -2013.06
            </li>
            <li>삼성전자 모바일스토어 구축</li>
          </ul>
        </div>
        <div class="item color3">
          <ul>
            <li class="title">
              2013.03 -2013.07
            </li>
            <li>삼성전자 한국총괄 직영</li>
            <li>온라인 쇼핑몰</li>
            <li>시스템분석/설계</li>
          </ul>
        </div>
        <div class="item color4">
          <ul>
            <li class="title">
              2012.12 -2013.02
            </li>
            <li>한국총괄 등외급 통합</li>
            <li>시스템 개발 용역</li>
          </ul>
        </div>
        <div class="item color4">
          <ul>
            <li class="title">
              2012.05 - 2013.04
            </li>
            <li>한국총괄 프리미엄</li>
            <li>판촉 시스템 개발/운영</li>
          </ul>
        </div>
        <div class="item color4">
          <ul>
            <li class="title">
              2012.04 -2012.08
            </li>
            <li>한국총괄 B2B거래선정보개선</li>
            <li>개발</li>
          </ul>
        </div>
        <div class="item color4">
          <ul>
            <li class="title">
              2012.01 - 2012.05
            </li>
            <li>삼성전자 한국총괄 프리미엄</li>
            <li>판촉 시스템 구축</li>
          </ul>
        </div>
        <div class="item color5">
          <ul>
            <li class="title">
              2011.10 -2013.12
            </li>
            <li>한국총괄 MIF SYSTEM 구축</li>
          </ul>
        </div>
        <div class="item color5">
          <ul>
            <li class="title">
              2011.08 -2011.11
            </li>
            <li>삼성전자 임직원전용</li>
            <li>쇼핑몰 재구축 (패밀리넷)</li>
          </ul>
        </div>
        <div class="item color5">
          <ul>
            <li class="title">
              2011.05 -2011.08
            </li>
            <li>한국총괄 MD쇼핑몰</li>
            <li>컨텐츠 위탁운영</li>
          </ul>
        </div>
        <div class="item color6">
          <ul>
            <li class="title">
              2010.06 -2010.12
            </li>
            <li>삼성모바일디스플레이</li>
            <li>지식경영 고도화</li>
          </ul>
        </div>
        <div class="item color7">
          <ul>
            <li class="title">
              2009.12 -2010.02
            </li>
            <li>삼성전자 임직원전용</li>
            <li>쇼핑몰 구축 (패밀리넷)</li>
          </ul>
        </div>
        <div class="item color7">
          <ul>
            <li class="title">
              2009.08 -2009.12
            </li>
            <li>삼성전자 반도체 CDP 프로젝트</li>
          </ul>
        </div>
        <div class="item color8">
          <ul>
            <li class="title">
              2008.06 -2008.12
            </li>
            <li>Global ERP 연계 프로젝트</li>
          </ul>
        </div>
        <div class="item color8">
          <ul>
            <li class="title">
              2008.02 - 2008.07
            </li>
            <li>삼성전자 반도체 마케팅문서</li>
            <li>통합관리시스템 구축</li>
          </ul>
        </div>
        <div class="item color9">
          <ul>
            <li class="title">
              2007.09 -2008.01
            </li>
            <li>삼성전자 사은품2차 SYSTEM 구축</li>
          </ul>
        </div>
        <div class="item color9">
          <ul>
            <li class="title">
              2007.09 -2007.12
            </li>
            <li>삼성전자 한국총괄</li>
            <li>Anycall 포탈 구축</li>
          </ul>
        </div>
        <div class="item color10">
          <ul>
            <li class="title">
              2006.11 - 2007.02
            </li>
            <li>삼성전자 한국총괄</li>
            <li>사은품관리시스템</li>
          </ul>
        </div>
        <div class="item color10">
          <ul>
            <li class="title">
              2006.08 - 2006.10
            </li>
            <li>삼성전자 한국총괄</li>
            <li>마케팅정보</li>
            <li>통합시스템 구축</li>
          </ul>
        </div>
        <div class="item color10">
          <ul>
            <li class="title">
              2006.03 -2006.07
            </li>
            <li>삼성전자 한국총괄</li>
            <li>임직원포탈 구축</li>
          </ul>
        </div>
        <div class="item color10">
          <ul>
            <li class="title">
              2005.10 - 2006.03
            </li>
            <li>B2B PVI 시스템 구축</li>
          </ul>
        </div>
        <div class="item m_height" />
      </div>

      <!--// card_wrap-->
    </div>
  </section>
  <!-- works_card -->
</template>

<script>
export default {
  props: {
    worksDataList: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    worksBox: function () {
      return this.worksDataList[0]
    }
  },
  mounted () {
    setTimeout(this.callAOS, 100)
  },
  methods: {
  }
}
</script>
