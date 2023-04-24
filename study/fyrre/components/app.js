'use strict';
import Store from './store.js'
import Router from './router.js'

// vue3-sfc-loader 설정
const options = {
    moduleCache: {
        vue: Vue,
    },
    async getFile(url) {
        const res = await fetch(url);
        if ( !res.ok )
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {
        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
}

const { loadModule } = window['vue3-sfc-loader'];

// vue 인스턴스 설정
const app = Vue.createApp({
    components: {
        'comp-header' : Vue.defineAsyncComponent(()=> loadModule('../components/CompHeader.vue', options)),
        'comp-footer' : Vue.defineAsyncComponent(()=> loadModule('../components/CompFooter.vue', options)),
        'main-content' : Vue.defineAsyncComponent(()=> loadModule('../components/MainContent.vue', options)),
        'magazine-main' : Vue.defineAsyncComponent(()=> loadModule('../components/MagazineMain.vue', options)),
        'authors-main' : Vue.defineAsyncComponent(()=> loadModule('../components/AuthorsMain.vue', options)),
        'podcast-main' : Vue.defineAsyncComponent(()=> loadModule('../components/PodcastMain.vue', options)),
        'magazine-post' : Vue.defineAsyncComponent(()=> loadModule('../components/MagazinePost.vue', options)),
        'podcast-post' : Vue.defineAsyncComponent(()=> loadModule('../components/PodcastPost.vue', options)),
        'author-post' : Vue.defineAsyncComponent(()=> loadModule('../components/AuthorPost.vue', options)),
    },
    computed() {
        state: {
            return this.$store.getState()
        }
    },
    created() {
    }
})

/* store 사용하기, #wrapper에 마운트하기 */
app.use(Store).use(Router).mount('#wrapper');