<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="next">Next</li>
      <li v-if="step == 2" @click="publish">Publish</li>
    </ul>
    <img src="./assets/logo.png" class="logo"/>
  </div>

<!--  store 예시 -->
<!--  <h4>안녕 {{ $store.getters['name'] }} 올해 <span>{{ $store.getters['age'] }}</span> 살이 되었네요? <br>-->
    <!--    <button @click="$store.commit('setName', 'park')">나는 park인데?</button>-->
    <!--  mapMutations 활용시 아래와 같이 본인의 함수인 것 같은 방식으로 사용할 수 있음  -->
<!--    <button @click="setName('park')">나는 park인데?</button>-->
<!--    <button @click="$store.commit('incAge')">그것보다 조금 많아요.</button>-->
<!--  </h4>-->

  <!--  dispatch 예시  -->
  <!--  <p>{{ $store.state.more }}</p>-->
  <!--  <button @click="$store.dispatch('getData')">더보기</button>-->

<!-- computed 예제  -->
<!--  <p>{{ now() }} <span>{{ counter }}</span> <button @click="counter ++">재실행</button></p>-->

  <Container :step="step" :img-url="imgUrl" @textData="getTextData"/>

  <!--  // axios로 불러오는 방법 -->
  <!--  <button @click="moreData" class="btn-more">더보기</button>-->
  <button @click="$store.dispatch('getData')" class="btn-more">더보기</button>


  <div class="footer">
    <ul class="footer-button-plus">
      <!--   여러 파일을 한번에 하고 싶을 경우 multiple   -->
      <!--   accept="image/*" 이미지 파일만 보여줄 수 있게 만들어주는 것   -->
      <input @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile"/>
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <!--  // 탭 UI 작성하는 방법 -->
  <!--  <button @click="tabActivate(0)">버튼0</button>-->
  <!--  <button @click="tabActivate(1)">버튼1</button>-->
  <!--  <button @click="tabActivate(2)">버튼2</button>-->
  <!--  <div class="">{{ tabContents[tabActive].content }}</div>-->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import CompContainer from "@/components/CompContainer.vue";
import axios from 'axios';
// mapState 쓰려면 vuex 임폴트 해야됨
import { mapState, mapMutations } from 'vuex'


export default {
  name: 'App',
  components: {
    // HelloWorld
    Container: CompContainer
  },
  data() {
    return {
      // contents: this.$store.state.contents,
      count: 0,
      counter: 0,
      step: 0,
      imgUrl: '',
      textData: '',
      // tabActive: 0,
      // tabContents: [
      //   {
      //     id: 0,
      //     content: 'Tab UI 내용 1'
      //   },
      //   {
      //     id: 1,
      //     content: 'Tab UI 내용 2'
      //   },
      //   {
      //     id: 2,
      //     content: 'Tab UI 내용 3'
      //   },
      // ],
      filterData: '',
    }
  },
  created() {
  },
  methods: {
    // vuex mutations 한번에 꺼내쓰는 방법
    ...mapMutations(['setMore', 'clkLike', 'setName']),
    moreData() {
      // this. 를 쓰려면 화살표 함수를 써야됨 일반 함수는 this의 의미를 재정의함
      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`).then((result) => {
        // 요청 성공 시 실행할 코드
        // url에서 들어오는 모든 데이터가 Array 형식으로 들어와서 .data 를 해야 안에 데이터에 접근할 수 있음
        // console.log(result.data);
        // 현제 데이터베이스에 추가
        this.contents.push(result.data);
        this.count++
      })
      // post요청
      // post요청 방법 .then은 성공했을 때, catch는 실패시, err는 err데이터
      // axios.post('URL', {name: 'kim'}).then().catch((err) => {
      //   err
      // })
    },
    // tabActivate (idx) {
    //   this.tabActive = idx;
    // }
    upload(e) {
      // 업로드한 이미지를 바로 볼 수 있게 만들어주는 내장함수
      // e는 이벤트와 관련된 정보가 저장된 파라미터
      let file = e.target.files;
      // console.log(file[0]);
      // 다음 페이지로 이동하기
      this.step++;
      // FileReader() 파일을 글자로 변환해서 이미지 src에 넣을 수 있게 도와주는 함수
      // URL.createObjectURL() 가상으로 호스팅해서 해당 URL을 생성해주는 함수
      let url = URL.createObjectURL(file[0]);
      // 이미지 파일만 받고 싶을 경우 file[0].type을 통해서 파일의 타입을 검사하는 과정을 추가해야 함
      // console.log(url);
      // blob: Binary Large Object 라는 뜻으로 이미지를  이진법 오브젝트 안에 담긴 데이터 형식으로 반환
      this.imgUrl = url;
    },
    next() {
      if (this.step <= 2) {
        this.step++;
      }
    },
    publish() {
      let newPost = {
        id: 0,
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: `${this.imgUrl}`,
        likes: 36,
        date: "May 15",
        liked: false,
        content: `${this.textData}`,
        filter: `${this.filterData}`,
      };
      this.contents.unshift(newPost);
      this.step = 0;
      this.textData = '';
      this.filterData = '';
    },
    getTextData(textData) {
      this.textData = textData;
    },
    // now() {
    //   return new Date()
    // }
  },
  // methods 함수는 사용할 때마다 실행됨
  // computed 함수는 사용해도 실행되지 않고 처음 실행하고 값을 간직하게 됨
  // 방대한 데이터베이스에서 필요한 데이터만 가지고와서 저장하거나 한번 연산된 결과를 저장하는데 쓰임

  // 값이 바뀔때마다 실행하고 다시 실행하지 않음
  // 계산 결과를 저장하는 함수라고 생각하면 됨
  computed : {
    // now2() {
    //   return new Date()
    // }
    // store에 있는 내용을 축약하여 쓰는데도 쓰임
    name() {
      // computed는 return을 반드시 적어줘야됨 계산 결과를 뱉기 때문에
      return this.$store.state.name;
    },
    // store에 내용을 하나하나 computed하기 힘드니까 아래와 같이 만듦
    ...mapState(['name', 'age', 'contents']),
    // 다른 이름으로 쓰고 싶을 경우 작명하기
    // ...mapState({ name : 'name'})

  },
  mounted() {
    // mitt 사용법
    // this.emitter.on('EventName', (a) => {
    // a는 이벤트에 포함되는 데이터가 들어있는 오브젝트
    //   console.log(a)
    // })
    this.emitter.on('selectedFilter', (data) => {
      this.filterData = data;
    })
  },
}
</script>

<style>
@import './assets/style.css';

.btn-more {
  outline: none;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1rem;
}

</style>
