
// vue3-sfc-loader 설정

const options = {
    moduleCache: {
        vue: Vue,
        // scss: source => Object.assign(sass(source), { deps: () => [] }),
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

let
    CompHeader = ()=> loadModule('../components/CompHeader.vue', options),
    CompFooter = ()=> loadModule('../components/CompFooter.vue', options),
    MainContent = ()=> loadModule('../components/MainContent.vue', options),
    MainMagazineList = ()=> loadModule('../components/MainMagazineList.vue', options),
    MainAuthor = ()=> loadModule('../components/MainAuthor.vue', options),
    CategoriesList = ()=> loadModule('../components/Categories.vue', options),
    MagazineMain = ()=> loadModule('../components/MagazineMain.vue', options),
    MagazineList = ()=> loadModule('../components/MagazineList.vue', options),
    MagazinePost = ()=> loadModule('../components/MagazinePost.vue', options),
    PodcastMain = ()=> loadModule('../components/PodcastMain.vue', options),
    PodcastMainList = ()=> loadModule('../components/PodcastMainList.vue', options),
    PodcastPost = ()=> loadModule('../components/PodcastPost.vue', options),
    PodcastList = ()=> loadModule('../components/PodcastList.vue', options),
    AuthorsList = ()=> loadModule('../components/AuthorsList.vue', options),
    AuthorPost = ()=> loadModule('../components/AuthorPost.vue', options),
    AuthorsMain = ()=> loadModule('../components/AuthorsMain.vue', options),
    AuthorArticlesList = ()=> loadModule('../components/AuthorArticlesList.vue', options);

const routes = [
    {
        name: 'main-content',
        path: '/',
        component: MainContent,
        meta : {
            title: 'Fyrre Magazine Main'
        }
    },
    {
        name: 'magazine',
        path: '/magazine',
        component: MagazineMain,
        meta : {
            title: 'Fyrre Magazine'
        }
    },
    {
        name: 'magazine-post',
        path: '/magazine/:id',
        component: MagazinePost,
        props: route => ({ id: Number(route.params.id)})
    },
    {
        name: 'authors',
        path: '/authors',
        component: AuthorsMain,
        meta : {
            title: 'Fyrre Magazine Author'
        }
    },
    {
        name: 'author-post',
        path: '/authors/:id',
        component: AuthorPost,
        props: route => ({ id: Number(route.params.id)})
    },
    {
        name: 'podcast',
        path: '/podcast',
        component: PodcastMain,
        meta : {
            title: 'Fyrre Magazine Podcast'
        }
    },
    {
        name: 'podcast-post',
        path: '/podcast/:id',
        component: PodcastPost,
        props: route => ({ id: Number(route.params.id)})
    },

]


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router