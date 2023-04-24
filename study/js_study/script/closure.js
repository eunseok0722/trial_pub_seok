'use strict';


// closure 내부 함수가 외부 함수에 접근할 수 있는 함수
// 어휘적 환경 lexical environment
// 변수가 어디에서 사용 가능한지 알기 위해 변수가 소스코드 내 어디에서 선언되었는지 고려하는 것을 의미
// 중첩된 함수는 외부 함수 범위 scope 에서 선언한 변수에 내부 함수가 접근할 수 있다.

// 클로저와 함수의 내부 슬롯 [[Environment]]
// 자바스크립트 엔진은 함수 호출 위치가 아니라 함수 정의 위치에 따라 상위 스코프 결정

const a = 10;

function fna() {
    const a = 5;

    fnA();
    // 함수의 호출 위치와 상위 스코프는 관계가 없다.
}

function fnA() {
    console.log(a);
    // fnA의 사우이 스코프는 전역 렉시컬 환경을 내부슬롯에 저장한다.
}

fna(); // 10
fnA(); // 10

function fnb() {
    const a = 5;

    function fnB() {
        console.log(a);
    }

    fnB();
}

fnb(); // 5

// 클로저와 어휘적 환경 lexical environment
function outerFn() {
    // outerFn 함수는 중첩함수 innerFn() 을 반환하고 실행 컨텍스트가 제거되면서 컨텍스트에서 가리키고 있던 어휘적 환경에 대한 참조가 사라져야함
    // 지금은 inner 변수가 반환되는 innerFn()을 가리키게 되면서 어휘적 환경에 대한 참조가 사라나게 되고 이로인해 innerFn() 및 innerFN()안에 참조하고 있는 외부함수 x값도 사용가능하게 됨
    const x = 'Hello';
    const innerFn = function () {
        console.log(x);
    }

    // 클로저
    return innerFn();
}

const inner = outerFn();

// 중첩 함수가 외부  함수보다 더 오래 유지되는 될 때  외부 함수의 변수를 참조하고 있는 함수를 클로저라고 한다.

let number = 1;

function increaseNumber() {
    return number++;
}

console.log(increaseNumber()); // 1
console.log(increaseNumber()); // 2
console.log(increaseNumber()); // 3

number = 10;
console.log(increaseNumber()); // 10
// 전역변수 number가 어디서든 접근 가능해 재할당 시 값이 면하게 되어 문제가 발생한다.

function increaseNumber2() {
    let number = 1;
    return number++
}

// 지역변수로 호출시마다 재선언되기 때문에 값이 늘어날 수 없고 계속해서 같은 값이 출력된다.
console.log(increaseNumber2()); // 1
console.log(increaseNumber2()); // 1
console.log(increaseNumber2()); // 1


function increaseNumber3() {
    let number = 1;

    return function saveVal() {
        return number++;
    }
}

const result = increaseNumber3(); // 함수를 반환
// 함수를 반환하는데 연속 호출을 위해서 변수 result에 저장하기
// 내부 함수가 외부 함수에 변수 접근을 하여 호출마다 증가한 값을 반환
// 이처럼 클로저를 사용하면 특정 상태를 기억하고 은닉할 수 있고 특정 함수에서만 상태를 변경할 수 있음
console.log(result()); // 1
console.log(result()); // 2
console.log(result()); // 3


// 클로저의 작동 방식

// 클로저 사용 방법

// 클로저를 통한 Javascript의 private
// private variable 만들기
function makeCounterMethod() {
    let privateCounter = 0;

    // 클로저
    return function () {
        privateCounter += 1;
        console.log(privateCounter);
    }
}

// 실행된 makeCounterMethod가 종료되면 이 함수의 스코프가 끝나면서 더 이상 외부에서 내부 privateCounter에 접근할 수 없다.
// 그러면서 private한 변수가 된다.
const plusCounter = makeCounterMethod();
// console.log(privateCounter); // 정의되지 않았다고 에러 발생, 외부에서 접근할 수 없음

