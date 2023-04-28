<template>
  <div class="works_swiper_wrap">
    <div :class="'works_wrap_' + qYear">
      <!-- worksType : base -->
      <template v-if="selectedType === 'base'">
        <section
          v-for="(worksBox, idx) in worksDataList"
          :id="'works_' + worksBox.id"
          :key="idx"
          class="works_box"
          :class="worksBox.num"
          :data-num="worksBox.id"
        >
          <!-- works_img_wrap -->
          <div class="works_img_wrap">
            <img
              v-if="worksBox.pc"
              class="only_pc"
              :src="require('@/assets/images/works/'+ worksBox.pc)"
              alt="사이트이미지"
            >
            <img
              v-if="worksBox.mo"
              class="only_m"
              :src="require('@/assets/images/works/'+ worksBox.mo)"
              alt="사이트이미지 모바일"
            >
          </div>
          <!-- //works_img_wrap -->

          <!-- works_info_wrap -->
          <div
            class="works_info_wrap"
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            <p class="wif_date" v-html="worksBox.date" />
            <img
              v-if="worksBox.logo"
              class="wif_logo"
              :class="{ only_pc: worksBox.logo_mo }"
              :src="require('@/assets/images/works/'+ worksBox.logo)"
              alt="로고"
            >
            <img
              v-if="worksBox.logo_mo"
              class="wif_logo only_m"
              :src="require('@/assets/images/works/'+ worksBox.logo_mo)"
              alt="사이트이미지 모바일"
            >
            <p class="wif_subject" v-html="worksBox.title" />
            <div class="wif_detail">
              <p class="wifd_tit" v-html="worksBox.txt" />
              <div v-for="(contentData, idx2) in worksBox.content" :key="idx2">
                <p class="wifd_con">
                  {{ contentData.subTxt }}
                </p>
                <ul class="wifd_con">
                  <li
                    v-for="(listData, idx3) in contentData.list"
                    :key="idx3"
                    v-html="listData.li"
                  />
                </ul>
              </div>
            </div>
          </div>
        <!-- //works_info_wrap -->
        </section>
      </template>
      <!-- //worksType : base -->

      <!-- worksType : free -->
      <worksFree
        v-if="qType == 'free_1'"
        :works-data-list="worksDataList"
      />
      <!-- //worksType : free -->

      <div class="work_btns_wrap">
        <a
          class="btn_pre"
          :class="{ hide: isWorksDataFirst }"
          @click="
            [
              workYearMove(worksDataPre.title, worksDataPre.type)
            ]
          "
          v-html="worksDataPre.title"
        />
        <a
          class="btn_next"
          :class="{ hide: isWorksDataLast }"
          @click="
            [
              workYearMove(worksDataNext.title, worksDataNext.type)
            ]
          "
          v-html="worksDataNext.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import worksFree from '~/components/works/WorksFree.vue'
import CustomPlugin from '~/plugins/custom-plugin'

Vue.use(CustomPlugin)

