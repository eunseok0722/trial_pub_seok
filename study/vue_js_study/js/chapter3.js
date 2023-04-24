'use strict'

let p81 = new Vue({
    el: '#p81',
    data: {
        count: 0,
        show: false,
        // show: true,
        message: 'input 예시',
        item: '',
        hide: false
    },
    methods : {
        handleClick($event, item) {
            alert('클릭됨')
        },
        handleInput(event) {
            this.message = event.target.value
        },
        handleCK: function(comment) {
            console.log(comment)
        }
    }
})

let p90 = new Vue({
    el: '#p90',
    data: {
        vModel: 'v-model 예시',
        vTextArea: 'textarea 예시',
        val: 'yes',
        val1: [],
        val2: '',
        val3: '',
        val4: [],
        preview: '',
        val5: 50,
        price: 100
    },
    methods: {
        handleChange(event) {
            let file = event.target.files[0]
            if (file && file.type.match(/^image\/(png|jpeg)$/)) {
                this.preview = window.URL.createObjectURL(file)
            }
        }
    }
})
var scroll = new SmoothScroll()

$(function() {
    $(document).on('click', '[data-update]', function () {
        $('#message').val($(this).attr('data-update'));
        // 입력 값을 변경했다면 이벤트 발생시키기
        $('#message')[0].dispatchEvent(new Event('input'));
    })
})

let p100 = new Vue({
    el: '#p100',
    data: {
        scrollY: 0,
        timer: null
    },
    created: function() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy: function() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            if(this.timer === null ) {
                this.timer = setTimeout(function() {
                    this.scrollY = window.scrollY;
                    clearTimeout(this.timer)
                    this.timer = null
                }.bind(this), 200)
            }
        },
        scrollTop: function() {
            scroll.animateScroll(0)
        },
        handleInput(event) {
            console.log(event.target.value);
        }
    }
})




