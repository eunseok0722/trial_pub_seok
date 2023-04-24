<template>
  <div class="filter-categories">
    <div class="tit-l">CATEGORIES</div>
    <!--  category list   -->
    <ul class="ctgy-list">
      <li class="category-item" v-for="(item, index) in categoriesList" v-bind:key="item.id">
        <div :class="{'label-category': true, 'active': item.ctgrActive}"
             v-on:click="ctgrState(item.category), ctgrActivate(index)">
          <button>{{ item.category }}</button>
        </div>
      </li>
    </ul>
    <!--  //category list   -->
  </div>
</template>

<script>
export default {
  name: "categories",
  data: () => ({}),
  computed: {
    categoriesList() {
      return this.$store.state.moduleMagazine.categoriesList
    }
  },
  methods: {
    ctgrState(state) {
      this.$store.commit('moduleMagazine/ctgrState', state)
    },
    ctgrActivate(index) {
      this.$store.commit('moduleMagazine/ctgrActivate', index)
    }
  }
}
</script>

