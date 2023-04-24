<template>
  <div>
    <div v-if="step == 0">
      <Post v-for="item in contents" :key="item.name" :item="item"/>
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step == 1">
      <div class="upload-image" :class="selectedFilter" :style="`background-image:url(${imgUrl})`">
      </div>
      <div class="filters">
        <FilterBox :img-url="imgUrl" v-for="item in filterList" :key="item" :filter="item">
          <!--    슬롯 부모요소에 작성할 내용      -->
          <!--    슬롯은 html에 데이터바인딩을 할떄만 쓸 수 있음 data, method 등의 변수로 사용할 수 없음      -->
          <!--          <template v-slot:a>{{ item }}</template>-->
          <template v-slot:b>
            <div style="display:flex; justify-content: flex-end; align-items: flex-end; height: 100%;">{{ item }}</div>
          </template>
          <!--     위와 같이 html을 그대로 보낼 때 사용하기 용이함     -->
          <!--    //슬롯 부모요소에 작성할 내용      -->

          <!--   slot props 문법 : 부모가 자식데이터가 필요한 경우       -->
          <!--          <template v-slot:default="childData">-->
          <!--            {{ childData.msg }}-->
          <!--          </template>-->
        </FilterBox>
      </div>
    </div>


    <!-- 글작성페이지 -->
    <div v-if="step == 2">
      <div class="upload-image" :class="selectedFilter" :style="`background-image:url(${imgUrl})`">
      </div>
      <div class="write">
        <!--   내가 작성한 내용     -->
        <!--        <textarea class="write-box" v-model="inputValue" @input="$emit('textData', inputValue)">write!</textarea>-->
        <!--   강사 작성 답안     -->
        <textarea class="write-box" @input="$emit('textData', $event.target.value)" placeholder="새글 작성"></textarea>
      </div>
    </div>

    <!--  마이페이지 -->
    <div v-if="step == 3">
      <MyPage :one="1"></MyPage>
    </div>

  </div>
</template>

<script>
import CompPost from "@/components/CompPost.vue";
import FilterBox from "@/components/FilterBox.vue";
import FilterList from "@/assets/FilterList";
import MyPage from "@/components/MyPage.vue";

export default {
  name: "CompContainer",
  data() {
    return {
      inputValue: '',
      filterList: FilterList,
      selectedFilter: '',
      contents: this.$store.state.contents,
    }
  },
  components: {
    Post: CompPost,
    FilterBox,
    MyPage
  },
  props: {
    step: Number,
    imgUrl: String,
  },
  methods: {},
  mounted() {

    // mitt 사용법
    this.emitter.on('selectedFilter', (data) => {
      this.selectedFilter = data;
    })
  }

}
</script>

<style scoped>
.upload-image {
  width: 100%;
  height: 450px;
  background-color: cornflowerblue;
  background-size: cover;
  background-position: center;
}

.filters {
  overflow-x: scroll;
  white-space: nowrap;
}

.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}

.filters::-webkit-scrollbar {
  height: 5px;
}

.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}

</style>