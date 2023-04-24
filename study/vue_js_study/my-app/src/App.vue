<template>
  <div id="app">
    <div>
      <h2>컴포넌트 예제</h2>
      <p>{{ message }}</p>
      <EditForm/>
    </div>

    <div>
      <h2>사용자 정의 플러그인 예제</h2>
      <p></p>
      <WindowScroll/>
    </div>

    <div>
      <h3>Vuex Store 활용 예시</h3>
      <ul>
        <li>

        </li>
        <li>
          store의 값에 변화주기
        </li>
        <li>
          {{ $store.state.count }}
        </li>
        <li>
          <button v-on:click="$store.commit('increment')">mutations 변화주기</button>
        </li>
      </ul>
    </div>
    <div>
      <h2>라우트 링크 예제</h2>
      <nav>
        <!--   정확하게 일치할때만 css 적용될 수 있도록 exact 적용     -->
        <router-link to="/" exact>HOME</router-link>
        <router-link to="/product" exact>상품 정보</router-link>
      </nav>
      <transition name="view">
        <router-view/>
      </transition>
      <LoadingOverlay/>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import EditForm from './components/EditForm'
import WindowScroll from './components/WindowScroll'
import LoadingOverlay from './components/LoadingOverlay'
import {
  // mapState,
  mapGetters
  // mapMutations,
  // mapActions
} from 'vuex'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    EditForm,
    WindowScroll,
    LoadingOverlay
    // 비동기적으로 불러오는 컴포넌트
    // MyComponent: () => import('@/components/Mycomponent')
  },
  computed: {
    // 로컬 message와 스토어의 message 동기화하기
    message () {
      return this.$store.getters.message
    },
    ...mapGetters([
      'message'
    ]),
    ...mapGetters({
      messageAlias: 'message'
    })
  },
  created () {
    // 로컬 message와 스토어의 message 동기화하기
    // 스토어의 상태 변경하기
    this.$store.commit('increment')
    // 스토어의 상태 확인하기
    console.log(this.$store.state.count)
  },
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    setTimeout(next, 1000)
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app ul, dt, dd {
  padding: 0;
  margin: 0;
  list-style: none;
}

.router-link-active {
  background: #e25193;
}

.view-enter-active, .view-leave-active {
  transition: opacity 0.5s;
}

.view-leave-active {
  position: absolute;
}

.view-enter, .view-leave-to {
  opacity: 0;
}
</style>
