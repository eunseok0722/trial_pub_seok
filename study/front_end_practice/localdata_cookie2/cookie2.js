// JS 쿠키 사용자정의 함수 및 전체 삭제 만들기

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

// 쿠키 생성하기 -> 함수표현식
const setCookie = function (name, value, expire) {
    // 할 일 처리
    event.preventDefault() // submit, href 발생 시 이동방지 및 새로고침 되는 것 방지

    // 넘어온 값이 있을 경우 해당 값을 입력하기
    if (document.getElementById('name').value != "") {
        name = document.getElementById('name').value;
        value = document.getElementById('value').value;
        expire = document.getElementById('expire').value;
    }
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + parseInt(expire));
    let exp = expDate.toUTCString();

    // 쿠키 만들기
    let cookies = '';
    cookies += `${name}=${value};`
    cookies += `expires=${exp};`

    // 쿠키 입력하기
    document.cookie = cookies;
    // input 초기화하기
    document.getElementById('form').reset();
}

// 쿠키 삭제하기
const delCookie = function (cname) {
    // 쿠키 삭제는? -> 이미 한참 지나가버린 시간을 입력해서 쿠키를 삭제
    // document.cookie = `userid=;expires=Sat, 01 Jan 1972 00:00:00 GMT;`;
    // 위의 값으로 쿠키를 생성하는 것과 같은 뜻

    console.log(cname);
    setCookie(cname, "", 0);
    alert('쿠키를 삭제하였습니다.');
}

// 쿠키 모두 삭제하기
const allDelCookies = function (domain, path) {
    domain = domain || document.domain;
    path = path || '/';
    // 문자열로 반환된 문자를 세미콜론을 이용하여 배열로 바꾸기
    const cookies = document.cookie.split('; '); // 세미콜론 뒤에 한칸 띄기
    const expiration = 'Sat 01 Jan 1972 00:00:00 GMT';
    // console.log(cookies);
    alert('쿠키가 모두 삭제되었습니다.');

    // 반복문 순회하면서 쿠키 전체 삭제
    for (let i = 0; i < cookies.length; i++) {
        // 내가 쓴 내용
        // cookies[i] += `; expires = ${expiration};`
        // document.cookie = cookies[i]

        // 강사 내용
        // '쿠키이름'='값'에서 '쿠키이름'만 가져와서 쿠키에 저장하기
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain' + domain + '; path' + path;
    }

    // 반복문 역순으로 돌리는 방법
    // 결과는 동일하지만 역순으로 돌리는 방법이 있다.
    // for (let j = cookies.length-1; i <= 0; i--) {
    //     document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain' + domain + '; path' + path;
    // }

}

window.onload = () => {
    // addEventListener
    const form = document.getElementById('form');
    form.addEventListener('submit', setCookie);
}