<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vue Blog Example</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/list">List</router-link>
          </li>
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">Pricing</a>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
<!--          </li>-->
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-5">
    <router-view :contents="blogContents"></router-view>
  </div>


</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import CompList from './components/CompList.vue';
import BlogContents from "@/assets/BlogContents";

export default {
  name: 'App',
  data() {
    return {
      blogContents: BlogContents
    }
  },
  components: {
    // HelloWorld
    // CompList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
