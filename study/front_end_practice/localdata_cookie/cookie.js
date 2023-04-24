// 자바스크립트로 쿠키 (Cookie) 읽기, 생성하기, 삭제하기
// 기본적인 방법 -> document.cookie = "name= ??, expires= ??, path= ??"

// 쿠키 저장하기
function getCookie() {
    // 로컬에 저장된 쿠키 뿌려주기
    const allCookies = document.cookie; // 하나의 문자열로 리턴 -> cookie1 = value; cookie2 = value;
    console.log(allCookies);

    // if 조건문 -> 쿠키가 있으면
    if (allCookies != '') {
        alert('저장된 쿠키의 값은 : ' + allCookies + '\n (다시 방문해 주셔서 감사합니다.)');
    }else {
        alert('저장된 쿠키 값이 없습니다. \n (첫 방문을 환영합니다.)');
    }
}

//  쿠키 생성하기

function setCookie() {
    // 기본적인 날짜 출력 -> 만료일 expire, expiration
    // let nowDate = new Date();
    // console.log(nowDate); //객체

    // 만료일 생성
    // let expiration = nowDate.getDate() + 30; // 현재날짜 불러오기
    // console.log(expiration); // 숫자

    // 29일로 날짜가 나타나도록 하는 방법
    let expiration = new Date();
    // setDate() 메서드 사용
    expiration.setDate(expiration.getDate() + 7);
    console.log(expiration); // 현재날짜 + 10일이 됨

    // 날짜 쿠키로 저장하기 위해 -> UTC 방식으로 표기 -> toUTCSting() 메서드 사용
    console.log(expiration.toUTCString());

    // 쿠키 생성하기
    let cookies = '';
    cookies = `userid = superman; expires= ${expiration.toUTCString()}`;
    document.cookie = cookies;
    alert('쿠키를 생성하였습니다.');
}

// 쿠키 삭제하기
function delCookie () {
    // document.cookie에 값을 덮어 씌우는 형태로 삭제 행위가 이루어짐
    // 사실상 쿠키의 삭제는 수정
    // 쿠키 삭제는 -> 한참 지나간 시점을 입력해서 쿠키를 삭제시킴
    // document.cookie = 'username = hongkildong';
    // document.cookie = 'username = leesoonsin'; // 쿠키 수정 방법
    document.cookie = 'userid = ; expires = Sat, 01 Jan 1972 00:00:00 GMT;'; // 국제협회표준시 UTC 시작일시를 입력하여 만료되게 만듦
    alert('쿠키를 삭제하였습니다.');
}

// [!] Summary
// 1. JS에서 쿠키를 편리하게 쓰려면 사용자가 직접 함수를 만들어서 쓰는 것이 편리하다.
// 2. JS 쿠키 관련 경량 라이브러리를 쓰는게 더 편리하다.
// 3. document.cookie 하나만 알면 모두 해결
// 4. 쿠키 삭제는 한참 지난 날짜 입력해서 삭제
// 5. 일반적으로 Set, Get, Del 3가지 사용자 함수를 구현해서 사용한다.
