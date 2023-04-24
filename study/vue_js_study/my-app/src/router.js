import Vue from 'vue'
// vue-router import 하기
import VueRouter from 'vue-router'

// 라우트 전용 컴포넌트 읽어들이기
import Home from './views/Home.vue'
import ProductList from './views/ProductList.vue'
import Product from './views/Product.vue'
import store from './store'
import ProductHome from '@/views/Product/CompHome.vue'
import ProductReview from '@/views/Product/Review.vue'
import ProductReviewDetail from '@/views/Product/ReviewDetail.vue'
import User from '@/views/User.vue'
// 비동기 컴포넌트, 초반에 불러오지 않고 필요할 때 불러오게 만들기
const About = () => import('@/views/About')

// 플러그인으로 등록
Vue.use(VueRouter)

// VueRouter 인스턴스 생성하기
const router = new VueRouter({
  // 히스토리 모드로 변경하고 싶을 경우
  // mode: 'history',

  // 서브 디렉토리가 있는 경우 서브 적용 방법
  // base: /my-app/

  // URL의 경로와 연결할 컴포넌트 맵핑하기
  routes: [
    {name: Home, path: '/', component: Home},
    {
      name: Product,
      // 숫자만 매칭되게 만들기 (\\d+) 정규식
      path: '/product/:id(\\d+)',
      component: Product,
      // props: true // 매개변수를 props로 컴포넌트에 전달
      props: route => ({
        id: Number(route.params.id)
      }),
      children: [
        //  상품 정보 (디폴트 라우트)
        {
          name: 'product-home',
          path: '',
          component: ProductHome
        },
        {
          name: 'product-review',
          path: 'review',
          component: ProductReview
        },
        {
          name: 'review-detail',
          path: 'review/:rid',
          component: ProductReviewDetail
        }
      ]
    },
    {
      name: ProductList,
      path: '/product', // ID가 붙어 있지 않으면 리스트 출력하기
      component: ProductList
    },
    // 변수로 등록한 About 덕분에 함수가 호출되기 전까지 불러오지 않음
    {
      path: '/about',
      component: About
      // 위에서 따로 About을 변수로 정의하지 않았을 경우 아래와 같이 작성
      // component: () => import('@/views/About')
    },
    // 접근 제한하고 싶은 라우트 예제
    {
      path: '/user',
      component: User,
      meta: {
        requiresAuth: true
      }
    }
  ],
  // 스크롤 동작 조작하기
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
// 전역적인 네비게이션 가드 등록하기
router.beforeEach((to, from, next) => {
  store.commit('view/start')
  // 상위 라우트를 포함해서 인증이 필요한 라우트가 있는지 확인
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // 인증 상태 확인
  //   if (!auth.loggedIn()) {
  //     // 인증 되어 있지 않으면 로그인 페이지로 리다이렉트
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next() // 인증이 필요하지 않은 라우트라면 next()로 이동
  // }
  next()
})
router.afterEach(() => {
  store.commit('view/end')
})

// 생성한 VueRouter 인스턴스 익스포트하기
export default router
