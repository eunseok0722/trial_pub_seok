let p106 = new Vue({
    el: '#p106',
    data: {
        width: 800,
        height: 600
    },
    computed: {
        // 산출 속성 halfWidth 정의하기
        halfWidth: {
            get: function () {
                return this.width / 2
            },
            // halfWidth를 2 배수한 숫자를 width에 할당하기
            set: function (val) {
                this.width = val * 2
            }
        },
        halfHeight: function () {
            return this.height / 2
        },
        halfPoint: function () {
            return {
                x: this.halfWidth,
                y: this.halfHeight
            }
        },
        computedData: function () {
            return Math.random()
        }

    },
    methods: {
        methodsData: function () {
            return Math.random()
        }
    }
})

let p111 = new Vue({
    el: '#p111',
    data: {
        order: false,
        // 입력 양식에 출력할 데이터
        budget: 3000,
        // 출력할 개수
        limit: 2,
        // 데이터 리스트
        list: [
            {id: 1, name: '사과', price: 1000},
            {id: 2, name: '바나나', price: 2000},
            {id: 3, name: '딸기', price: 4000},
            {id: 4, name: '오렌지', price: 3000},
            {id: 5, name: '메론', price: 5000}
        ]
    },
    computed: {
        // budget 아래의 리스트를 리턴하는 산출 속성
        matched: function () {
            return this.list.filter(function (el) {
                return el.price <= this.budget
            }, this)
        },
        sorted: function () {
            //Lodash 라이브러리 사용
            return _.orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
        },
        // matched로 리턴한 데이터를 limit 조건을 걸어 리턴하는 산출 속성
        limited: function () {
            return this.sorted.slice(0, this.limit)
        },
        //원활한 유지보수를 위해 아래와 같은 리턴값 전달 산출 속성을 만들면 좋다.
        filteredList: function () {
            return this.limited
        }
    }
})

const p115 = new Vue({
    el: '#p115',
    data: {
        // 한번만 동작하는 워치용 데이터
        edited: false,
        bucket: [
            {id: 1, name: '사과', price: 1000},
            {id: 2, name: '바나나', price: 2000}
        ]
    },
    watch: {
        //옵션과 함께 등록하는 경우
        list: {
            handler: function (newVal, oldVal) {
                //옵션으로 하고 싶은 일
                this.list[0].name = 'NewValue!'
            },
            deep: true,
            immediate: true
        },
        //옵션 사용하지 않고 등록하는 경우
        item: function (newVal, oldVal) {

        },
        // 실행 빈도 제어하기
        // setTimeout 또는 Lodash 등 유틸리티 라이브러리 사용해서 워처의 실행 빈도 제어
        // Lodash 사용 예시
        value: _.debounce(function (newVal) {
                // 비용 높은 처리 작성
                console.log(newVal)
            },
            // value의 변화가 끝나는 것을 500밀리 초 동안 대기
            500)
    },
    //    인스턴스 메서드로 등록하기
    // created 훅에서 워처 등록하기
    created: function () {
        this.$watch(/* 감시하고 싶은 데이터 */'value', /* 핸들러 */ function () {
            // ...
        }, /* 옵션 객체 */{
            immediate: true,
            deep: true
        });
        // 한번만 동작하는 워치 만들기
        let delwatch = this.$watch('bucket', function () {
            // list가 편집되었는지 기록하기
            this.edited = true
            // 감시 제거하기
            delwatch()
        }, {
            //옵션
            deep: true
        })
        // 여러 값 동시에 감시하기
        // 인스턴스 메서드 사용해서 감시대상을 다음과 같이 함수로 등록
        let multiwatch = this.$watch(function () {
            //값에 해당하는 것을 아래와 같은 배열로 만들어서 리턴으로 돌린다.
            return [this.width, this.height]
        }, function () {
            // 핸들러 내용
        })
    },
    // 워치 제거하기
    beforeDestroy: function () {
        let unwatch = this.$watch('value', function () {
        });
        unwatch();
    },
    // 옵션으로 등록하는 경우 산출 속성을 감시하게 해서 같은 기능을 하도록 만들 수 있음
    computed: {
        watchTarget: function () {
            return [ this.width, this.height ]
        }
    },
    watch: {
        watchTarget: function() { }
    }
})

