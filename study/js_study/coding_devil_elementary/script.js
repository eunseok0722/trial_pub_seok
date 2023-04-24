// 자료형



// 입력을 할 수 있는 prompt
// prompt(메시지, 입력기본값);
// const name = prompt("이름을 입력해 주세요.", "홍길동");
// alert(`환영합니다. ${name} 님`);

// confirm()
// 확인, 취소 버튼을 주어서 true, false를 반환해줌
// const isAdult = confirm('당신은 성인입니까?');
// console.log(isAdult);

// 단점
// 1. 스크립트 일시정지됨
// 2. 스타일링 불가, 브라우저마다 다르게 보임

// 장점
// 빠르게 사용자와 상호작용할 수 있음

// 형변환
// String() 문자형으로 변환
// Number() 숫자형으로 변환
// Boolean() 함수형으로 변환

// 자료형이 다르면 의도치 않은 결과값을 받게 됨
// const mathScore = prompt('수학 몇점?');
// const engScore = prompt('영어 몇점?');
// const result = (mathScore + engScore) / 2;
// console.log(result); // 결과값 4540
// 문자 90 + 80 = 9080 / 2 = 4540
// 나누기는 자동형변환이 되서 나눠지지만 +는 형변환을 해야 계산을 해줌
// 명시적 형변환을 해줘야 원하지 않는 에러를 발생시키지 않을 수 있음

// 모두 논리적인 의미가 없는 문자열로 변환해 줌
console.log(
    String(3),
    String(true),
    String(undefined),
    String(null)
)

// true, false를 Number로 형변환 했을 때 True는 1, False는 0이 된다.
console.log(
    Number('23'),
    Number(true), // 1
    Number(false), // 0
    // 주의사항 prompt에서 입력을 하지 않으면 Null 반환되는데 그럼 0이 입력됨
    Number(null),  // 0
    Number(undefined) // NaN
)

// 다른 자료형을 true, false로 변환해줌, 아래 내용을 제외하고는 모두 true
console.log(
    Boolean(0), // false
    Boolean(''), // false
    Boolean(null), // false
    Boolean(undefined), // false
    Boolean(NaN), // false
    // 주의사항
    // 숫자 0만 false, 문자열은 무조건 true
    Boolean(0), // false
    Boolean('0'), // true
    // 공백 들어가 있으면 true
    Boolean(''), // false
    Boolean(' '), //true
)

// 기본 연산자
// % 연산자 사용 예제
// 홀수 : X % 2 = 1
// 짝수 : Y % 2 = 0

// 5를 넘는 숫자가 들어오지 않아야 하는 곳에 아래와 같이 작성하여 0~4 반환 받음
// X % 5 = 0 ~ 4 사이의 값만 반환

// 거듭제곱
const num = 2**3;
console.log(num); // 8

// 연산자 우선순위
// * /
// + -

// 줄여서 쓰기
let num2 = 10;
// num = num + 5
num2 += 5;
// += -= *= /= 를 쓸 수 있음

// 증감연산자
// ++ --
let result = num2++;
console.log(result);

// 비교연산자
// == >= <= > < !=
// ture false만 반환
console.log(10>5);
console.log(10==5); // 동등연산자
console.log(10!=5);

const a = 1;
const b = "1";
console.log( a == b); // ture 동등 연산자
console.log( a === b); // false 일치연산자 타입까지 비교

// 조건문
const age = '19'
if (age > 19) {
    console.log('환영합니다.');
} else if (age == 19 ) {
    console.log('수능 잘 치세요.')
}else {
    console.log('19세 이상만 입장 가능합니다.')
}
// if 문이 false일때 else문이 실행됨

// 논리 연산자
// || && !
// || 여러개 중 1개만 true 면 true
// && 모든 값이 true 면 true
// ! 값을 반대로 바꿔줌

// or는 첫번째 true 발견 즉시 평가 멈춤
// and 첫번쨰 false 발견 시 즉시 평가 멈춤

// 성능 최적화 방법
// 운전면허(80%)가 있고 시력이 좋은(60%) 여군(7%) 라면 성능 최적화를 위해 여군, 시력이 좋은, 운전면허 순으로 조건문을 다는 것이 성능을 위해 좋다.

// OR
// 이름이 Tom 이거나 성인이면 통과
const name3 = "Mike";
const age3 = 30;

if (name === 'Mike' && age > 19) {
    console.log('통과')
}else {
    console.log('마이크 탈락.')
}

// NOT
// const age4 = prompt('나이가?')
// const isAge = age > 19;
//
// if (!isAge) {
//     console.log('미성년자 돌아가세요.')
// }

// && 가 || 보다 우선순위가 높음
const gender = "f";
const name4 = 'Jane';
const isAdult = true;
// 아래와 같은 경우 AND 연산자가 우선순위가 높기 때문에 통과가 됨
// if (gender === "m" && name === 'mike' || isAdult ) {
// 위의 내용을 의도대로 하려면 아래와 같이 괄호를 쳐야 함
if (gender === "m" && (name === 'mike' || isAdult) ) {
    console.log('통과');
}else {
    console.log('제인 탈락');
}