export default {
  components: {
    worksFree
  },
  data () {
    return {
      qYear: this.$route.query.year,
      qIdx: this.$route.query.idx,
      qType: this.$route.query.type,
      worksDataPreInfo: {
        title: '',
        type: ''
      },
      worksDataNextInfo: {
        title: '',
        type: ''
      },
      isWorksDataFirst: false,
      isWorksDataLast: false,
      lastScrollY: 0,
      timer: null,
      isScroll: true
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      selectedYear: 'modules/worksInfo/selectedYear',
      selectedIdx: 'modules/worksInfo/selectedIdx',
      selectedType: 'modules/worksInfo/selectedType',
      currentYearNum: 'modules/worksInfo/setStartYear',
      worksData: 'modules/worksData/getState'
    }),
    worksDataList: function () {
      if (this.checkQryYear()) {
        return this.$store.getters['modules/worksData/year' + this.qYear].contents
      } else {
        return this.$store.getters['modules/worksData/year' + this.currentYearNum].contents
      }
    },
    worksDataPre () {
      return this.worksDataPreInfo
    },
    worksDataNext () {
      return this.worksDataNextInfo
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (this.checkQryYear()) {
        this.$store.commit('modules/worksInfo/setYearIdx', {
          qYear: this.qYear,
          qIdx: this.qIdx,
          qType: this.qType
        })
      } else {
        this.$store.commit('modules/worksInfo/setYearIdx', {
          qYear: this.currentYearNum,
          qIdx: '1',
          qType: 'base'
        })
      }
      if (this.qIdx !== 1) {
        setTimeout(this.scrollToAnchor, 100)
      }
      this.getWorksDataIdxInfo()
    })
    setTimeout(this.callAOS, 100)
    window.addEventListener('load', this.getHeight)
  },
  updated () {
    this.$nextTick(function () {
      this.getHeight()
    })
  },
  beforeDestroy () {
    window.removeEventListener('load', this.getHeight)
  },
  methods: {
    // 100vh 넘는 콘텐츠에 대한 동적 높이 구현
    getHeight: function () {
      if (this.isMobile) {
        const works = document.getElementsByClassName('works_box')
        let child, childHeight, logo, imgHeight
        for (let i = 0; i < works.length; i++) {
          imgHeight = parseInt(document.body.clientWidth * 1.2)
          // console.log(imgHeight);
          logo = works[i].querySelectorAll('.wif_logo')
          child = works[i].querySelector('.wif_detail')
          child.style.top = imgHeight + 'px'
          for (let j = 0; j < logo.length; j++) {
            logo[j].style.top = imgHeight + 2 + 'px'
          }
          childHeight = child.offsetHeight + child.offsetTop + 50
          if (works[i].offsetHeight < childHeight) {
            works[i].style.height = childHeight + 'px'
          }
        }
      }
    },
    getYearNum: function () {
      return new Date().getFullYear()
    },
    setInitialSlide: function (payload) {
      this.$store.commit('modules/worksInfo/setInitialSlide', payload)
    },
    checkQryYear () {
      if (this.qYear) {
        return true
      } else {
        return false
      }
    },
    scrollToAnchor: function () {
      this.commonScrollToAnchor(this.qIdx)
    },
    getWorksDataIdxInfo: function () {
      const arrayWorksData = Object.keys(this.worksData)
      let currentIdx = 0
      for (let i = 0; i < arrayWorksData.length; i++) {
        if (
          this.$store.getters['modules/worksData/' + arrayWorksData[i]].title ===
          this.selectedYear
        ) {
          currentIdx = i
          if (i === 0) {
            this.isWorksDataFirst = true
          }
          if (i === arrayWorksData.length - 1) {
            this.isWorksDataLast = true
          }
        }
      }
      if (currentIdx > 0) {
        const preData =
          this.$store.getters['modules/worksData/' + arrayWorksData[currentIdx - 1]]
        this.worksDataPreInfo = preData
      }
      if (currentIdx < arrayWorksData.length - 1) {
        const nextData =
          this.$store.getters['modules/worksData/' + arrayWorksData[currentIdx + 1]]
        this.worksDataNextInfo = nextData
      }
    },
    workYearMove: function (selectedYear, worksType) {
      this.$router.push({
        path: '/works/base',
        query: { year: selectedYear, idx: 1, type: worksType }
      })
      window.scrollTo(0, 0)
      this.$store.commit('modules/common/incrementMoveKey')
      this.$store.commit('modules/gnbData/gnbModalToggle', false)
    }
    // scrollDir: function () {
    //   this.$nextTick(function () {
    //     if (this.pcOnly) {
    //       if (this.timer === null) {
    //         //   scrollDir s
    //         // console.log(e);
    //         // 페이지 현재 위치 index값 저장
    //         let curIdx = this.selectedIdx;
    //         // 이동할 위치의 scroll top
    //         let targetScroll;
    //         // 현재 scrollY 값 저장
    //         let scrollY = window.scrollY;
    //         // 지난 scrollY 값과 비교하여 스크롤 방향 확인
    //         let delta = scrollY - this.lastScrollY;
    //
    //         // 현재 보고 있는 페이지의 offset top 값 저장
    //         let curIdxTop = document.querySelector(
    //           '#works_' + String(curIdx)
    //         ).offsetTop;
    //         // 현재 연도의 worksData 길이
    //         let worksDataLength = this.worksDataList.length;
    //         // 이동할 페이지의 offset top 값
    //         let blkWorks;
    //         // 스크롤 아래로 내릴 경우
    //         if (delta > 0) {
    //           // 스크롤 높이가 목표 위치보다 클경우
    //           if (scrollY > curIdxTop) {
    //             if (curIdx <= worksDataLength) {
    //               curIdx++;
    //             }
    //           }
    //           // 스크롤 다운 동작 구현
    //           if (curIdx <= worksDataLength) {
    //             if (curIdx > 0) {
    //               blkWorks = document.querySelector('#works_' + String(curIdx));
    //               targetScroll = blkWorks.offsetTop;
    //               window.scrollTo({
    //                 left: 0,
    //                 top: targetScroll,
    //                 behavior: 'smooth',
    //               });
    //             }
    //           } else if (curIdx > worksDataLength) {
    //             // workslist를 넘어갈 경우 최하단으로 이동
    //             window.scrollTo({
    //               left: 0,
    //               top: document.body.scrollHeight,
    //               behavior: 'smooth',
    //             });
    //           }
    //         } else if (delta < 0) {
    //           // 스크롤 위로 올릴 경우
    //           if (scrollY < curIdxTop) {
    //             if (curIdx >= 1) {
    //               curIdx--;
    //             }
    //           }
    //           // 스크롤 업 동작 구현
    //           if (curIdx >= 1) {
    //             blkWorks = document.querySelector('#works_' + String(curIdx));
    //             targetScroll = blkWorks.offsetTop;
    //             window.scrollTo({
    //               left: 0,
    //               top: targetScroll,
    //               behavior: 'smooth',
    //             });
    //           } else if (curIdx <= 0) {
    //             window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    //           }
    //         }
    //         // 현재 scrollY 값 lastScrollY 값에 저장
    //         this.lastScrollY = scrollY;
    //         this.timer = setTimeout(() => {
    //           this.timer = null;
    //         }, 600);
    //         //   scrollDir e
    //       }
    //     }
    //   });
    // },
  }
}
</script>
