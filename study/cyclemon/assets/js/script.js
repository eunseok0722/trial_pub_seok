'use strict';

// 퍼블용 변수 선언 객체
const pub = {
    windowW: undefined,
    body: document.querySelector('body'),
    docH: 0, // 전체 높이값
    curH: 0, // 현재 높이값
    bgCurH: 0, // 백그라운드 작업용 현재 높이값
    cilH: 0, // 브라우저창 높이값
    bgH: 0, // .section-bg 높이값
    sec: document.querySelectorAll('.section'), // 섹션 리스트
    secSList: [], // 섹션 시작점 리스트
    secEList: [], // 섹션 종료지점 리스트
    secBG: document.querySelectorAll('.section-bg'), // 스크롤 이벤트 섹션 리스트
    lnbList: document.querySelectorAll('.lnb-item'), // lnb 개수
    lnbLink: [], // lnb 클릭 시 이동하는 href 값 저장 리스트
    timer: null, // setTimeout 쓰로틀링용 timer
    bgTimer: null, // background의 setTimeout 쓰로틀링용 timer
    btnNxt: document.querySelector('.btn-next'), // Next 버튼
    btnTrailer: document.querySelector('.trailer'), // Night Rider의 Trailer 버튼
    night: document.querySelector('#night-rider'), // Night Rider 섹션
    secBGList: [], // .section-bg 리스트
    secBGHList: [], // .section-bg height 리스트
    loader: document.querySelector('#loader'),
    sortFn: function (a, b) {
        if (a > b) return 1;
        if (a === b) return 0;
        if (a < b) return -1;
    }, // sort 메서드 정렬 함수
    activeLnb: function () {
        // lnb Active 삭제
        for (let k = 0; k < this.lnbList.length; k++) {
            this.lnbList[k].classList.remove('active');
        }
        // 현재 위치에 lnb 활성화
        for (let l = 0; l < this.lnbList.length; l++) {
            if (this.curH >= this.secSList[l] - 200 && this.curH < this.secEList[l] - 200) {
                this.lnbList[l].classList.add('active');
            }
        }
    }, // lnb 활성화 함수
    switchNext: function () {
        for (let n = 0; n < this.lnbList.length; n++) {
            if (this.curH >= this.secSList[n] - 10 && this.curH < this.secEList[n]) {
                if (this.secSList[n + 1] !== undefined) {
                    this.btnNxt.classList.remove('hide');
                    this.btnNxt.setAttribute('href', this.lnbLink[n + 1]);
                } else {
                    this.btnNxt.classList.add('hide');
                }
            }
        }
    }, // Next 버튼 동작 구현 함수
    showTrailer: function () {
        const nightS = this.night.offsetTop;
        const nightE = this.night.scrollHeight;
        if (this.curH >= nightS - (nightS - 100) && this.curH < nightE) {
            this.btnTrailer.classList.add('active');
        } else {
            this.btnTrailer.classList.remove('active');
        }
    }, // Night Rider 섹션의 Trailer 나타내는 동작 구현 함수
    bgScroll: function () {
        for (let i = 0; i < this.secBGList.length; i++) {
            if (pub.curH >= pub.secEList[i] - pub.bgH && pub.curH < pub.secEList[i + 1] + 500) {
                let evtS = (pub.secEList[i] - pub.bgH);
                let arg = pub.bgCurH - evtS;
                let point = pub.secEList[i] - evtS;
                let per = Math.round(((arg - point) / point) * 10000) / 100;
                this.secBGList[i].style.backgroundPositionY = String(64 - per) + '%';
            }
        }
    }, // section-bg Parallax 이벤트
    loaderHide: function () {
        this.body.classList.add('hidden');
        setTimeout(() => {
            this.loader.classList.add('hide');
            setTimeout(() => {
                this.loader.classList.add('none');
                this.body.classList.remove('hidden');
            }, 350);
        }, 1000);
    } // loader 숨기기 동작
}

// 페이지 로딩 결과 변수에 저장
const pubInit = function () {
    pub.windowW = window.matchMedia("screen and (min-width: 961px)").matches;
    pub.docH = pub.body.scrollHeight; // document 전체 높이값 저장
    pub.cliH = pub.body.clientHeight; // 브라우저창 높이값 저장

    // 각 섹션 시작 위치 리스트 저장
    for (let i = 0; i < pub.sec.length; i++) {
        pub.secSList.push(pub.sec[i].offsetTop);
    }
    pub.secSList.sort(pub.sortFn);

    // 섹션 종료 위치값 리스트 저장
    for (let j = 1; j < pub.secSList.length; j++) {
        pub.secEList.push(pub.secSList[j]);
    }
    pub.secEList.push(pub.docH);
    pub.secEList.sort(pub.sortFn);

    // lnb 리스트 저장
    for (let m = 0; m < pub.lnbList.length; m++) {
        pub.lnbLink.push(pub.lnbList[m].children[0].getAttribute('href'));
    }

    if (pub.secBG.length !== 0) {
        // .section-bg 리스트
        for (let o = 0; o < pub.secBG.length; o++) {
            pub.secBGList.push(pub.secBG[o]);
        }
        // night-rider 위치 조정
        const argSec = pub.secBGList.pop();
        pub.secBGList.unshift(argSec);
        pub.bgH = pub.secBGList[0].offsetHeight;
    }
}

// 페이지 로딩 결과 변수에 저장 함수 실행
pubInit();

// Scroll 이벤트
window.addEventListener('scroll', function (e) {
    if (!pub.timer) {
        pub.timer = setTimeout(function () {
            pub.curH = window.scrollY;
            // lnb active
            if (pub.lnbList.length !== 0) {
                pub.activeLnb();
            }
            // next switch
            if (pub.btnNxt) {
                pub.switchNext();
            }
            // night-rider Trailer
            if (pub.night) {
                pub.showTrailer();
            }
            pub.timer = null;
        }, 150);
    }
});

// main scroll Parallax Event
if (pub.secBG.length !== 0 && pub.windowW === true) {
    document.addEventListener('scroll', function (e) {
        if (!pub.bgTimer) {
            pub.bgTimer = setTimeout(function () {
                pub.bgCurH = window.scrollY;
                pub.bgScroll();
                pub.bgTimer = null;
            }, 10);
        }
    })
}

// loader 동작 구현
if (pub.loader) {
    pub.loaderHide();
}

// Twitter widget 기능 적용 함수
if (document.querySelector('.twitter-share-button')) {
    !function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'twitter-wjs');
}
