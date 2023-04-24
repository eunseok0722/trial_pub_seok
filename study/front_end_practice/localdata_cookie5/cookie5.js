const popup = document.querySelector('.popup');
const btnClose = document.querySelector('.btnClose');
const btnConcealWindowToday = document.querySelector('.btnConcealWindowToday');

// 페이지 최초 접속 시 팝업 창 띄우기
const popupCookie = Cookies.get('popupCookie');

// 팝업창 띄우기
function showPopup() {
    popup.classList.add('active');
}

// 팝업창 감추기
function concealPopup(number, expiration) {
    // 닫기 버튼 클릭 시 number = 0
    popup.classList.remove('active');


    if(number === 1) {
        // 오늘 하루 창닫기 버튼 클릭 시 --> 1
        if(Cookies.get('popupCookie') == undefined) {
            // popupCookie라는 이름의 쿠키를 추가하기
            Cookies.set('popupCookie', 'setCookie', { expires: expiration, path: '/'})
        }
    }
}


// popupCookie 값 유무에 따라 없으면 -> showPopup() 호출해서 팝업 창 띄우기

if(popupCookie == undefined) {
    showPopup();
}

btnClose.addEventListener('click', () => {
    concealPopup(0);
})

btnConcealWindowToday.addEventListener('click', () => {
    concealPopup(1, 1);
})

// 한 개 쿠키 삭제
const oneDelCookie = function (cname) {
    event.preventDefault();

    //할 일 처리
    cname = document.getElementById('name');
    let cval = cname.value;
    Cookies.remove(cval);
    alert(`${cval} 쿠키를 삭제하였습니다.`);
    cname.value = '';
    cname.focus();
}

const form = document.getElementById('form');
form.addEventListener('submit', oneDelCookie)
