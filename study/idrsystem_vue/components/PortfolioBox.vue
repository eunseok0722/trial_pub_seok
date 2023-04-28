<template>
  <section class="portfolio_box_v2">
    <masonry :cols="{default:4, 1000:3, 700:1, 400:1}" :gutter="{default:'0', 700:'0'}" class="grid">
      <div v-for="(mainPort, idx) in txtInfo.portfolioData" :key="idx" class="msnr_item">
        <a :href="mainPort.link" :target="mainPort.target">
          <div class="ptfl_item" :class="mainPort.type">
            <img :src="require('@/assets/images/main/list_v2/ptfl_thumb_' + mainPort.image + '.png')" :alt="mainPort.alt">
            <div class="ptfl_info" :style="mainPort.css">
              <p v-if="mainPort.label" class="tit_label" v-html="mainPort.label" />
              <p class="tit">
                <span class="tit_sub" v-html="mainPort.title1" />
                <span v-if="mainPort.title2" class="tit_desc" v-html="mainPort.title2" />
              </p>
              <p class="tit_date" v-html="mainPort.period" />
            </div>
          </div>
        </a>
      </div>
      <div class="msnr_item">
        <a href="works/base">
          <div class="ptfl_item more" />
        </a>
      </div>
    </masonry>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry)

export default {
  computed: {
    ...mapGetters({
      txtInfo: 'modules/mainData/getState'
    })
  }
}
</script>
