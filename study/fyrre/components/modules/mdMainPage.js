const state = ({
    newsTickerList: [
        {
            id: 1,
            txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit +++ ',
            path: 'magazine/1'
        },
        {
            id: 2,
            txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit +++',
            path: 'podcast/2',
        },
    ],
    headlineDetail:
        {
            id: 1,
            tit: 'DON\'T CLOSE YOUR EYES',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
            text: 'Jakob Gronberg',
            date: '16. March 2022',
            duration: '1 Min',
            img: 'banner_1.png'
        },
    mostPopularList: [
        {
            id: '01',
            tit: 'Street art festival',
            text: 'Cristofer Vaccaro',
            link: '6'
        },
        {
            id: '02',
            tit: 'Hope dies last',
            text: 'Anne Henry',
            link: '1'
        },
        {
            id: '03',
            tit: 'Artists who want to rise above',
            text: 'Anna Nielsen',
            link: '9'
        },
    ],
    latestMagazine: {
        pub: '03/2022',
        img: 'magazine_aside_cover.png'
    }
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