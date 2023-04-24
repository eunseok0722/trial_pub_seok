'use strict'



const p20 = new Vue({
    el: '#p20',
    data: {
        // 1. 텍스트 바인딩
        message: '텍스트 바인딩 예시',
    //    2. 반복 렌더링 예시
        list: ['사과', '바나나', '딸기'],
        obj: { article: '사과', price: 2000, sell: true },
    //    3. 이벤트 사용하기 예시
        click: 'v-on:click 이벤트 예시',
        model: 'v-model 사용예시',
        show: true,
    },
    methods: {
        handleClick() {
            alert(p20.click);
        }
    }
})
//아래와 같이 외부에서 접근 가능
console.log(p20.message);
