
Vue.component('my-component-1', {
    template: '<p> 컴포넌트 사용하기 예시 </p>'
})
Vue.component('root-1', {
    template: '<div><p> 루트 요소는 <span>반드시 1개여야 한다</span> </p> <div>안그러면 에러가 난다 </div> <div>2개 이상 요소가 있을 경우 div로 감싸주어야 한다</div></div>'
})

const p140 = new Vue({
    el: '#p140'
})

// 자식 컴포넌트는 먼저 정의되어있어야 한다는 점을 알게 되었음
Vue.component('child-comp', {
    // 컴포넌트의 루트 태그 안에 id와 class 입력하면 id는 부모(루트) 태그의 것을 사용하고 class 는 중첩됨
    template: '<div id="cld" class="cld" ><a>{{ message }}</a></div>',
    // data: function() {
    //     return {
    //         message: 'child-comp 예제'
    //     }
    // }
    props: ['message', 'parentComp', 'ideaComp']
})


const p144 = new Vue({
    el: '#p144',
    data: {
        parentComp: function () {
            return {
                message: 'props 사용 예'
            }
        },
        ideaComp: '같은 자식 컴포넌트에 다른 내용을 전달 가능'
    },
    components: {
        // 부모 컴포넌트 정의하기
        'parent-comp': {
            // 템플릿 안에 자식 컴포넌트를 넣기
            // 컴포넌트의 루트 태그 안에 id와 class 입력하면 id는 부모(루트) 태그의 것을 사용하고 class 는 중첩됨
            template: '<p><child-comp id="prnt" class="prnt" message="props 사용 예시"></child-comp></p>',
        },
        'idea-comp': {
            template: '<ul> <li><child-comp message="같은 자식 컴포넌트에 다른 내용 전달 가능"></child-comp></li> </ul>'
        }

    }
})

//컴포넌트 리스트 렌더링하기의 자식 컴포넌트
// props로 받을 자료형 지정하기
Vue.component('chld-for', {
    template: '<li>NO.{{ no }} {{ name }} HP.{{ hp }}</li>',
    props: {
        'no': {
            type: Number,
            // 필수 문자열
            required: true
        },
        'name': [String, Number],
        'hp': Number
    }
})
Vue.component('prop-example', {
    template: '<div></div>',
    props: {
        propA: Number,
        // 여러 개의 자료형 지정
        propB: [String, Number],
        // 필수 문자열과 디폴트 값
        propC: {
            type: String,
            required: true,
            default: 100
        },
        // 객체와 배열의 디폴트 값
        // 팩토리 함수를 사용해서 리턴하는 형태 사용
        propD: {
            type: Object,
            default: function () {
                return {message: 'hello!'}
            }
        },
        // 사용자 정의 유효성 검사 함수
        propE: {
            validator: function (value) {
                return value > 10
            }
        }
    }
})
// $emit 메소드 예시, 자식요소 trigger 정의하는 방법
Vue.component('chld-emit', {
    template: '<button v-on:click="handleClick">이벤트 호출하기</button>',
    methods: {
        handleClick: function () {
            this.$emit('emit-ex');
        }
    }
})

Vue.component('exemit-child', {
    template: '<li> {{name}} HP. {{hp}} \ ' +
        '<button v-on:click="doAttack">공격하기</button> </li>',
    props: {id: Number, name: String, hp: Number},
    methods: {
        doAttack: function () {
            this.$emit('attack', this.id)
        }
    }
})

// 부모 요소의 데이터를 애용해서 자식 컴포넌트에서 렌더링 진행하기
const p148 = new Vue({
    el: '#p148',
    data: {
        list: [
            {id: 1, name: '파이리', hp: 100},
            {id: 2, name: '피죤투', hp: 300},
            {id: 3, name: '라프라스', hp: 500}
        ]
    },
    // 자식에게 emit으로 trigger 받으면 아래의 메소드 진행하도록 만들기
    methods: {
        btnClick() {
            alert('emit 예시')
        },
        // attack 발생한 경우
        handleAttack: function (id) {
            // 매개변수 ID로 요소 검색하기
            let item = this.list.find(function (el) {
                return el.id === id
            })
            // HP가 0보다 많을 때 10씩 줄임
            if (item !== undefined && item.hp > 0) item.hp -= 10
        },
        handleClick: function () {
            alert('.native를 붙여야 DOM 이벤트에 접근 가능')
        }
    },
    components: {
        'my-icon': {
            template: '<p><button>사용자정의태그</button></p>'
        }
    }
})


// 이벤트를 발생시킬 컴포넌트에서 $emit 이용해서 이벤트 발생시켜서 버스용 인스턴스에 보내기
Vue.component('comp-a', {
    template: '<button v-on:click="handleClick"> 버튼 클릭 </button>',
    methods: {
        handleClick: function () {
            return EventBus.$emit('bus-event')
        }
    }
})

//
Vue.component('comp-b', {
    template: '<p>EventBus의 count 값은 {{ EventBus.count }}</p>',
    computed: {
        // bus 데이터를 산출 속성에서 사용하기
        EventBus: function () {
            return EventBus.$data
        }
    },
    created: function () {
        EventBus.$on('bus-event', function () {
            this.count++
        })
    }
})
// 버스 전용 인스턴스 만들고 값을 저장하기
const EventBus = new Vue({
    data: {
        count: 0
    }
})
const p157 = new Vue({
    el: '#p157',
    props:{
        count: Number
    }
})