// 종료 전에 private변수를 핸들링할 수 있는 plusCounter라는 public 함수를 반환해주는데 이 함수를 통해 접근 불가능한 private 변수에 접근 가능
plusCounter(); // 1
plusCounter(); // 2
plusCounter(); // 3
// 여기서 plusCounter() 는 private 변수를 핸들링할 수 있는 공개함수인 previleged method (특권의) 함수이다
// 이러한 방식으로 클로저를 사용하는 것을 모듈 패턴이라고 함

// private variable 를 여러가지 함수로 조작하기

function makeCounterMethod2() {
    let privateCounter2 = 0;

    // 클로저 묶음 객체
    return {
        plusCounter: function () {
            privateCounter2 += 1;
            console.log(privateCounter2);
        },
        minusCounter: function () {
            privateCounter2 -= 1;
            console.log(privateCounter2);
        },
        getter: function () {
            return privateCounter2;
        },
        setter: function (val) {
            privateCounter2 = val;
        }
    }
}

const counterMethod = makeCounterMethod2();
// makeCounterMethod()는 이미 종료된 상태
// console.log(privateCounter);

counterMethod.plusCounter();
counterMethod.plusCounter();
counterMethod.minusCounter();
console.log(counterMethod.getter());
counterMethod.setter(10);
console.log(counterMethod.getter());

// 커링 기법에서의 클로저
// 키링 기법: 여러 인수를 취하는 함수를 각각 단일 인수를 취하는 일련의 함수로 변환하는 기술
// function GuGuDan(a, b) {
//     console.log(a * b);
// }

function GuGuDan(a) {
    return function (b) {
        console.log(a * b);
    };
}

// a의 인자 값이 고정된 함수 생성
const GuGu2 = GuGuDan(2); // private 변수의 값으로 2를 넘겨준다.

// GuGuDan 함수는 종료되었지만 매개 변수 a에는 접근 가능하다. (클로저)
console.log('GuGuDan')
GuGu2(1) // 2
GuGu2(2) // 4
GuGu2(3) // 6
GuGu2(4) // 8
GuGu2(5) // 10
GuGu2(6) // 12
GuGu2(7) // 14
GuGu2(8) // 16
GuGu2(9) // 18

const buttons = document.querySelectorAll('button');

function printGuGuDan(number) {
    for (var j = 1; j < 10; j++) {
        console.log(number * j)
    }
}

//클로저 추가하기
function addClosure(input) {
    return function () {
        printGuGuDan(input);
    };
}

function makeGuGuDan() {
    // makeGuGuDanBtn() 의 private 변수 i
    for (var i = 2; i < 10; i++) {
        // private 변수 i를 사용하는 익명함수 function() {}
        // 익명 함수를 가리키는 프로퍼티 onclick
        buttons[i - 2].onclick = addClosure(i)
    }
}

makeGuGuDan();

// 익명 클로저 사용하기
function makeGuGuDan2() {
    for (var i = 2; i < 10; i++) {
        // 익명 클로저 추가
        (
            function (input) {
                buttons[input - 2].onclick = function () {
                    printGuGuDan(input)
                }
            }
        )(i);
        // 반복문 안에서 기존의 코드를 즉시 실행 함수로 감싸서 즉시 실행함수가 실행할 떄 마다 새로운 컨텍스트를 만들도록 하는 방법
        // for문에 의해 변하는 각각의 i에 해당하는 값을 input이 가지게 되며 별개로 관리하게 됨
    }
}

makeGuGuDan2();

// let 스코프 이용하기
// let은 블록 레벨 스코프를 따르기 때문에 for문을 돌면서 블록을 만날때마다 새로운 실행 컨텍스트를 생성하게 됨

function makeGuGuDan3(number) {
    // let 키워드 사용
    for (let i = 2; i < 10; i++) {
        buttons[i-2].onclick = function () { printGuGuDan(i) }
    }
}
makeGuGuDan3();