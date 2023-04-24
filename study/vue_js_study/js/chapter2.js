'use strict'


// section07 기본적인 데이터 바인딩
// 리액티브 데이터 정의하기

// 외부에서 데이터정의
let state = {count: 0}
let p35 = new Vue({
    el: '#p35',
    data: {
        ex: '리액티브 데이터 정의 예시',
        // Vue.js 데이터로 등록 시 외부에서 정의한 데이터도 모두 리액티브 데이터로 변환됨
        state: state,
        // object의 프로퍼티와 다르게 나중에 추가가 안되기 때문에 먼저 속성(프로퍼티)를 빈값을 만들어서 넣어두어야 한다.
        newTodoText: '',
        visitCount: 0,
        hideCompletedTodos: false,
        todos: []
    },
    // 외부에서 정의한 state가 내부에서 아래와 같이 함수나, 데이터로 정의되면 리액티브 데이터로 사용가능
    methods: {
        add() {
            state.count++;
        }
    }
})
let p37 = new Vue({
    el: '#p37',
    data: {
        mustache: 'mustache 예시',
        // 객체 데이터
        message: {value: '객체 데이터', prop: '.prop 예시'},
        // 배열 데이터
        list: ['배열', '데이터', '예시'],
        //    다른 데이터를 사용해서 list 값 추출하기 위한 요소
        num: 1,
        value: 'v-bind:value 사용 예시',
        title: 'v-bind:title 사용 예시',
        value1: ':value로 적었을 때',
        scroll: 0,
        count: 0,
        textColor: 'royalblue',
        bgColor: 'lightyellow',
        fontSize: 24,
        // 데이터 바인딩으로 클래스 붙이기
        isChild: true,
        isActive: true,
        // 객체 형식으로 클래스 전달하기
        classObject: {
            child: true,
            'is-active': false
        },
        styleObject: {
            color: 'red',
            backgroundColor: 'lightgray'
        },
        // 여러 개의 속성 데이터 바인딩하기
        item: {
            id: 1,
            src: 'data:image/png;base64,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',
            alt: '상품1의 섬네일',
            width: 200,
            heigth: 200
        },
        radius: 50
    },
    // 산출 속성 작성 예시
    computed: {
        countLength: function() {
            return this.message.value.length >= 10 ? '10 글자 이상' : '10 글자 이하'
        }
    },
    mounted: function() {
        this.scroll = 100;
    },
    methods: {
        increment: function() {
            this.count++
        },
        decrement: function() {
            if (this.count > 0 ) {
                this.count--
            }
        }
    }
})

let p51 = new Vue({
    el: '#p51',
    data: {
        ok: false,
        type: 'A',
        select: 'a'
    }
})

function Monster(id, name, hp) {
        this.id = id,
        this.name = name,
        this.hp = hp
}
const Pica = new Monster(1, '피카츄', 80);
const lizard = new Monster(2, '리자드', 270);
const turtle = new Monster(3, '거북왕', 510);

let p54 = new Vue({
    el: '#p54',
    data: {
        list: [
            Pica, lizard, turtle
        ],
        name: '',
        hp: 0,
        text: 'vue',
        load: []
    },
    methods: {
        doAdd: function() {
            let max = this.list.reduce(function(a, b) {
                return a > b.id ? a : b.id
            }, 0)
        //    새로운 몬스터를 리스트에 추가하기
            this.list.push({
                id: max + 1,
                name: this.name,
                hp: this.hp
            })
        },
        rename() {
            // 기존이름 바꾸기 예시
            this.list[0].name = '라이츄'
        },
        doRemove: function(index) {
            this.list.splice(index, 1)
        },
        change() {
            this.$set(this.list, 0, { id: 1, name: '이상해꽃', hp: 550})
        },
        doAttack: function(index) {
            this.list[index].hp -= 15
        },
        filter: function(el) {
            this.list = this.list.filter(function(el) {
                return el.hp >= 100
            })
        }
    },
    created: function() {
    //    모든 요소에 active 속성 추가하기
        this.list.forEach(function(item) {
            this.$set(item, 'active', false)
        }, this);
        axios.get('js/list.json').then(function(response) {
        //    데이터를 읽어들이고 list에 할당하기
            this.list = response.data
        }.bind(this)).catch(function(e) {
            console.error(e)
        })
    },
})
const p69 = new Vue({
    el: '#p69',
    data: {
        el : {},
        ref: '',
        show: true
    },
    mounted: function() {
        this.el = this.$el;
        this.ref = this.$refs.ref;
    },
    methods: {
        handleClick: function() {
            var count = this.$refs.count
            if (count) {
                count.innerText = parseInt(count.innerText,10) + 1 // radix 10 은 10진수, radix 8은 8진수
            }
        }
    }
})

const p72 = new Vue({
    el: '#p72',
    data: {
        message: '렌더링 되었음',
        url: 'http://naver.com',
        text: 'v-text 디렉티브: 요소에 Mustache가 1개만 있을 경우 대체해서 쓸 수 있음',
        html: '<a href="#">v-html 사용 예시: <span>v-html 적용하는 데이터와 템플릿은 신뢰할 수 있을 때만 사용하기</span></a>',
        cloak: 'v-cloak 사용 예시'
    },


})