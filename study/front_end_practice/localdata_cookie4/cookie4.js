// 라이브러리를 이용한 JS 쿠키 - jQeury Cookie
// 다른 자바스크립트 쿠키 관련 라이브러리들도 사용법은 비슷하다. 그러나 똑같지 안핟.

// 쿠키 읽기
const getCookie = function () {
    // 로컬에 저장된 모든 쿠키 읽어오기
    const allCookies = document.cookie; // 하나의 문자열로 리턴
    // console.log(allCookies);

    // if 조건문 -> 쿠키가 있으면
    if (allCookies != '') {
        alert(`저장된 쿠키의 값은 : ${allCookies}`);
    } else {
        alert(`저장된 쿠키가 없습니다.`);
    }
}

// [1] 쿠키 생성하기 -> jQeury Cookie
Cookies.set('userid', 'superman1004');


// [2] 쿠키 생성 -> 만료일 지정
Cookies.set('username', 'batman', {expires: 7})

// [3] 쿠키 생성 -> 만료일 지정 및 패스 지정 --> '/' 지정시 사이트 전체에서 쿠키 유효.
// 주의! -> 위와 같이 경로를 지정했으면 삭제시에도 반드시 지정해야한다.
Cookies.set('uid', 'antman', {expires: 7, path: '/'});

// [4] 쿠키 읽기
const cookie_userid = Cookies.get('userid');
console.log(cookie_userid); // superman1004
console.log(Cookies.get('asdf'))  // undefined

// [5] 모든 쿠키 읽기
const allCookies = Cookies.get();
console.log(allCookies);
console.log(typeof allCookies);


// [6] 쿠키 삭제하기
// 삭제할 쿠키가 있을 경우 true, 엉뚱한 이름으로 요청할 경우 false가 반환됨
// Cookies.remove('userid');
// const allCookies2 = Cookies.get();
// console.log(allCookies2);


// 쿠키 삭제
const delCookies = function (name) {
    event.preventDefault();
    name = document.getElementById('name');
    let cval = name.value;
    console.log(cval);

    Cookies.remove(cval);
    alert(`${cval}을(를) 삭제하였습니다.`);
}
const form = document.getElementById('form');
form.addEventListener('submit', delCookies);

// [7] 쿠키 생성시 domain, path 지정과 함께 생성되면 삭제시에도 똑같이 필요
// console.clear();
Cookies.set('dogid', 'dog1004', {expires: 7, path: '/'});
// path 지정을 하지 않으면 기본으로 '/' 루트로 지정이 되어있어서 명시하지 않아도 삭제가 되는 것 처럼 보임
// Cookies.remove('dogid');
// 항상 아래와 같이 작성해야 된다는 것을 명심해야 함
Cookies.remove('dogid', {path: '/'});

Cookies.set('catid', 'cat1004', {expires: 7, path: '/front_end_practice/localdata_cookie4/'});
// 위와 같이 루트경로가 아닐 경우 이름으로 삭제를 하려고 하면 삭제가 되지 않는다.
Cookies.remove('catid'); // 삭제되지 않음
Cookies.remove('catid', {path: '/front_end_practice/localdata_cookie4/'}); // 삭제됨

// [7] js-cookie 전체삭제는 불가능
// 보여지는 쿠키들에 대한 전체 삭제를 한다면 어떻게 하는지 보여주는 내용
console.log(Cookies.get());
// Object.keys() 메서드를 이용해서 객체 안의 key 값들만 가져올 수 있음
let keys = Object.keys(Cookies.get());
console.log(keys);

// forEach 메서드를 이용해서 각각의 쿠키를 삭제하는 방법
function allDelCookies() {
    keys.forEach(function (cname) {
        // 할 일 처리
        // let neededOptions = { path: '/'};
        // 현재 localhost로 되어있기 때문에 도메인명이 다를 경우 삭제 되지 않음
        // let neededOptions = { domain: 'test.com'};
        let neededOptions = {domain: 'localhost'};
        Cookies.remove(cname, neededOptions);

    })
    alert(`쿠키가 전체 삭제되었습니다.`);
}

