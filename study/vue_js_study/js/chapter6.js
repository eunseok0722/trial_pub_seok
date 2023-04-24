let p184 = new Vue({
    el: '#p184',
    data: {
        show: true
    }
})

let p192 = new Vue({
    el: '#p192',
    data: {
        show: true
    }
})

let p193 = new Vue({
    el: '#p193',
    data: {
        show: true,
        show1: true
    }
})
let p194 = new Vue({
    el: '#p194',
    data: {
        show: true
    }
})

let p195 = new Vue({
    el: '#p195',
    data: {
        count: 0
    }
})

let p196 = new Vue({
    el: '#p196',
    data: {
        order: false,
        list: [
            {id: 1, name: '아구몬', hp: 100},
            {id: 2, name: '켄타몬', hp: 120},
            {id: 3, name: '피요몬', hp: 90},
        ]
    },
    computed:  {
        sortedList: function() {
            return _.orderBy(this.list, 'hp', this.order ? 'desc' : 'asc')
        }
    },
    methods: {
        deleteList: function() {
            this.list.splice(0, 3);
        }
    }
})

// SVG 컴포넌트 만들기
Vue.component('my-circle', {
    template: '<circle cx="80" cy="75" r="50" v-bind:fill="fill"/>',
    props: {fill: String}
})

let p201 = new Vue({
    el: '#p201',
    data: {
        toggle: false
    },
    computed: {
        fill: function() {
            return this.toggle ? 'lightpink' : 'skyblue'
        }
    }
})

let p203 = new Vue({
    el: '#p203',
    data: {
        show: true
    },
    methods: {
        // Enter
        beforeEnter: function (el) {
            console.log('before-enter')
        },
        enter: function (el, done) {
            console.log('enter')
            setTimeout(done, 1000)
        },
        afterEnter: function (el) {
            console.log('after-enter')
        },
        enterCancelled: function (el) {
            console.log('enter-cancelled')
        },
        // Leave
        beforeLeave: function (el) {
            console.log('before-leave')
        },
        leave: function (el, done) {
            console.log('leave')
            setTimeout(done, 1000)
        },
        afterLeave: function (el) {
            console.log('after-leave')
        },
        // v-show와 함께 사용하는 경우에만 leaveCancelled를 사용할 수 있습니다.
        leaveCancelled: function (el) {
            console.log('leave-cancelled')
        }
    }
})