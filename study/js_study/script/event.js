'use strict';

const button = document.querySelector('button');

function randomNumber(num) {
    return Math.floor(Math.random() * (num + 1));
}

button.addEventListener('click', () => {
    const randomColor = `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
    document.body.style.backgroundColor = randomColor;
});

const box = document.querySelector('.box');
const btnClear = document.querySelector('.btn_clear');
const result = document.querySelector('.result');

box.addEventListener('click', (event) =>{
    result.innerHTML += '<div>click</div>';
});


box.addEventListener('mousedown', (event) =>{
    result.innerHTML += '<div>mousedown</div>';
});

box.addEventListener('mouseup', (event) =>{
    result.innerHTML += '<div>mouseup</div>';
});

btnClear.addEventListener('click', (event) =>{
    result.innerHTML= '';
});

const inputBox = document.querySelector('.input');
const clearBtn = document.querySelector('.clear');
const ipresult = document.querySelector('.ipresult');

inputBox.addEventListener('keydown', () => {
    ipresult.innerHTML += '<div>keydown</div>'
});

inputBox.addEventListener('keyup', () => {
    ipresult.innerHTML += '<div>keyup</div>'
});

clearBtn.addEventListener('click', () => {
    ipresult.innerHTML = '';
    inputBox.value = '';
});

const input = document.getElementById('input');
const error = document.getElementById('error');
input.onblur = function() {
    if (!input.value.includes('@')) {
        input.classList.add('invalid');
        error.innerHTML = '이메일 형식이 올바르지 않습니다.';
    }
}

input.onfocus = function() {
    if (this.classList.contains('invalid')) {
        // 유저가 새로운 값을 입력하기 위해 경고 문구를 지움
        this.classList.remove('invalid');
        error.innerHTML = '';
    }
}
function handleSize(size) {
    console.log(`글자가 ${size} 변경되었습니다.`)
}

// 이벤트 핸들러 프로퍼티 방식
// 하나의 이벤트 핸들러만 바인딩 시킬 수 있음
const prop = document.getElementsByClassName('prop')
prop[0].onclick = function () {
    alert('이벤트 핸들러 프로퍼티 방식');
    console.log('이벤트 핸들러 프로퍼티 방식')
}

// addEventListener 메서드 방식
// 여러 이벤트 핸들러 등록할 수 있음
prop[1].addEventListener('click', function() {
    console.log('addEventListener 방식');
    alert('addEventListener 방식');
});

// removeEventListener 메서드
prop[2].addEventListener('click', function() {
    console.log('addEventListener 등록')
})
prop[2].removeEventListener('click', function() {
    console.log('addEventListener 등록')
})

const circle = document.querySelector('.circle');
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    circle.style.left = mouseX + 'px';
    circle.style.top = mouseY + 'px';
})

const flowers = document.getElementById('flowers');
const rose = document.getElementById('rose');

// li 요소를 클릭한 경우
flowers.addEventListener('click', event => {
    console.log(`${event.eventPhase}`);
    console.log(`${event.target}`);
    console.log(`${event.currentTarget}`);
}, true);

rose.addEventListener('click', event => {
    console.log(`${event.eventPhase}`);
    console.log(`${event.target}`);
    console.log(`${event.currentTarget}`);
});

flowers.addEventListener('click', event => {
    console.log(`${event.eventPhase}`); // 3버블링 단계
    console.log(`${event.target}`);
    console.log(`${event.currentTarget}`);
}); // true 안붙였으니까

const boxes = document.querySelectorAll('div');
boxes.forEach(function(div) {
    div.addEventListener('click', boxEvent, {
        capture: true // 캡처링을 동작하게 하는 옵션 생략하면 버블링으로 됨
    });
})
function boxEvent(event) {
    console.log(event.currentTarget.className);
}
document.querySelector('a').onclick = e => {
    e.preventDefault();
}

const div = document.getElementById('div');
const p = document.getElementById('p');
const a = document.getElementById('a');



div.addEventListener('click', () => {
	console.log('div 클릭');
});

p.addEventListener('click', (e) => {
 e.stopPropagation(); // 이벤트 전파 중지
 //   e.stopImmediatePropagation(); // 이벤트 전파 중지
 console.log('이벤트 전파 중지의 p 클릭');
});

p.addEventListener('click', () => {
	console.log('p 클릭');
});

a.addEventListener('click', () => {
	console.log('a 클릭');
});

const flowers1 = document.getElementById('flowers1');
const msg = document.querySelector('.msg')

// li 모든 요소에 이벤트 핸들러를 등록하는 케이스
// function activate({target}) {
//     [...flowers1.children].forEach(flowers1 => {
//         flowers1.classList.toggle('active', flowers1 === target);
//         msg.textContent = target.id;
//     });
// }
// 각 li마다 이벤트 핸들러 등록하기
// document.getElementById('rose1').onclick = activate;
// document.getElementById('freesia1').onclick = activate;
// document.getElementById('carnation1').onclick = activate;

// 이벤트 위임을 사용한 코드
// 이벤트 버블링을 이용한 사용법
function activate({target}) {
    // 타겟이 flowers1의 li 가 아닌 경우 무시
    if(!target.matches('#flowers1 > li')) return;

    [...flowers1.children].forEach(flowers1 => {
        flowers1.classList.toggle('active', flowers1 === target);
        msg.textContent = target.id;
    });
}
flowers1.onclick= activate;