// [8] userGetCookie 함수 만들기 - 일반적인 For 반복문으로 함수만들기
console.log(document.cookie)
console.clear();
// 쿠키 읽기
const userGetCookie = function (cname) {
    // 플러그인을 사용하는 방법
    // const name = Cookies.get(cname);
    // return name;

    // 순수 JS 를 사용하는 방법
    let name = cname;
    // console.log(name);

    let allCookie = decodeURIComponent(document.cookie).split('; '); // 한칸 띄어쓰기 주의
    // console.log(allCookie);
    // encodeURIComponent는 자바스크립트에서 String 을 UTF-8로 인코딩해주는 함수
    // decodeURIComponent는 encodeURICompoent로 excape 된 문자열을 다시 원래의 문자열로 리턴해주는 함수
    // 비슷핫 메서드 -> encodeURL, DecodeURI, escape, unescape 전송하는 과정에서 한글이 깨지는 현상이 있을 경우 사용

    let cval = [];
    for (let i = 0; i < allCookie.length; i++) {
        // .trim()함수 빈칸 삭제하는 함수
        // console.log(allCookie[i].trim().indexOf(name));
        // userid= 의 인덱스 리턴값 -> 배열일 경우 -> 검색된 항목의 index 값
        // 문자열일 경우 검색된 문자열의 첫 글자의 index 값
        // 검색 결과가 없을 경우 -1 리턴
        // 검색 결과가 있는 것은 -1이 아닌 것이 나오게 됨

        // if 조건문
        if (allCookie[i].trim().indexOf(name) == 0) {
            // userid=superman1004가 매칭되서 들어옴
            // [ userid, superman1004 ] 이렇게 들어가게 됨
            cval = allCookie[i].trim().split('=');
            // console.log(cval); // ['userid', 'superman1004']
            // console.log(cval[1]); // superman1004 2가 있는 배열에 1번째 값을 리턴
            // console.log(cval.length); // 2 -> 배열의 개수
        }
    }
    // 삼항 연산자를 사용해서 조건을 걸어주기
    return cval.length > 0 ? cval[1] : '없음'; // 배열에서 1번째 값, 즉 value를 리턴
}


// console.log('userGetCookie 함수로 리턴된 값은 ='+ userGetCookie('uid')); // 0 -1 -1
// console.log('userGetCookie 함수로 리턴된 값은 ='+ userGetCookie('username')); // -1 0 -1
// console.log('userGetCookie 함수로 리턴된 값은 : '+ userGetCookie('antman')); // -1 -1 4 매칭되기 시작한 곳이 4부터 시작 uid=antman
console.log('userGetCookie 함수로 리턴된 값은 : ' + userGetCookie('userid')); // -1 -1 0


// [8-1] userGetCookie 함수 만들기 연습 -> oneGetCookie

const oneGetCookie = function (input) {
    let name = input;
    let searchResult = [];
    let allCookie = decodeURIComponent(document.cookie).split('; ');

    for (let i = 0; i < allCookie.length; i++) {
        if (allCookie[i].trim().indexOf(name) == 0) {
            searchResult = allCookie[i].trim().split('=');
        }
    }

    return searchResult.length > 0 ? searchResult[1] : '없음';
}
console.log('검색결과 : ' + oneGetCookie('user'));

// [9] forEach 메서드를 이용한 userGetCookie2 함수 만들기
console.clear();
console.log(document.cookie); //userid=superman1004; username=batman; uid=antman String으로 되어있음

