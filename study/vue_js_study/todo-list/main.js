var STORAGE_KEY = 'todos-vuekr-demo'
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = new Vue({
    el: '#app',
    data: {
        // 사용할 데이터
        todos: [],
        options: [
            { value: -1, label: '전체'},
            { value: 0, label: '작업 중'},
            { value: 1, label: '완료' }
        ],
        // 선택되어 있는 options의 value를 저장하기 위한 데이터
        // 초깃값은 -1(전체)
        current: -1
    },
    methods: {
        // 사용할 메서드
        doAdd: function(event, value) {
            // ref로 이름이 붙어 있는 요소 참조
            var comment = this.$refs.comment
            // 입력이 없다면 아무것도 하지 않음 return
            if (!comment.value.length) {
                return
            }
            // { 새로운 ID, 내용, 작업 상태 }
            // 형태의 객체를 todos 리스트에 추가
            // 작업 상태 'state'는 디폴트로 '작업 중 = 0'으로 생성
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            // 입력 양식의 내용 제거하기
            comment.value = ''
        },
        // 상태 변경 처리
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1
        },
        // 제거 처리
        doRemove: function(item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },
    watch: {
        // 옵션을 사용하는 경우 객체 형식으로 지정
        todos: {
            // 매개 변수로는 속성의 변경 후 값이 돌아온다.
            handler: function(todos) {
                todoStorage.save(todos)
            },
            // deep 옵션으로 내부의 데이터까지 감시
            deep: true
        }
    },
    created() {
        // 인스턴스 생성 때 자동으로 fetch() 기능 실행
        this.todos = todoStorage.fetch()
    },
    computed: {
        computedTodos: function() {
            // 데이터 current가 -1이라면 전체 출력
            // 이 이외에 경우에는 current와 state의 상태를 기반으로 필터링
            return this.todos.filter(function(el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },
        labels() {
            return this.options.reduce(function(a, b) {
                return Object.assign(a, { [b.value]: b.label })
            }, {})
            // 키를 기반으로 쉽게 볼 수 있도록 다음과 같이 변환합니다.
            // { 0: '작업 중', 1: '완료', -1: '전체'}
        }
    }
})

