import { createApp } from 'vue'
import App from './App.vue'
// mitt 라이브러리 설치하는 법
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
// emitter를 global properties 글로벌 보관함에 emitter를 부를때마다 mitt를 실행하겠다는 뜻
app.config.globalProperties.emitter = emitter;

// 위와 같이 등록하면 this.emitter 를 통해서 호출할 수 있음
// //mitt 라이브러리 설치법
// 자주 쓰는 라이브러리 있으면 여기에 등록하는 것
// axios를 예를 들면 아래와 같이 등록하면 vue 파일에서 import 할 필요 없이 this.axios로 사용 가능
// app.config.globalProperties.axios = axios;
import store from './store'

// vue add pwa 명령어를 치면 플러그인 설치부터 main js 등록까지 알아서 해줌
import './registerServiceWorker'

// createApp(app)을 위에 적었기 떄문에 app이라는 변수명으로 대체해줬음
app.use(store).mount('#app')