const userGetCookie2 = function (search) {
    // 1. 객체 변수 선언
    let cookie = {}; // {userid=superman1004; username=batman; uid=antman} Object로 만들기 위해서 자료형 만들어 줌

    // 2. 반복 처리 - forEach()
    document.cookie.split(';').forEach(function (el) {
        // 각각의 엘리먼트(el)에 처리해 줄 일 처리
        let [k, v] = el.trim().split('=');
        // console.log(k); // split()함수가 [key, value]의 배열로 반환을 해줌
        // if (k.indexOf(search) == 0) {
        // object 형이기 때문에 cookie['userid']에 value로 'superman1004'로 한다는 뜻
            cookie[k] = v;
        // }
    })
    // Object자료형이기 때문에 userid를 키값으로 가지고 있는 것의 값을 출력하라는 뜻
    console.log(cookie);
    return cookie[search];
}
console.log(userGetCookie2('username'));

// [10] ES6 버전으로 userGetCookie3 함수 만들기
console.clear();
const userGetCookie3 = function(cname)  {
    // 1. cname 수정
    cname = cname + "=";  // userid=

    // 2. 문자열(쿠키명) 찾기;
    const str = document.cookie;
    // boolean isCookie = str.contains(cname); // Java에서는 Contains() 사용
    const isCookieIdx = str.indexOf(cname);
    // console.log(isCookieIdx); // 입력된 값의 문자열이 시작되는 곳

    // 3. 쿠키 가져와서 분리 -> 처리
    let result = 'no search result';
    if(isCookieIdx >= 0 ) {
        // 할 일 처리
        result = document.cookie // username= batman; cname=antman; userid=superman1004
            .split('; ') // 쿠키를 '; '로 분리해서 3개의 아이템으로 만듦
            .find(item => item.startsWith(cname)) // 사용자가 입력한 내용으로 startsWith() 특정 문자열로 시작하는 것이 있으면 true 반환
                                                  // find() 메서드가 cname으로 들어온 내용과 일치한 아이템을 찾음
            .split('=') // item에서 k, v를 분리
            [1]; // 배열 요소에서 1번째를 result에 저장하기
    }
    return result
}
console.log('userGetCookie3 함수로 리턴되는 값 : ' + userGetCookie3('userid'));

function showCval(cname) {
    const rst = document.getElementById('cval');
    rst.textContent = userGetCookie3(cname);
}
function clearCval() {
    const rst = document.getElementById('cval');
    // span, div 같은 엘리먼트는 textContent 메서드를 사용해야한다.
    rst.textContent = '';
}

// [10-1] startsWith() 함수 사용하는 방법
// 문자열 검색 시 특정 문자열로 시작하는지 체크 true 또는 false 반환
// 즉, 검색할 문자열로 시작하면 true, 아니면 false
// str.startsWith(검색문자열[, position]) position 생략 가능
// position 옵션은 '검색문자열' 탐색할 위치 지정, 기본값 -> 0
// 대소문자 구분

// 문자열인 경우
console.clear();
const str = "간장 공장 공장장은 강공장장이고, 된장 공장 공장장은 장공장장이다."
console.log(str.startsWith('강공장장')); // false 시작이 간장으로 시작하는지를 체크하니까 false
console.log(str.startsWith('박공장장')); // false
console.log(str.startsWith('강공장장', 11)); // true 강공장장이 시작하는 위치 11이 되면 true를 반환하게 된다.
console.log(str.startsWith('간장')); // true

// 배열인 경우
console.clear();
const ar = 'dog=5; cat=7; hippo=9; lion=4; tiger=2';
console.log(typeof ar);
const ar2 = ar.split('; ');
console.log(ar2);

const ar3 = ar2.find(item => item.startsWith('hippo')); // 주어진 조건의 함수를 만족하는 첫 번째 요소의 값을 반환
console.log(ar3);

const ar4 = ar3.split("=");
console.log(ar4);

const ar5 = ar4[1];
console.log(ar5);

// findIndex
const ar6 = ar2.findIndex(item => item.startsWith('hippo=')); // 주어진 조건의 함수를 만족하는 함수의 인덱스값 찾기
console.log(ar6);

// 배열 요소의 위치를 찾고자한다면 .indexOf()
// 배열 요소가 해당 배열에 존재하는지 체크하려면 -> .indexOf() 또는 .includes()