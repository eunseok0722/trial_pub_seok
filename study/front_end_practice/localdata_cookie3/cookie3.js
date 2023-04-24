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
// 만료일이 안들어갈 경우 session cookie로 저장됨
$.cookie('userid', 'superman1004');


// [2] 쿠키 생성 -> 만료일 지정
$.cookie('username', 'batman', {expires: 7});

// [3] 쿠키 생성 -> 만료일 지정 및 패스 지정 --> '/' 지정시 사이트 전체에서 쿠키 유효.
$.cookie ('uid', 'andman', {expires: 7, path: '/'});
// 주의! -> 위와 같이 경로를 지정했으면 삭제시에도 반드시 지정해야한다.

// [4] 쿠키 읽기
console.log($.cookie('userid')); // superman1004
console.log($.cookie('asdf')); // undefined

// [5] 모든 쿠키 읽기
console.log($.cookie());

// [6] 쿠키 삭제하기
// 삭제할 쿠키가 있을 경우 true, 엉뚱한 이름으로 요청할 경우 false가 반환됨
console.log($.removeCookie('userid')); // true
console.log($.cookie()); // uid, username만 출력됨

// [7] 쿠키 생성시 domain, path 지정과 함께 생성되면 삭제시에도 똑같이 필요
console.clear();
$.cookie('dogid', 'ddd1234', { expires: 7, path: '/'});
console.log($.removeCookie('dogid')); // false 쿠키명만 지정했을 때는 삭제되지 않는다.
console.log($.removeCookie('dogid', {path: '/'})) // true