//  for 반복문
// for (let i = 0; i < 10; i++) {
//     console.log(i+1);
// }

// while 반복문
// let i = 0;
// while(i < 10) {
//     // 코드
//     console.log(i);
//     // while에 들어가는 값이 계속 동일할 경우 브라우저 에러가 발생하므로 주의
//     i++;
// }

// do while 문
// let j = 0;
// do {
//     // 조건 없이 무조건 한번 실행
//     j++
// }while (j < 10) {
//
// }

// while true의 경우 계속해서 반복되기 때문에 주의해서 써야 함

// break문을 만나게 되면 빠져나오게 됨
// continue 조건문 실행을 멈추고 다음 조건문으로 넘어가게 됨

// while(true) {
//     let answer = confirm('계속할까요?');
//     if(!answer) {
//         break;
//         // 멈추고 빠져나옴
//     }
// }

// continue 짝수만
// for (let k = 1; k < 10 ; k++) {
//     // 2로 나눴을 때 나머지가 1이면 통과
//     // 1이 true이기 때문에 continue를 만나서 다음 코드를 진행하지 않고 반복문이 다음으로 넘어감
//     if (k%2) {
//         continue;
//         // 1, 3, 5 ... 일 경우 continue 만나서 console.log() 찍지 않고 다음 반복문으로 넘어가게 됨
//     }
//     console.log(k); // 2, 4, 6, 8
// }

// 명확한 횟수가 정해져 있으면 for문 사용
// 명확한 횟수가 정해져 있지 않으면 while 문 사용

// switch
// if else 문을 알 경우 if else를 쓰는 경우가 많음

// 사과 : 100원
// 바나나 : 200원
// 키위 : 300원
// 멜론 : 500원
// 수박 : 500원
// 사고 싶은 과일을 물어보고 가격 알려주기

// let fruit = prompt('무슨 과일을 사고 싶나요?')
// switch(fruit) {
//     case '사과' :
//         console.log('100원 입니다. ');
//         break; // break가 없을 경우 이 다음에 모든 코드를 실행함, 의도한 바가 있지 않을 경우 반드시 break문 넣기
//     case '사과' :
//         console.log('100원 입니다. ');
//         break;
//     case '바나나' :
//         console.log('200원 입니다. ');
//         break;
//     case '키위' :
//         console.log('300원 입니다. ');
//         break;
//     case '멜론' : // 같은 값을 출력할 경우 안에 내용을 생략할 경우 동일한 결과 값을 출력해 줌
//     case '수박' :
//         console.log('500원 입니다. ');
//         break;
//     default : // 기본값을 옆과 같이 default문을 사용하면 케이스 이외의 상황에 대한 리턴값을 줄 수 있음
//         console.log('그 과일은 취급하지 않습니다.');
// }

// 함수
// 매개변수 없는 함수
function showError() {
    alert('에러가 발생했습니다 다시 시도해주세요.')
}

// 함수 사용하는 이유
// 여러 곳에서 사용하기 쉽다.
// 수정 및 유지보수에 용이하다.
// 100군데에서 사용해도 한줄만 작성해주면 되니까.
// showError();

// 매개변수가 있는 함수
// 아래와 같이 하는 것은 함수 선언문
// 함수 선언문은 어디서든 호출 가능, 함수가 선언되기 전에 호출해도 동작
sayHello(); // 매개변수가 있는 함수에 없는 채로 호출을 할 경우
// // 호이스팅 : 선언된 함수 모임이 별도의 위치에 존재하기 때문에 선언의 순서와 상관없이 호출이 가능
function sayHello(name) {
    console.log(name)
    let msg = `Hello`;
    if(name) { // 매개변수가 없을 경우 undefined가 전달됨, undefined === false 이기 때문에 if문 통과 못함
        const msg = `Hello, ${name}`;
    }
    console.log(msg); // msg에 `Hello`만 남아서 Hello 출력
}


// 함수 표현식, 화살표 함수

// 함수 선언문 vs  함수 표현식

// 함수 표현식
// 매개변수가 없는 함수를 변수에 할당해주는 기법
let sayHello2 = function() {
    console.log('Hello')
}
// 함수선언문과 무슨 차이가 있는걸까? -> 호출할 수 있는 타이밍

// sayHello2() // 함수 표현식은 아래와 같이 했을 경우 동작하지 않음

// let sayHello2 = function() {
//     console.log('Hello')
// }
// 코드에 도달하면 생성되기 떄문에 그 이후에만 사용이 가능

// 이런 타이밍을 생각하고 싶지 않으면 함수선언문을 사용하는 것이 좋음

//화살표 함수
let add = (num1, num2) => num1 + num2; // return문이 쓰이고, 1줄일 경우 이렇게 줄여서 쓸 수 있음
// let add = (num1, num2) => (num1 + num2); // 같은 의미임
// let add = (num1, num2) => { return num1 + num2 }; // 같은 의미임

// 객체 Object
const superman = {
    name: 'clark',
    age: 33,
}
// 접근 방법
console.log(superman.name); // . 사용 접근
console.log(superman['age']); // [] 사용 접근

// 추가
superman.gender = 'male';
superman['hairColor'] = 'black';

