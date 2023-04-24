'use strict';

const tpl = {
    srcChk : undefined, // page 식별용 변수
    data : {
        main: {
            gnb: [
                {id: 1, class: 'active', href: '#intro', img: 'experiment.png', title: 'EXPERIMENT'},
                {id: 2, class: '', href: 'pages/know.html', img: 'know.png', title: 'KNOW MORE'},
                {id: 3, class: '', href: 'pages/shop.html', img: 'shop/shop.png', title: 'SHOP'},
            ],
            lnb: [
                {id: 1, class: 'active', href: '#intro', img: `title1.png`, title: `cyclemon`,},
                {id: 2, class: '', href: '#night-rider', img: `title20.png`, title: `night-rider`,},
                {id: 3, class: '', href: '#traveller', img: `title2.png`, title: `traveller`,},
                {id: 4, class: '', href: '#weirdo', img: `title3.png`, title: `weirdo`,},
                {id: 5, class: '', href: '#hipster', img: `title4.png`, title: `hipster`,},
                {id: 6, class: '', href: '#swagger', img: `title5.png`, title: `swagger`,},
                {id: 7, class: '', href: '#vintage-guy', img: `title6.png`, title: `vintage-guy`,},
                {id: 8, class: '', href: '#grand-pa', img: `title7.png`, title: `grand-pa`,},
                {id: 9, class: '', href: '#tandem', img: `title8.png`, title: `tandem`,},
                {id: 10, class: '', href: '#baby-doll', img: `title9.png`, title: `baby-doll`,},
                {id: 11, class: '', href: '#cougar', img: `title10.png`, title: `cougar`,},
                {id: 12, class: '', href: '#freestyler', img: `title11.png`, title: `freestyler`,},
                {id: 13, class: '', href: '#gangsta', img: `title12.png`, title: `gangsta`,},
                {id: 14, class: '', href: '#lil-gangsta', img: `title13.png`, title: `lil-gangsta`,},
                {id: 15, class: '', href: '#runner', img: `title14.png`, title: `runner`,},
                {id: 16, class: '', href: '#rigid-guy', img: `title15.png`, title: `rigid-guy`,},
                {id: 17, class: '', href: '#warrior', img: `title16.png`, title: `warrior`,},
                {id: 18, class: '', href: '#lazy-guy', img: `title17.png`, title: `lazy-guy`,},
                {id: 19, class: '', href: '#fake', img: `title18.png`, title: `fake`,},
                {id: 20, class: '', href: '#footer', img: `title19.png`, title: `Know more`,},
            ],
            sec: [
                {id: 1, title: 'intro', imgArt: true},
                {id: 2, title: 'traveller', class: 'section-bg', imgArt: true},
                {id: 3, title: 'weirdo', class: 'section-bg', imgArt: true},
                {id: 4, title: 'hipster', class: 'section-bg', imgArt: true},
                {id: 5, title: 'swagger', class: 'section-bg', imgArt: true},
                {id: 6, title: 'vintage-guy', class: 'section-bg', imgArt: true},
                {id: 7, title: 'grand-pa', class: 'section-bg', imgArt: true},
                {id: 8, title: 'tandem', class: 'section-bg', imgArt: true},
                {id: 9, title: 'baby-doll', class: 'section-bg', imgArt: true},
                {id: 10, title: 'cougar', class: 'section-bg', imgArt: true},
                {id: 11, title: 'freestyler', class: 'section-bg', imgArt: true},
                {id: 12, title: 'gangsta', class: 'section-bg', imgArt: true},
                {id: 13, title: 'lil-gangsta', class: 'section-bg', imgArt: true},
                {id: 14, title: 'runner', class: 'section-bg', imgArt: true},
                {id: 15, title: 'rigid-guy', class: 'section-bg', imgArt: true},
                {id: 16, title: 'warrior', class: 'section-bg', imgArt: true},
                {id: 17, title: 'lazy-guy', class: 'section-bg', imgArt: true},
                {id: 18, title: 'fake', class: 'section-bg', imgArt: true},
                {id: 19, title: 'night-rider', class: 'section-bg', imgArt: true, trlArt: true},
            ]
        },
        shop: {
            class: `ty02`,
            gnb: [
                {id: 1, class: '', href: '../index.html', img: 'shop/expb.png', title: 'EXPERIMENT'},
                {id: 2, class: '', href: 'know.html', img: 'shop/knowb.png', title: 'KNOW MORE'},
                {id: 3, class: 'active', href: '#part1', img: 'shop/shopb.png', title: 'SHOP'},
            ],
            lnb: [
                {id: 1, class: 'active', href: '#part1', img: `shop/screenprint.png`, title: `SCREEN PRINT`,},
                {id: 2, class: '', href: '#part2', img: `shop/postersb.png`, title: `ABOUT US`,},
            ],
            screen: [
                {id: 1, name: `tandem`, href: `tandem.jpg`, img: `shop/tandempet.jpg` },
                {id: 2, name: `weirdo`, href: `weirdo.jpg`, img: `shop/weirdopet.jpg` },
                {id: 3, name: `hipster`, href: `hipster.jpg`, img: `shop/hipsterpet.jpg` },
                {id: 4, name: `gangsta`, href: `gangsta.jpg`, img: `shop/gangstapet.jpg` },
            ],
            poster: [
                {
                    id: 1,
                    href: `https://society6.com/ThomasPomarelle/Night-Rider-IrY_Print`,
                    img: `shop/night.jpg`,
                    title: `Night Rider`,
                    price: `18$`
                },
                {
                    id: 2,
                    href: `https://society6.com/ThomasPomarelle/Swagger-WsS_Print`,
                    img: `shop/swa.jpg`,
                    title: `Swagger`,
                    price: `18$`
                },
                {
                    id: 3,
                    href: `https://society6.com/ThomasPomarelle/Tandem-8um_Print`,
                    img: `shop/tan.jpg`,
                    title: `Tandem`,
                    price: `18$`
                },
                {
                    id: 4,
                    href: `https://society6.com/ThomasPomarelle/Grand-Pa_Print`,
                    img: `shop/gra.jpg`,
                    title: `Grand'pa`,
                    price: `18$`
                },
                {
                    id: 5,
                    href: `https://society6.com/ThomasPomarelle/Baby-Doll-sOw_Print`,
                    img: `shop/bab.jpg`,
                    title: `Baby Doll`,
                    price: `18$`
                },
                {
                    id: 6,
                    href: `https://society6.com/ThomasPomarelle/Cougar-gGo_Print`,
                    img: `shop/cou.jpg`,
                    title: `Cougar`,
                    price: `18$`
                },
                {
                    id: 7,
                    href: `https://society6.com/ThomasPomarelle/Freestyler_Print`,
                    img: `shop/fre.jpg`,
                    title: `Freestyler`,
                    price: `18$`
                },
                {
                    id: 8,
                    href: `https://society6.com/ThomasPomarelle/Traveller-GW2_Print`,
                    img: `shop/tra.jpg`,
                    title: `Traveller`,
                    price: `18$`
                },
                {
                    id: 9,
                    href: `https://society6.com/ThomasPomarelle/Weirdo-ww5_Print`,
                    img: `shop/we.jpg`,
                    title: `Weirdo`,
                    price: `18$`
                },
                {
                    id: 10,
                    href: `https://society6.com/ThomasPomarelle/Hipster-usH_Print`,
                    img: `shop/hip.jpg`,
                    title: `Hipster`,
                    price: `18$`
                },
                {
                    id: 11,
                    href: `https://society6.com/ThomasPomarelle/Runner-nPw_Print`,
                    img: `shop/run.jpg`,
                    title: `Runner`,
                    price: `18$`
                },
                {
                    id: 12,
                    href: `https://society6.com/ThomasPomarelle/Vintage-Guy_Print`,
                    img: `shop/vin.jpg`,
                    title: `Vintage Guy`,
                    price: `18$`
                },
                {
                    id: 13,
                    href: `https://society6.com/ThomasPomarelle/Gangsta_Print`,
                    img: `shop/gan.jpg`,
                    title: `Gangsta`,
                    price: `18$`
                },
                {
                    id: 14,
                    href: `https://society6.com/ThomasPomarelle/Lil-Gangsta_Print`,
                    img: `shop/lil.jpg`,
                    title: `Lil' Gangsta`,
                    price: `18$`
                },
                {
                    id: 15,
                    href: `https://society6.com/ThomasPomarelle/Rigid-Guy_Print`,
                    img: `shop/rig.jpg`,
                    title: `Rigid Guy`,
                    price: `18$`
                },
                {
                    id: 16,
                    href: `https://society6.com/ThomasPomarelle/Warrior-mDf_Print`,
                    img: `shop/war.jpg`,
                    title: `Warrior`,
                    price: `18$`
                },
                {
                    id: 17,
                    href: `https://society6.com/ThomasPomarelle/Lazy-Guy_Print`,
                    img: `shop/laz.jpg`,
                    title: `Lazy Guy`,
                    price: `18$`
                },
                {
                    id: 18,
                    href: `https://society6.com/ThomasPomarelle/Fake-skB_Print`,
                    img: `shop/fak.jpg`,
                    title: `Fake`,
                    price: `18$`
                },
            ]
        },
        know: {
            class: `ty02`,
            gnb: [
                {id: 1, class: '', href: '../index.html', img: 'experiment.png', title: 'EXPERIMENT'},
                {id: 2, class: 'active', href: '#part1', img: 'know.png', title: 'KNOW MORE'},
                {id: 3, class: '', href: 'shop.html', img: 'shop/shop.png', title: 'SHOP'},
            ],
            lnb: [
                {id: 1, class: 'active', href: '#part1', img: `knowm/title1.png`, title: `TEASER`},
                {id: 2, class: '', href: '#part2', img: `knowm/title3.png`, title: `ABOUT US`},
            ],
            profile: [
                {
                    id: 1,
                    name : `Thomas Pom`,
                    href: `https://www.thomaspomarelle.com/`,
                    img: `knowm/faces.jpg`,
                    sign: `knowm/tom.jpg`,
                    alt: `Thomas Pom - Illustration, Motion, Development`,
                    sum: `Freelance illustrator and motion Designer, graduated from Paris' Decorative Arts school.`,
                    sns: [
                        {id : 1, class: `portfolio`, href: `https://www.thomaspomarelle.com/`},
                        {id : 1, class: `twitter`, href: `https://twitter.com/PomThomas/`},
                        {id : 1, class: `dribble`, href: `https://dribbble.com/ThomasPomarelle/`},
                    ]
                },
                {
                    id: 2,
                    name : `Orthonormai`,
                    href: `https://orthonormai.com/`,
                    img: `knowm/faces2.jpg`,
                    sign: `knowm/rom1.jpg`,
                    alt: `Orthonormai - Illustration, Web Design`,
                    sum: `Interactive designer at OgivlyOne Paris, and graduated from Paris' Gobelins school.`,
                    sns: [
                        {id : 1, class: `portfolio`, href: `https://orthonormai.com/`},
                        {id : 1, class: `twitter`, href: `https://twitter.com/orthonormai`},
                        {id : 1, class: `dribble`, href: `https://dribbble.com/normai`},
                    ]
                }
            ]
        }
    }, // 각 페이지 데이터
    path : {
        img : {main: `./assets/images/`, sub: `../assets/images/`},
    }, // 이미지 경로 저장
    imgPath: ``, // 페이지별로 선언될 이미지 경로 변수
    pageSrc : undefined, // 페이지 소스 저장 변수
    template : undefined, // 페이지 소스 컴파일 후 템플릿으로 저장
    gnb : ``, // 공통 템플릿 gnb
    lnb : ``, // 공통 템플릿 lnb
    sns : `<div class="sns-wrap">
                <ul class="sns-list">
                    <li class="list-item">
                        <iframe src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.cyclemon.com&layout=button_count&show_faces=true&width=450&action=like&colorscheme=light&height=80"
                                scrolling="no" frameborder="0" class="facebook"></iframe>
                    </li>
                    <li class="list-item">
                        <a href="https://twitter.com/share" class="twitter-share-button" data-hashtags="cyclemon"
                           style="width:88px">Tweet</a>
                    </li>
                </ul>
            </div>`, // 공통 템플릿 sns
    mainSec : ``, // main의 section 템플릿
    imgArt : `<article class="product-img">
                <div class="img-box">
                </div>
              </article>`, //main section image article template
    trlArt : `<article class="trailer">
                    <ul class="trailer-list">
                        <li class="list-item">
                            <a target="_blank" class="text" href="https://vimeo.com/71045197"
                               title="Watch the Trailer">
                                Watch the Trailer
                            </a>
                        </li>
                        <li class="list-item">
                            <a target="_blank" href="https://revolights.com/" title="Go to the RevoLights Website"
                               class="symbol">
                                <img src="./assets/images/revo.png" alt="RevoLights Symbol Image">
                            </a>
                        </li>
                    </ul>
                </article>`, // main section trailer article template
    poster : ``, // shop poster-list template
    screen : ``, // shop screen-list template
    profile : ``, // know profile-list template
    html : undefined, // 템플릿에 데이터 적용하여 만든 html source
}
const tplInit = function () {
    // page 식별
    tpl.srcChk = document.querySelector('body');
    // src 경로 설정
    if (tpl.srcChk.classList.contains('main')) {
        tpl.imgPath = tpl.path.img.main;
    } else {
        tpl.imgPath = tpl.path.img.sub;
    }
    // 각페이지 템플릿 컴파일
    tpl.pageSrc = document.getElementById('entry-template').innerHTML;
    tpl.template = Handlebars.compile(tpl.pageSrc);
    // 공통요소 부분템플릿 정의
    tpl.gnb =
        `<nav class="gnb">
                <ul class="gnb-list {{class}}">
                    {{#each gnb as |item itemId|}}
                    <li class="list-item">
                        <a href="{{href}}" class="{{class}}">
                            <img src="${tpl.imgPath}{{img}}" alt="{{title}}" title="{{title}}">
                            <i class="blind">{{title}} 페이지로 이동</i>
                        </a>
                    </li>
                    {{/each}}
                </ul>
            </nav>`;
    tpl.lnb =
        `<nav class="lnb">
            <ul class="lnb-list {{class}}">
                {{#each lnb as |item itemId|}}
                <li class="list-item">
                    <div class="lnb-item {{class}}">
                        <a href="{{href}}">
                            <img src="${tpl.imgPath}{{img}}" alt="{{title}}">
                            <span title="Click to go to this section" class="btn-lnb">
                                <i class="blind">{{title}}</i>
                            </span>
                        </a>
                    </div>
                </li>
                {{/each}}
            </ul>
        </nav>`;
    Handlebars.registerPartial('Gnb', tpl.gnb);
    Handlebars.registerPartial('Lnb', tpl.lnb);
    Handlebars.registerPartial('Sns', tpl.sns);

    // 각 페이지별 템플릿 정의
    if (tpl.srcChk.classList.contains('main')) {
        // 메인페이지 템플릿 정의
        tpl.mainSec = document.getElementById('section-template').innerHTML;
        Handlebars.registerPartial('MainSec', tpl.mainSec);
        Handlebars.registerPartial('ImgArt', tpl.imgArt);
        Handlebars.registerPartial('TrlArt', tpl.trlArt);
    } else if (tpl.srcChk.classList.contains('shop')) {
        // shop 페이지 템플릿 정의
        tpl.poster = document.getElementById('poster-template').innerHTML;
        tpl.screen = document.getElementById('screen-template').innerHTML;
        Handlebars.registerPartial('Poster', tpl.poster);
        Handlebars.registerPartial('Screen', tpl.screen);
    } else if (tpl.srcChk.classList.contains('know')) {
        // know more 페이지 템플릿 정의
        tpl.profile = document.getElementById('profile-template').innerHTML;
        Handlebars.registerPartial('PrfArt', tpl.profile);
    }

    // 페이지별 데이터

    // 페이지 데이터 템플릿에 적용
    if (tpl.srcChk.classList.contains('main')) {
        tpl.html = tpl.template(tpl.data.main);
    } else if (tpl.srcChk.classList.contains('shop')) {
        tpl.html = tpl.template(tpl.data.shop);
    } else if (tpl.srcChk.classList.contains('know')) {
        tpl.html = tpl.template(tpl.data.know);
    }

    // 생성된 html 소스 body에 적용
    document.querySelector('body').innerHTML = tpl.html;
}

tplInit();