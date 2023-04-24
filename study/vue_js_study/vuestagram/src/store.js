import {createStore} from 'vuex'
import InstaContents from "@/assets/InstaContents";
import axios from 'axios';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 0,
            name: 'kim',
            age: 20,
            contents: InstaContents,

            // actions로 더보기에 들어오는 값을 넣기
            more: {},
            follower: [],
        }
    },
    getters: {
        name(state) {
            return state.name;
        },
        age(state) {
            return state.age;
        }
    },
    mutations: {
        increment(state) {
            if(state.count < 1) {
                state.count++
            }else {
                state.count = 0;
            }
        },
        setName(state, payload) {
            state.name = payload;
        },
        addPost(state) {
            state.contents.push(state.more);
        },
        incAge(state) {
            state.age ++
        },
        clkLike(state, payload) {
            if(state.contents[payload].liked === false) {
                state.contents[payload].liked = true;
                state.contents[payload].likes ++;
            }else{
                state.contents[payload].liked = false;
                state.contents[payload].likes --;
            }
        },
        setMore(state, payload) {
            state.more = payload
        },
        followerList(state, payload) {
            state.follower = payload;
        }
    },
    actions: {
        // ajax 요청 하는 곳 또는 오래 걸리는 작업들
        // 순차적으로 state변경 하고싶으면
        // name 바꾸는 mutations 함수() -> age 바꾸는 mutations 함수()
        // 위와 같은 경우 actions를 사용해야 한다.
        getData(context) {
            axios.get(`https://codingapple1.github.io/vue/more${context.state.count}.json`).then( a => {
                // console.log(a.data);
                // state를 변경할때는 무조건 mutation을 이용해야함
                // context는 store의 data를 의미하는 파라미터명
                context.commit('setMore', a.data);
                context.commit('addPost')
                context.commit('increment');
            })
        }


    }
})

export default store;