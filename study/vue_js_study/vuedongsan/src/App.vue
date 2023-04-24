<template>


  <div class="menu">
    <a href="#none" v-for="(item, i) in nav" :key="i">{{ item }}</a>
  </div>

  <!--  모달 -->
  <transition name="fade">
    <modal :one-rooms="oneRooms" :item-idx="itemIdx" :modal-active="modalActive" @closeModal="modalActive=false"/>
  </transition>

  <!--  discount 할인 베너 -->
  <discount v-if="showDiscount == true" :percent="percent"></discount>

  <!-- 정렬버튼 -->
  <button @click="priceSort">저가순정렬</button>
  <button @click="priceSortRevert">고가순정렬</button>
  <button @click="nameSort">가나다순정렬</button>
  <button @click="sortBack">되돌리기</button>

  <!--  v-for 반복문 사용 -->
  <!-- openModal에 넣은 값을 $event 값을 통해서 부모 요소에서 받을 수 있음 -->
  <card v-for="(item, index) in oneRooms" :key="item.id" :item="item" :index="index"
        @openModal="modalActive= true, itemIdx = $event"></card>
  <!--  <div>-->
  <!--    <img :src="item.image" :alt="item.title" class="room-img">-->
  <!--    <h4 v-on:click="modalActive=true; itemIdx=index">{{ item.title }}</h4>-->
  <!--    <p>{{ item.price }} 만원</p>-->
  <!--    <p>{{ item.content }}</p>-->
  <!--    <button @click="increase(index)">허위매물신고</button>-->
  <!--    <span>신고수 : {{ item.alert }}</span>-->
  <!--  </div>-->
</template>

<script>
import oneRoomData from './assets/oneroom';
import Modal from './components/CompModal.vue'
import Discount from './components/CompDiscount.vue'
import Card from './components/CompCard.vue'

export default {
  name: 'App',
  data() {
    return {
      // price1: 60,
      // price2: 80,
      path: './src/assets/',
      nav: ['Home', 'Product', 'About'],
      products:
          [
            // 데이터를 어떻게 만들지 잘 생각해야 나중에 작업하기 편리해진다.
            {name: '역삼동 원룸', price: 70, alert: 0, img: require('./assets/room0.jpg')},
            {name: '천호동 원룸', price: 80, alert: 0, img: require('./assets/room1.jpg')},
            {name: '마포구 원룸', price: 60, alert: 0, img: require('./assets/room2.jpg')},
          ],
      oneRooms: oneRoomData,
      // 사본을 따로 만들때는 아래와 같이 map 문법을 사용해야 한다.
      oneRoomsBackUp: [...oneRoomData],
      modalActive: false,
      itemIdx: 0,
      showDiscount: true,
      percent: 40,
    }
  },
  methods: {
    increase(idx) {
      this.products[idx].alert++
    },
    priceSort() {
      // 원룸들 데이터 오름차순 정렬해주기
      // sort 내부에 function(a, b) { return a - b }는 공식이니까 외우기, 음수는 앞으로 양수는 뒤로 보내는 방식
      this.oneRooms.sort(function(a, b) {
        return a.price - b.price
      })
    },
    priceSortRevert() {
      // 원룸들 데이터 오름차순 정렬해주기
      // sort 내부에 function(a, b) { return a - b }는 공식이니까 외우기, 음수는 앞으로 양수는 뒤로 보내는 방식
      this.oneRooms.sort(function(a, b) {
        return b.price - a.price
      })
    },
    nameSort() {
      // 원룸들 데이터 오름차순 정렬해주기
      // 가나다순은 ASC|| 크기 순으로 정렬됨
      this.oneRooms.sort(
          function(a, b) {
            if (a.title < b.title) return -1;
            else if (a.title == b.title ) return 0;
            else return 1;
          }
      );
    },
    sortBack() {
      // 원룸들 데이터 오름차순 정렬해주기
      // sort()는 원본을 영구적으로 변형해버리는 문제가 있다.
      // filter, map 같은 요즘 매서드는 원본을 바꾸지 않음
      // (주의) 등호로 array를 연결하면 두개의 데이터를 공유해주세요 라는 뜻이기 때문에 되돌리기를 몇번 누르면 작동을 하지 않음
      // this.oneRooms = this.oneRoomsBackUp;
      // 그래서 아래와 같이 사본을 만들어서 그것을 매칭하는 방식으로 작성해야한다.
      this.oneRooms = [...this.oneRoomsBackUp];
    }
  },
  mounted() {
    // 내부에서 this.를 쓸일이 있을 경우 반드시 화살표 함수로 써야 this가 정상적으로 작동
    // setTimeout(() => {
    //   this.showDiscount = false;
    // }, 2000);

    // (숙제) discount 내의 할인율이 1초마다 줄어드는 것 만들기
    let decrease = setInterval(() => {
      if (this.percent > 5) this.percent --;
      else {
        clearInterval(decrease);
        // alert('할인 종료');
      }
    }, 1000)
  },

  components: {
    Discount,
    Modal,
    Card
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
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}


.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.menu a {
  color: white;
  padding: 10px;
  text-decoration: none;
}

.room-img {
  width: 450px;
  margin-top: 50px;
}

/* 등장 애니메이션 적용 */
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all .35s;
}

.fade-enter-to {
  opacity: 1;
}

/* 퇴장 애니메이션 적용 */
.fade-leave-from {
  opacity: 1;
}

.fade-leave-active {
  transition: all .35s;
}

.fade-leave-to {
  opacity: 0;
}

</style>
