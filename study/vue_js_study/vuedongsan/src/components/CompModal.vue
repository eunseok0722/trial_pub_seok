<template>
  <div class="black-bg" v-if="modalActive">
    <div class="white-bg">
      <img :src="oneRooms[itemIdx].image" :alt="oneRooms[itemIdx].title">
      <h4>{{ oneRooms[itemIdx].title }}</h4>
      <p>{{ oneRooms[itemIdx].content }}</p>
<!--   function(e) { e.} 파라미터랑 같은 의미의 $event.target.value -->
<!--      <input type="number" value="" placeholder="주문수량" @input="month = $event.target.value">-->
<!--   위의 축약버전   -->
<!--   input 자료형은 전부 문자자료형이기 때문에 +를 할 경우 문자열 + 문자열을 합쳐줌, 그렇기 때문에 .number와 같은 장식자를 달아줘야됨 -->
      <input type="number" v-model.number="month">
      <p> {{month}}개월 선택 시 : {{ oneRooms[itemIdx].price * month }}만원</p>
      <discount></discount>
      <button v-on:click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
import Discount from './CompDiscount.vue'

export default {
  name: "CompModal",
  props: {
    oneRooms: Array,
    itemIdx: Number,
    modalActive: Boolean,
  },
  data() {
    return {
      month: 3,
    }
  },
  watch : {
    // 감시하고 싶은 data와 같은 이름으로 함수를 만든다.
    // 파라미터를 추가하면 변경 후 데이터(data)와 변경 전 데이터(beforeData)를 활용할 수 있음
    month(data, beforeData) {
      console.log(typeof(data));
      if (typeof(data) == 'string' ) {
        alert('숫자를 적으세요.')
        this.month = 1;
      }else if (data > 13) {
        alert('13 이하의 숫자를 적으세요.')
        this.month = beforeData;
      }else if (data <= 0 ) {
        alert('1개월 이상의 숫자를 적으세요.')
        this.month = beforeData;
      }
    }
  },
  methods: {},
  beforeUpdate() {
    // 모달창의 input 안에 2 기입했을 경우 3개월 이상만 가능하다는 안내문구 띄우기
    if (this.month < 3) {
      alert('3개월 이상만 신청이 가능합니다.');
      this.month = 3;
    }
  },
  components: {
    Discount
  }
}
</script>

<style scoped>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  top: 0;
  overflow: hidden;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>