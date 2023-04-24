<template>
  <div style="padding : 10px">
    <h4>팔로워 {{one}}</h4>
    <input placeholder="🔍" @input="doSearch($event.target.value)" />
    <div class="post-header" v-for="(item, index) in follower" :key="index">
      <div class="profile" :style="`background-image:url(${item.image})`"></div>
      <span class="profile-name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// ref(), reactive() 함수를 사용하기 위해서는 vue를 임폴트해야한다.
// import { ref, reactive, onMounted, watch, toRefs, computed  } from 'vue'
import { ref, onMounted } from 'vue';
// import { useStore } from 'vuex';

export default {
  name: "MyPage",
  props: {
    one: Number,
  },
  // composition API 사용하는 방법
  // setup() 은 created hook과 비슷
  // props 사용하는 방법, context 는 errors 같은 기타 내용 사용
  // setup(props, context) {
  setup() {
    // 거의 모든 기능 개발을 setup안에서 할 수 있음
    // 관련 있는 내용을 한자리에서 볼 수 있다는 장점이 있음
    // data 저장하고 싶으면 아래와 같이 사용
    // ref() 안에 넣어야 함 레퍼런스를 만든다는 뜻
    // array = array 는 값 바꿔주세요가 아니라 값을 '공유해주세요'
    // 이런 특성을 이용해서 값을 공유하기 위해 ref()를 사용
    let follower = ref([]);
    let followerOrg = ref([]);


    // { follower 데이터 } 형식으로 되어있음

    // 여러 props 를 import 할떄는 toRefs라는 함수가 필요
    // reactive 하게 하기 위해서 Ref 안에 넣어야 함
    // let { one } = toRefs(props);
    // console.log(one.value);

    // setup 안에서 watch 사용하는 방법
    // watch(one, () => {
    //   // one 이라는 props가 변경될 때마다 함수 발동
    //   console.log(one.vaule);
    // })

    // computed 사용하는 방법
    // follower.value.length는 아래서 axios get이 이루어지지 않았기에 0으로 출력됨
    // let result = computed( () => { return follower.value.length });
    // console.log(result.value);


    // let test = reactive({ name: 'kim'})
    // ref()는 숫자, 문자, 논리, reactive() 는 Array, Object 자료형 집어넣는 경우가 많음
    // 요즘은 ref()로 모두 쓰고 있음

    // store 사용하는 방법
    // let store = useStore();
    // console.log(store.state.name);
    // console.log(store.commit());
    // mapState 사용 못함 vuex 5버전 이상이면 사용될 듯


    // mounted 라이프 사이클 훅을 사용하고 싶을 경우 onMounted(() => {}) 문법을 사용하기
    onMounted(() => {

      // ref() 안에 내용 사용하는 방법
      axios.get('/follow.json').then((a) => {
        // 데이터 조작을 위해서는 .value를 붙여야 한다.
        follower.value = a.data;
        // 원래 데이터의 사본을 followOrg에 넣기
        followerOrg.value = [...a.data];
      })
    });

    // 함수 사용하는 방법
    function doSearch(payload) {
      // filter() 함수 자체가 array 뒤에 붙기 때문에 별도의 반복문을 쓸 필요가 없음
      let newFollower = followerOrg.value.filter((a) => {
        // 찾는 문자열이 없을 경우 -1을 리턴하기 때문에 -1이 아닌것을 찾음
        return a.name.indexOf(payload) != -1
      });
      follower.value = [...newFollower]
    }
    // return { doThis, follower }
    return { follower, doSearch };
  }
  // created: {
  //   getData() {
  //     axios.get('../../public/follow.json').then( data => {
  //       console.log(data.data);
  //       this.$store.commit('followerList', data.data);
  //     })
  //   }
  // }
}
</script>

<style scoped>

</style>