let p120 = new Vue({
    el: '#p120',
    data: {
        list: [
            {id: 1, name: '사과', price: 1000},
            {id: 2, name: '바나나', price: 2000}
        ]
    },
    watch: {
        // 배열 list 속성을 감시해서 비교하기, 언제나 같은 값을 가지기 때문에 감시가 이루어지지 않음
        list: function(newVal, oldVal) {
            console.log(newVal.length, oldVal.length)
        }
    },
    created: function () {
        // 복사 또는 깊은 복사하기
        this.$watch(function() {
            return Object.assign([], this.list)
        }, function(newVal, oldVal) {
            console.log(newVal.length, oldVal.length)
        });
        // 대상에 속성 포함시키기
        this.$watch(function() {
            return { value: this.list, length:this.list.length }
        }, function(newVal, oldVal) {
            console.log(newVal.length, oldVal.length)
        })
    }
})

let p121 = new Vue({
    el: '#p121',
    data: {
        list: [],
        current: '',
        topics: [
            {value: 'vue', name: 'Vue.js'},
            {value: 'jQuery', name: 'jQuery'}
        ]
    },
    watch: {
        current: function (val) {
            // 깃허브 API에서 토픽 리포지토리 검색하기
            axios.get('https://api.github.com/search/repositories', {
                // url 검색하는 검색내용을 아래와 같이 설정
                params: {
                    // 매개변수 질문 q 는 topic 주제가 val vue거나 jQuery 거나
                    q: 'topic:' + val
                }
            }).then(function (response) {
                // 돌아오는 데이터의 아이템 이 현재 리스트 배열에 저장시키기
                this.list = response.data.items
            }.bind(this)
                // this는 new vue 현재 인스턴스를 이야기함
            )
        }
    },
})

//전역 필터 등록하기
Vue.filter('localeNum', function(val) {
    return val.toLocaleString()
})

//필터 등록하는 방법
const p122 = new Vue({
    el: '#p122',
    data: {
        price: 19800
    },
    filters: {
        //필터 등록하는 방법
        localeNumb: function(val) {
            return val.toLocaleString()
        },
        // 소수점 이하 두 번째자리까지 끊는 필터
        round: function (val) {
            return Math.round(val * 100) / 100
        },
        // 도 단위를 라디안 단위로 변환하는 필터
        radian : function(val) {
            return val * Math.PI / 180
        }


    }
})

let p128 = new Vue({
    el: '#p128',


})
// 사용자 정의 디렉티브의 사용할 수 있는 훅 리스트
Vue.directive('example', {
    bind: function (el, binding) {
        console.log('v-example bind')
    },
    inserted: function (el, binding) {
        console.log('v-example inserted')
    },
    update: function (el, binding) {
        console.log('v-example update')
    },
    componentUpdated: function (el, binding) {
        console.log('v-example componentUpdated')
    },
    unbind: function (el, binding) {
        console.log('v-example unbind')
    }
})
// 훅 매개변수 생략 기법
// 위의 훅 매개변수 2번쨰 자리를 생략하고 함수를 전달하면 bind와 update에 훅이 실행됨
Vue.directive('skip', function(el, binding, vnode, oldVnode) {
    // bind와 update로 호출됨
})

const p129 = new Vue({
    el: '#p129',
    data: {
        video1 : false,
        video2 : false
    },
    directives: {
        // 아래와 같이 작성할 경우 video1 속성 변화 발생 시 video2속성을 바인드 하고 있는 요소의 디렉티브도 함꼐 호출되기 때문에 비효율적
        // video: function (el, binding) {
        //     binding.value ? el.play() : el.pause();
        // }
    //    두 번째 매개변수 binding의 속성 oldValue와 비교해서 새로운 값 value에 변화가 있을 때만 렌더링 하도록 만들 수 있음
        video: function (el, binding) {
            // 아래와 같은 조건을 걸면 관계 없는 호출 때 별도 처리 진행하지 않음
            if( binding.value !== binding.oldValue ) {
                binding.value ? el.play() : el.pause()
            }
        }
    }
})

let p133 = new Vue({
    el: '#p133',
    data: {
        list: []
    },
    watch: {
        list: function () {
            //    변경 후 ul 태그 높이 추출이 되지 않고 변경 전의 높이가 출력된다.
            console.log('기본출력 : ', this.$refs.list.offsetHeight)
            //    nextTick 사용 시 DOM 변경된 후의 높이값을 불러올 수 있다.
            this.$nextTick(function () {
                console.log('nextTick: ', this.$refs.list.offsetHeight)
            })
        }
    }
})


