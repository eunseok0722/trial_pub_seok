import moduleHeader from "./modules/mdHeader.js";
import moduleFooter from "./modules/mdFooter.js";
import moduleMainPage from "./modules/mdMainPage.js";
import moduleMagazine from "./modules/mdMagazine.js";
import modulePodcast from "./modules/mdPodcast.js";
import moduleAuthors from "./modules/mdAuthors.js"

const Store = Vuex.createStore({
    modules: {
        moduleHeader,
        moduleFooter,
        moduleMainPage,
        moduleMagazine,
        modulePodcast,
        moduleAuthors

    },
    state: {
        count: 0,
        path: {
            img: '../assets/images/',
            components: '../components/'
        },
        navSnsItem: [
            {id: 1, name: 'Instagram', url: 'https://www.instagram.com/', src: `ico_instagram.png`, class: ['sns-ico', 'insta']},
            {id: 2, name: 'twitter', url: 'https://twitter.com/', src: `ico_twitter.png`, class: ['sns-ico', 'twitter']},
            {id: 3, name: 'youtube', url: 'https://www.youtube.com/', src: `ico_youtube.png`, class: ['sns-ico', 'youtube']},
            {id: 4, name: 'rss', url: 'https://rss.com/', src: `ico_rss.png`, class: ['sns-ico', 'rss']},
        ],
        navSnsItemWhite: [
            {id: 1, name: 'Instagram', url: 'https://www.instagram.com/', src: `ico_instagram.png`, class: ['sns-ico', 'insta', 'w']},
            {id: 2, name: 'twitter', url: 'https://twitter.com/', src: `ico_twitter.png`, class: ['sns-ico', 'twitter', 'w']},
            {id: 3, name: 'youtube', url: 'https://www.youtube.com/', src: `ico_youtube.png`, class: ['sns-ico', 'youtube', 'w']},
            {id: 4, name: 'rss', url: 'https://rss.com/', src: `ico_rss.png`, class: ['sns-ico', 'rss', 'w']},
        ],
        navListenItem: [
            {id: 1, name: 'spotify', url: 'https://www.spotify.com/kr-ko/', src: '../assets/images/ico_spotify.png', class:['sns-ico', 'spotify']},
            {id: 2, name: 'apple', url: 'https://music.apple.com/us/browse', src: '../assets/images/ico_apple.png', class:['sns-ico', 'apple']},
            {id: 3, name: 'soundcloud', url: 'https://soundcloud.com/', src: '../assets/images/ico_soundcloud.png', class:['sns-ico', 'soundcloud']},
        ],

    },
    getters: {},
    mutations: {}
})

export default Store