// 이름있는 슬롯 정의하기
Vue.component('comp-slot', {
    template:
        '<div class="comp-slot">' +
        '<header>' +
        '<slot name="header">슬롯 헤더 메시지</slot>' +
        '</header>' +
        '<div class="content">' +
        '<slot>슬롯 콘텐츠 메시지</slot>' +
        '</div>' +
        '<footer>' +
        '<slot name="footer">슬롯 푸터 메시지</slot>' +
        // 슬롯 안에 아무것도 정의하지 않았을 경우 생략됨
        '</footer>' +
        '</div>'
})
// 스코프 있는 슬롯
Vue.component('props-ex', {
    template: '<div class="props-ex">' +
        // 부모에게 전달할 메시지를 text라는 속성의 value로 지정
        '<slot text="자식이 전달한 메시지"></slot>' +
        '</div>'
})

// 부모에게 내용 전달하는 자식 컴포넌트 만들기
Vue.component('props-ex2', {
    template: '<ul class="props-ex2">' +
        '<slot v-for="item in list" v-bind:item="item"></slot>' +
        '</ul>',
    props: {
        list: Object
    }

})

const p161 = new Vue({
    el: '#p161',
    data: {
        list: [
            {id: 1, name: '파이리', hp: 100},
            {id: 2, name: '피죤투', hp: 300},
            {id: 3, name: '라프라스', hp: 500}
        ]
    }
})

// 사용자 정의 v-model
// value 속성을 다른 목적으로 사용하거나 다른 이벤트를 사용하고 싶은 경우 model 옵션을 사용해서 설정을 원하는대로 변경
Vue.component('custom-model', {
    model: {
        // 현재 값을 value가 아니라 current로 할당하고 싶은 경우
        prop: 'current',
        // 이벤트를 change로 사용하고 싶은 경우
        event: 'change'
    },
    // props에서 설정하기
    props: { current: String },
    created: function() {
        this.$emit('change', '2018-01-01')
    }
})
//컴포넌트 정의가 항상 인스턴스 정의보다 먼저 와야한다.
// .sync로 양방향 데이터 바인딩하기
Vue.component('sync-ex', {
    data: function () {
        return {
            message: '컴포넌트의 데이터는 객체로 만들어야 한다.'
        }
    },
    template: '<div class="my-component">\
  <p>이름.{{ name }} HP.{{ hp }}</p>\
  <p>이름 <input v-model="localName"></p>\
  <p>HP <input size="5" v-model.number="localHp"></p>\
  </div>',
    props: {
        name: String,
        hp: Number
    },
    computed: {
        // 산출 속성의 세터와 게터를 통해 v-model 사용하기
        localName: {
            get: function () {
                return this.name
            },
            set: function (val) {
                this.$emit('update:name', val)
            }
        },
        localHp: {
            get: function () {
                return this.hp
            },
            set: function (val) {
                this.$emit('update:hp', val)
            }
        }
    }
})
let p168 = new Vue({
    el: '#p168',
    data: {
        name: '아구몬',
        hp: 120
    }
})

// template 작성하기 예시


Vue.component('temp-1', {
    template: '<p> template 옵션에 직접 작성하기 예시 </p>'
})

Vue.component('temp-2', {
    template: `<div> 
    <p>백틱을 사용하기 때문에 ES2015 이상 버전에서만 작동</p>
    <p>HTML 태그를 그대로 사용해서 작성 가능</p> 
    </div>`
})
// inline-template 활용 예
Vue.component('temp-3', {})

Vue.component('temp-4', {
    template: '#child-template'

})

let p170 = new Vue({
    el: '#p170'
})

// 함수형 컴포넌트 정의
Vue.component('functional-component', {
    functional: true,
    render: function (createElement, context) {
        return createElement('div', context.props.message)

    },
    props: {
        message: {
            type: String,
            default: '함수형 컴포넌트 예제: props를 통해서 내용 입력'
        }
    }
})

Vue.component('comp-a', {
    template: '<div class="my-component-a">component A</div>'
})

Vue.component('comp-b', {
    template: '<div class="my-component-b">component B</div>'
})

let p175 = new Vue({
    el: '#p175'
})

let p176 = new Vue({
    el: '#p176',
    data: {
        //컴포넌트 리스트
        componentTypes: ['comp-a', 'comp-b'],
        //렌더링할 컴포넌트 선택하는 index
        current: 0
    },
    computed: {
        component: function () {
            // current와 일치하는 index의 컴포넌트를 사용
            return this.componentTypes[this.current]
        }
    }
})

// 컴포넌트 생성자에서 옵션만 미리 정의해두기
let mixin = {
    created: function () {
        this.hello()
    },
    methods: {
        hello: function () {
            console.log('mixin example')
        }
    }
}
// 컴포넌트에 옵션 끼워넣기
Vue.component('mixin-a', {
    mixins: [mixin], //믹스인 등록하기
    template: '<p>MyComponentA</p>'
})
Vue.component('mixin-b', {
    mixins: [mixin], //믹스인 등록하기
    template: '<p>MyComponentB</p>'
})


let p177 = new Vue({
    el: '#p177'
})

// 두개의 컴포넌트 정의하기
//메시지 목록 전용 컴포넌트
Vue.component('comp-board', {
    template: '<div>Message Board</div>',
})
// 입력 양식 전용 컴포넌트
Vue.component('comp-form', {
    template: '<div>Form <br><textarea v-model="message"></textarea></div>',
    data: function () {
        return { message: '' }
    }
})

let p179 = new Vue({
    el: '#p179',
    data: {
        current: 'comp-board' //동적으로 변경하기
    }
})