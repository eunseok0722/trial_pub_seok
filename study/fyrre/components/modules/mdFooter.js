const state = ({
    footerNewsTickerList: [
        {id: 1, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 2, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 3, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 4, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 5, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 6, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 7, txt: 'NEWSLETTER+++', path: '/magazine'},
        {id: 8, txt: 'NEWSLETTER+++', path: '/magazine'},
    ],
    sitemapList: [
        {id: 1, name: 'Art', url: '/magazine'},
        {id: 2, name: 'Design', url: '/magazine'},
        {id: 3, name: 'Architecture', url: '/magazine'},
        {id: 4, name: 'Magazine', url: '/magazine'},
        {id: 5, name: 'Podcast', url: '/podcast'},
        {id: 6, name: 'Authors', url: '/authors'},
        {id: 7, name: 'Styleguide', url: '/'},
        {id: 8, name: 'Licensing', url: '/'},
        {id: 9, name: 'Changelog', url: '/'},
    ],
    logoImgWhite : { url: 'fyrre_magazine_w.png' }
});

const getters = {


}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}