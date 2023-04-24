<template>
  <div class="filter-categories">
    <div class="tit-l">CATEGORIES</div>
    <!--  category list   -->
    <ul class="ctgy-list">
      <li v-for="(item, index) in categoriesList" :key="item.id" class="category-item">
        <div
            :class="{'label-category': true, 'active': item.ctgrActive}"
             @click="ctgrState(item.category); ctgrActivate(index)">
          <button>{{ item.category }}</button>
        </div>
      </li>
    </ul>
    <!--  //category list   -->
  </div>
</template>

<script>
// import {mapMutations} from 'vuex'
export default {
  name: "CompCategories",
  data: () => ({}),
  computed: {
    categoriesList() {
      return this.$store.state.magazine.categoriesList
    }
  },
  methods: {
    // ...mapMutations('magazine', [
    //   `this.ctgrState(state)`,
    //   `this.ctgrActivate(index)`,
    // ]),
    ctgrState(state) {
      this.$store.commit('magazine/ctgrState', state)
    },
    ctgrActivate(index) {
      this.$store.commit('magazine/ctgrActivate', index)
    }
  }
}
</script>