// 삭제
delete superman.hairColor;
console.log(superman);

// 단축 프로퍼티
const batman = {
    name,  // name: name
    age, // age: age
    gender : 'male'
};

// 프로퍼티 존재여부 확인
console.log(batman.birthDay); // undefined
// in연산자 해당 오브젝트 안에 검색한 프로퍼티가 있는지 확인
console.log('birthDay' in batman); // false
console.log('age' in batman); // true
// 어떤 값이 넘어올지 모를 떄 쓰는 것

// for ...in 반복문
const antman = {
    name : 'clark',
    age: 30,
}

antman.hairColor = 'black';
delete antman.hairColor;
console.log(antman);
// console.log(antman.name);
// console.log(antman['age']);

// 객체 만들기
function makeObject(name, age) {
    // 객체를 반환하기
    return {
        // name: name, 축약하기
        name,
        // age: age, 축약하기
        age,
        hobby: 'football'
    }
}

const Mike = makeObject('Mike', 30);
const Jane = {
    age: 18,
}

console.log(Mike);
console.log("age" in Mike); // true

// 객체 in
function isAdult2 (user) {
    // 성인일 때 true 반환
    // user에 'age'가 없거나 20살 미만이면 false
    if(!('age' in user) || user.age < 20) {
        return false;
    } else {
        return true;
    }
}
console.log(isAdult2(Jane));

// 객체 for ... in
for (x in Mike) {
    // x는 객체가 가지고 있는 키값들, 'age', 'name', 'hobby'
    console.log(x);
    // Mike의 x키들의 value 확인하기
    console.log(Mike[x]);
}

// Object에 객체 프로퍼티로 할당된 함수

const ironman = {
    name: 'tonny',
    age: 50,
    // 메서드 :  아래와 같이 객체 프로퍼티로 할당 된 함수
    // fly: function () {
    //     console.log('아이언맨이 날아갑니다.')
    // }
    // 위 내용 축약형
    fly() {
        console.log('아이언맨이 날고있습니다.')
    }
}
ironman.fly(); // 아이언맨이 날아갑니다.

// 객체 내부 프로퍼티 참조하는 방법
const user = {
    name: 'Mike',
    sayHello: function() {
        // this. 로 현재 객체를 참조할 수 있음
        console.log(`Hello, I'm ${this.name}`);
    }
}
user.sayHello();

// 메서드를 외부에서 설정하고 각 오브젝트에 할당하면 각 오브젝트에 해당하는 값이 출력됨

let sayHello3 = function () {
    console.log(`Hi, I'm ${this.name}`);
}

let boy = {
    name: 'Mike',
    sayHello3: () => {
        console.log(`Hi, I'm ${this.name}`);
    },
    // showName: function() {
    //     console.log(boy.name); // 객체명을 앞에 쓸 경우 객체명이 변경되면 타입 에러가 발생함
    // },
    showName: function() {
        console.log(this.name); // 위와 같이 범용성이 큰 this를 사용해 주는 것이 좋다.
    },
    sayThis : function() {
        console.log(this);
    },
    sayThat : () => {
        console.log(this);
    }

}
let girl = {
    name: 'Jane',
    sayHello3,
}

// 화살표 함수는 this를 가지고 있지 않기 때문에 결과가 나오지 않음
// 화살표함수 this -> 전역객체
// 브라우저 환경에서는 window, Node js에서는 global이 전역객체임
boy.sayHello3();  // Hi, I'm
girl.sayHello3(); // Hi, I'm Jane

// 화살표 함수는 일반 함수와 달리 자신만의 this를 가지지 않는다.
// 화살표 함수 내부에서 this 사용하면 그 this는 외부에서 값을 가져온다.
boy.showName();

// man에 boy 복사
let man = boy;
// man에 name에 이름을 바꾸면 boy에도 바뀜
man.name = 'Tom'
console.log(boy.name);
boy = null; // boy를 null로 바꾸면 showName이 동작하지 않게 됨
man.showName(); // 메서드 지정시에는 객체명으로 지정하는 것이 아니라 this로 지정하는 것이 좋다.
man.sayThis(); // 객체 Object를 가리키게 됨
man.sayThat(); // 윈도우 전역객체를 가리키게 되기 때문에 객체 메서드를 작성할때는 화살표 함수를 쓰지 않는 것이 좋다.

// 배열 Array

// 특징
// 1. 문자, 숫자, 객체, 함수 등 포함 가능
let arr = [
    3,
    'String',
    { object: 'object' },
    function() {
    console.log('array');
    }
]
// 2. 배열의 길이 개수 반환
console.log(arr.length);

// 3. push() 배열 끝에 내용 추가
let days = ['월', '화', '수'];
days.push('목');
console.log(days);

// 4. pop() 배열 요소 끝을 삭제
days.pop();
console.log(days);

// 5. shift, unshift 배열 앞에 제거/추가
days.unshift('금', '토', '일');
console.log(days);

days.shift();
console.log(days);

// 반복문 for

for (let i = 0; i < days.length; i++) {
    console.log(days[i]);
}

// for...of
for(let day of days) {
    console.log(day);
}
