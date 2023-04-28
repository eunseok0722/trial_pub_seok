<template>
  <div v-show="gnbModalShow" class="gnb_wrap" :class="{ on: gnbModalShow }">
    <ul class="gnb_menu" :class="{ has_wnd_nav: islnbOn }">
      <li
        v-for="(gnbMenu, idx) in gnbData.gnbInfo"
        :key="idx"
        class="d1_list_item"
        :class="{ on: currentRoutePath.includes(gnbMenu.class), open: gnbMenu.d2Toggle }"
      >
        <template v-if="isMobile">
          <template v-if="!gnbMenu.depth2">
            <a class="d1_item" :href="gnbMenu.href" @click="gnbToggle">
              <span>{{ gnbMenu.title }}</span>
            </a>
          </template>
          <template v-else>
            <a class="d1_item" @click="d2Toggle(idx)">
              <span>{{ gnbMenu.title }}</span>
              <i class="d2_btn" />
            </a>
            <ul class="gnb_d2_menu">
              <li
                v-for="(d2, idx2) in gnbMenu.depth2"
                :key="idx2"
                class="d2_list_item"
              >
                <a class="d2_item" :href="d2.href" @click="gnbToggle">
                  {{ d2.title }}
                </a>
              </li>
            </ul>
          </template>
        </template>
        <template v-else>
          <a class="d1_item" :href="gnbMenu.href" @click="gnbToggle">
            <span>{{ gnbMenu.title }}</span>
          </a>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentRoutePath: this.$route.path
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'modules/common/isMobile',
      gnbData: 'modules/gnbData/getState',
      gnbModalShow: 'modules/gnbData/gnbModalShow'
    }),
    islnbOn () {
      return (
        this.$route.path.includes('/service') ||
        this.$route.path.includes('/contact') ||
        this.$route.path.includes('/works')
      )
    }
  },
  mounted () {
  },
  methods: {
    d2Toggle: function (idx) {
      this.$store.commit('modules/gnbData/d2Toggle', idx)
    }
  }
}
</script>
