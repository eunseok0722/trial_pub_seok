// ES2015  모듈 사용하기

//디폴트 임포트 구문
import Example from "./es6example";

// Example 모듈의 데이터에 접근할 수 있음
console.log(Example.count);

let p220 = new Vue({
    el: '#p220'
})


// 단일 파일 컴포넌트 사용하지 않고 Vue.js 컴퍼넌트 모듈화 시 다음과 같이 작성
export default {
    // SFC에서는 template 부분이 <template>가 됨
    template: '<div>MyComponent</div>',
    // SFC에서는 template 이외의 옵션 부분이 <script>가 됨
    data() {
        return {
        //    ... 내용
        }
    }
}