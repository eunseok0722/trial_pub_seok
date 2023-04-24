'use strict';

// 변수
// let const var

// var, let 차이점
// var : 한번 선언된 변수 다시 선언 가능,
//       선언하기 전에 사용 가능(호이스팅),
//       선언 및 초기화 > 할당
//       함수스코프: 함수 안에서 선언된 변수만 지역변수로 됨
// let : 한번 선언된 변수 다시 선언 불가,
//       호이스팅 되나 선언 전에 사용 시 Temporal Dead Zone에 있어서 할당 전에 사용 시 에러 출력시킴
//       선언 > 초기화 > 할당
//       블록스코프 if, while, for, function() 등 모든 {} 안에서 선언된 것은 해당 블록 안에서만 사용 가능
// const : 선언, 초기화, 할당 동시에 발생
//       블록스코프 if, while, for, function() 등 모든 {} 안에서 선언된 것은 해당 블록 안에서만 사용 가능

// 객체 리터럴
let user = {
    name: 'Mike',
    age: 30,
}

// 생성자함수 : 객체 리터럴을 대량 생산하기 위해
// 생성자 함수는 첫글자 대문자로 하는 것이 관례
function User(name, age) {
    // 생성자 함수를 붙일 경우
    // this = {};
    this.name = name;
    this.age = age;
    this.sayName = function () {
        console.log(this.name);
    }
    // 생성자 함수를 붙일 경우
    // return this;
}

// let user1 = new User('Mike', 30);
// let user2 = new User('Jane', 18);
// let user3 = new User('David', 45);
// user3.sayName(); // David

// 생성자 함수 예제
function Item(title, price) {
    // 생성자 함수를 붙일 경우
    // this = {};

    this.title = title;
    this.price = price;
    this.showPrice = function () {
        console.log(`가격은 ${price}원 입니다.`);
    }
    // 생성자 함수를 붙일 경우
    // return this;

    // !!생성자 함수를 붙이지 않으면 this가 정의되지 않아서 생성되지 않는다.!!
}

const item1 = new Item('인형', 3000);
// 생성자함수에 new를 붙이지 않으면 그냥 함수가 실행되는 것이기 때문에 undefined가 반환됨
const item2 = new Item('가방', 4000);
const item3 = new Item('지갑', 9000);

console.log(item1, item2, item3);
item3.showPrice();

// Object - methods / Computed property
let a = 'age';
// computed property : 계산된 프로퍼티
// 'age'라는 키값에 value 30이 할당되게 됨
user[a] = 30;
const user2 = {
    name: 'Mike',
    [a]: 30, // age : 30
    [1 + 4]: 5, // key값에 식을 넣을 수도 있음
    ['안녕' + '하세요']: 'Hello',
}
console.log(user2);

// 객체 사용 methods
// Object.assign() : 객체 복제
// const cloneUser = user; -> 이렇게 할 경우 객체 저장된 메모리 주소를 참조해서 복사가 아닌 같은값을 공유하게 됨

// Object.assign(초기값, 복사할 Object, 복사할 Object2)
const newUser = Object.assign({gender: 'm'}, user);
console.log(newUser);

// Object.keys() : 키 배열 반환
console.log(Object.keys(user));

// Object.values() : 값 배열 반환
console.log(Object.values(user));

// Object.entries() : [키, 값]으로 구성된 배열 반환
console.log(Object.entries(user));

let arr = Object.entries(user);
// Object.fromEntries() : [키, 값]으로 구성된 배열을 넣으면 객체로 반환
console.log(Object.fromEntries(arr));


let n = "name";
// 컴퓨티드 프로퍼티 예제
const user3 = {
    // 변수를 넣으면 해당 변수에 맞는 값이 키값으로 들어가게 됨
    [n]: 'Mike',
    [a]: 30,
    [1 + 4]: 5,
};
console.log(user3);

// 생성자 함수
function makeObj(key, val) {
    // 여기서는 생성자 함수 new 를 붙였을 때 만들어주는 this = {} 와 return this가 포함되어 있는 문법이라서 new 안붙여도 동작함
    return {
        [key]: val
    }
}

const obj = makeObj("성별", 'male');
console.log(obj);

// 객체 메서드

// const user4 = user  이렇게 하면 안됨
const newUser2 = Object.assign({}, newUser); // 이렇게 복사해줘야됨
newUser2.name = "Tom";
console.log(newUser);
console.log(newUser2);

const key = Object.keys(newUser);
console.log(key);

const value = Object.values(newUser);
console.log(value);

const entries = Object.entries(newUser);
console.log(entries);
const fromEntries = Object.fromEntries(entries);
console.log(fromEntries);


// Symbol : 유일성 보장
// 이름이 같더라도 모두 다른 존재로 만들어 줌
const s = Symbol();
// 해당 키를 유일한 것으로 보장해 줌
const id = Symbol('id');
user[id] = 'myid';
// 심볼은 콘솔에 뜨지 않음
console.log(Object.keys(user));
// keys, values, entries도 Symbol형은 출력해 주지 않음
// for (... in.. ) 구문에서도 건너띠게 됨

// 사용방법
// : 특정 개체에 원본은 건들이지 않고 내용을 추가할 수 있음
// 다른 사람이 만든 코드에 내가 무엇을 추가할 경우 문제가 발생할 수 있기 때문에 사용

// Symbol.for() : 전역함수
// 하나의 심볼만 보장받을 수 있음
// 없으면 만들고, 있으면 가져오기 때문
// Symbol 함수는 매번 다른 Symbol 값을 생성하지만,
// Symbol.for 메소드는 하나를 생성한 뒤 키를 통해 같은 Symbol을 공유

const id1 = Symbol.for('id');
const id2 = Symbol.for('id');
// 같은 Symbol 값을 공유하기 때문에 전역 Symbol 이라고 함
console.log(id1 === id2); // true
// Symbol.for 을 사용하면 전역 심볼을 만들 수 있음
Symbol.keyFor(id1); // 심볼 키의 이름을 확인하기 위해서 사용
// 전역심볼이 아닌 Symbol은 keyFor 사용 불가
// 대신 description을 통해서 확인 가능
console.log(id.description);

// 숨겨진 Symbol key 보는 법
console.log(Object.getOwnPropertySymbols(user));
console.log(Reflect.ownKeys(user));

// 다른 개발자가 만들어 놓은 객체 user 사용하기

// 내가 작업해서 메소드를 추가하고 싶을 경우
// 잘못하면 for문 같은 곳에 걸릴 수 있기 때문에 Symbol()을 이용해서 키값을 숨기는 것을 해줘야 함
// const showName = Symbol('show name');
// user[showName] = function () {
//     console.log(`Symbol method is for print his name -> ${this.name}`);
// };
// user[showName]();

// 사용자가 접속하면 보는 메시지
for (let key in user) {
    console.log(`His ${key} is ${user[key]}`)
}

// Number, Math  함수

// 10진수 -> 2진수/ 16진수로 변환
let num = 10;
console.log(num.toString());
console.log(num.toString(2)); // 1010 2진수로 변환

let num2 = 255;
console.log(num2.toString(16)); // ff 16진수로 변환

// 수학과 관련된 프로퍼티 Math
console.log(Math.PI);


let ceil1 = 5.1
let ceil2 = 5.7

// 올림
console.log(Math.ceil(ceil1));
console.log(Math.ceil(ceil2));

//내림
console.log(Math.floor(ceil1));
console.log(Math.floor(ceil2));

// 반올림
console.log(Math.round(ceil1));
console.log(Math.round(ceil2));

// 소수점 자릿수에 따른 올림, 내림, 반올림
let userRate = 30.1234;
// 요구사항: 소수점 둘째자리까지 표현 (셋째 자리에서 반올림)
// 100을 곱해서 반올림을 해준 뒤 다시 100을 나누면 소수점 둘째자리까지 표현됨
console.log(Math.round(userRate * 100) / 100); // 30.12

// toFixed() : 소수점 자릿수까지 보여주지만 '문자열'을 반환
console.log(userRate.toFixed(2));
console.log(userRate.toFixed(0));
console.log(userRate.toFixed(6)); // 30.123400
// 소수점 자릿수가 부족할 경우 0을 추가해서 보여줌

// 문자열을 반환하기 때문에 Number()와 함께 쓰이는 경우가 많음
console.log(Number(userRate.toFixed(2)));

// isNaN()
let x = Number('x'); // NaN

// NaN의 특성
// x == NaN -> false 이런식으로 NaN으로 문자가 숫자가 아닌지 판별할 수 없음
// x === NaN -> false
// NaN == NaN -> false

// isNaN 만이 NaN인지 아닌지 판단할 수 있음
isNaN(x) // true
console.log()

// parseInt() 문자열을 숫자로 바꿔줌
// Number()와 다르게 문자가 혼용되어 있어도 숫자만 변환해줌
let margin = '10px';
console.log(parseInt(margin));
console.log(Number(margin));

let redColor = 'f3';
console.log(parseInt(redColor)); // NaN
console.log(parseInt(redColor, 16)); // 243 -> 2번째 인수에 16진수를 넣었음

// parseFloat() 부동 소수점 반환
let padding = '18.5%'
console.log(parseInt(padding)); // 18
console.log(parseFloat(padding)); // 18.5

Math.random() // 0~1사이 무작위 숫자 생성

// 1~100 사이 임의의 숫자를 뽑고 싶다면?
console.log(Math.floor(Math.random() * 100) + 1);
// Math.rondom() // 0.6789
// Math.random()* 100 // 67.89
// Math.floor(Math.random()*100) // 67
// Math.floor(Math.random()*100)+1 // 68 -> 버림을 하면 0이 나올 수 있기 때문에 1~100 사이의 값을 가지고 싶어서

console.log(Math.max(1, 4, -1, 5, 10, 9, 5.54)); // 10
console.log(Math.min(1, 4, -1, 5, 10, 9, 5.54)); // -1

console.log(Math.abs(-1)) // 절대값 반환 -> 1

// 제곱이 영어로 power
console.log(Math.pow(2, 10)); // 제곱값 -> 1024

// 제곱근 square root
console.log(Math.sqrt(16)); // 제곱근 -> 4

// String
// html 코드는 작은 따옴표로 감싸는 것이 편함
let html = '<div class="box_title">제목 영역</div>';
// 영어는 큰따옴표로 감싸는 것이 편함
let desc = "It's 3 o'clock."

// 이제는 백틱이 훨씬 유용함
// 여러줄 작성하기
let sent = `오늘은 맑고 화창한 \n날씨가 계속 되겠습니다. \n내일을 비소식이 있습니다.`
document.querySelector('.weather').innerText = sent

// length : 문자열 길이
console.log(desc.length); // 15

// 특정 위치에 접근 가능
console.log(desc[0]); // s

// toUpperCase() / toLowerCase()
console.log(desc.toUpperCase()); // IT'S 3 O'CLOCK.
console.log(desc.toLowerCase()); // it's 3 o'clock.

// str.indexOf(text) 찾는 문자열이 어디에서 시작하는지 반환해줌
console.log(desc.indexOf("o'"));
console.log(desc.indexOf("clock"));

// 해당 문자열이 있는지 찾는 방법 : indexOf에서 -1보다 큰 값이 있는지 확인
if (desc.indexOf('It') > -1) {
    console.log('It이 포함된 문자열입니다.')
}

// str.slice(n, m) n부터 m-1까지
let sent2 = 'abcdefg';
console.log(sent2.slice(0, 5));

// str.substring(n, m) n부터 m까지
// str.substr(n, m) n부터 m개를 가져옴
// str.trim() 앞 뒤 공백 제거
// str.repeat(n) n 번 반복


// 문자열 비교
1 < 3 // true
// asc 아스키 85 85진법상으로 값이 있기 때문에 문자열도 비교가 가능
'a' < 'c' // true

// 문자열 비교를 위한 문자별 비교값 얻기 .codePointAt(0);
console.log('a'.codePointAt(0)); // 97
// 문자별 비교값을 알고 있을 경우 해당 문자가 무엇인지 확인하는 법
console.log(String.fromCodePoint(97)); // 'a'


// 리스트에서 문자열만 반환하는 코드 작성해보기
let list = [
    "01. 들어가며",
    "02. JS의 역사",
    "03. 자료형",
    "04. 함수",
    "05. 배열",
]
let newList = [];


for (let i = 0; i < list.length; i++) {
    // 각각의 문자열에서 4 이후의 숫자만 반환해서 newList에 넣기
    newList.push(list[i].slice(4));
}
console.log(newList); // ['들어가며', 'JS의 역사', '자료형', '함수', '배열']

// 금칙어 : 콜라
function hasCola(str) {
    if (str.indexOf('콜라') > -1) {
        console.log(`${str}은(는) 금칙어입니다.`)
    } else {
        console.log(`정상적으로 제출되었습니다.`)
    }
}

hasCola('와 사이다가 짱이야!'); // -1
hasCola('무슨소리, 콜라가 최고'); // 6 이니까 통과
hasCola('콜라'); // 0이 나오기 때문에 if 문을 작성할 때 0이 true로 반환될 수 있도록 잘 작성해야 함


// Array

// arr.splice(n, m, x) n 부터 m개 지우기, x 추가하기
let arr2 = ['나는', '철수', '입니다.'];
// deleteCount가 0 이면 삭제 안하고 추가만 할 수 있음
let result = arr2.splice(1, 1, '대한민국', '소방관');
console.log(arr2);

// arr.splice() 삭제된 요소를 반환
console.log(result);

// arr.slice(n, m) n부터 m까지 반환
let arr3 = [1, 2, 3, 4, 5];
arr3.slice(1, 4);

// slice() 파라미터를 넣지 않으면 배열을 그대로 복사
let arr4 = arr3.slice();
arr4.pop();
console.log(arr4, arr3); // 배열 복사하기 쉬운 방법이 여기 있었네

// concat(arr2, arr3); 배열을 넣으면 합쳐서 하나의 배열로 만들어줌
let arr5 = [];
console.log(arr5.concat(arr3, arr4));

// forEach(value, index, arr) forEach 이용해서 배열 순회할 수 있음
let arr6 = ['mike', 'tom', 'jane'];

arr6.forEach((name, index) => {
    console.log(`${index + 1}. ${name}`)
})

// arr.indexOf / arr.lastIndexOf
// 문자열과 동일하게 발견하면 해당 인덱스 번호를 반환함
let arr7 = [1, 2, 3, 4, 5, 1, 2, 3];
console.log(arr7.indexOf(3)); // 2
console.log(arr7.indexOf(3, 3)); // 시작위치, 찾고자 하는 문자열 -> 7이 반환됨

// arr.includes() : 포함하는지 확인
console.log(arr7.includes(2)); // true

// arr7.find(fn) / arr7.findIndex(fn)

// find는 만족하는 요소 중 가장 첫번째 요소를 반환
const result2 = arr7.find((item) => {
    return item % 2 === 0;
});
console.log(result2); // 2

// filter는 만족하는 모든 요소를 배열로 반환
const result3 = arr7.filter((item) => {
    return item % 2 === 0;
})
console.log(result3);

// reverse() 역순으로 재정렬
console.log(arr7.reverse());

// arr.map(fn)
// 함수를 받아 특정 기능 시행 및 새로운 배열 반환
let userList = [
    {name: 'Mike', age: 30},
    {name: 'Jane', age: 27},
    {name: 'Tom', age: 10},
]

// userList를 복제, 초기값 {}, userList의 각각을 user로 해서 넣기,
// isAdult 키값 추가해서 value에 user.age가 19보다 클 경우 true, 아니면 false 입력
let newUserList = userList.map((user, index) => {
    return Object.assign({}, user, {
        id: index + 1,
        isAdult: user.age > 19
    });
})

console.log(newUserList);

// join, split
let arr8 = ['안녕', '나는', '철수야'];
// 전달이 없으면 쉼표로 연결됨
// 공백 전달 시 공백으로 연결됨
let result4 = arr8.join(' ');
console.log(result4);

// split
const users = 'Mike,Jane,Tom,Tony';
// 쉼표를 기준으로 배열로 만들어줌
const result5 = users.split(",");
console.log(result5);

// Array.isArray() 메서드 : 배열인지 확인하는 메서드
console.log(typeof user); // Object
console.log(typeof userList); //Object Array이지만 Object로 분류됨

console.log(Array.isArray(user)); // false 일반 객체이기 때문에 false
console.log(Array.isArray(userList)); // true 배열이기 때문에 true

// arr.sort() 배열 재정렬, 배열 자체가 변경되니 주의
// 들어오는 인수를 문자열로 취급해서 1이 앞에 있으니까 13이 가장 먼저, 다음 27 순으로 오게 됨
let arr9 = [13, 5, 27, 8];

// 그래서 함수를 인수로 넣어야 숫자가 정렬됨
arr9.sort((a, b) => {
    console.log(a, b);
    return a - b;
});
// 5 13 27 8  -> 비교대상 5로 앞에 문자들을 비교
// 5 13 27 8 -> 비교대상 27로 앞에 문자들과 비교
// 5 8 13 27  -> 비교대상 8로 앞에 문자들과 비교
// 위와 같이 sort()의 경우 정렬 알고리즘을 만들어줘야되는 불편함이 있다.

console.log(arr9);

// Lodash _.sortBy(arr); 숫자, 문자, 상관없이 정렬 가능
// Array, Object 관련해서 유용한 함수들을 많이 사용

// reduce() : 배열의 모든 수 합치기

let result6 = 0;
arr9.forEach((num) => {
    result6 += num;
});

console.log(result6);

// 위의 forEach문을 대체하여 아래와 같이 작성할 수 있음


// reduce((누적값, 현재값) => { 계산식 }, 초기값)
let result7 = arr9.reduce((prev, cur) => {
    return prev + cur
}, 0)
console.log(result7);

// User List에서 Age를 뽑아서 성인만 리턴하는 함수 만들기
let result8 = userList.reduce((prev, cur) => {
    if (cur.age > 19) {
        prev.push(cur.name);
    }
    return prev
}, []);
console.log(result8);

// arr.reduceRight(); 리듀스와 기능 동일, 우측부터 배열 연산 시작함


// 구조 분해 할당 구문
// 배열, 객체의 속성을 분해해서 그 값을 벼수에 담을 수 있게 해주는 표현식

// 배열 구조 분해
let [x2, y2] = [1, 2];
// let arr6 = ['mike', 'tom', 'jane'];
// let [user01, user02, user03] = arr6;
// console.log(user01, user02, user03);


// 배열 구조 분해 기본값 : 연결되는 값이 없을 경우 사전에 기본값을 설정해두어 에러를 방지
let [a1, b1, c1] = [1, 2];
console.log(a1, b1, c1); // 1 2 undefined
// 위와 같은 상황에 c 는 undefined가 되기 때문에 기본값 설정이 필요하다.
let [a2 = 3, b2 = 4, c2 = 5] = [1, 2];
console.log(a2, b2, c2); // 1, 2, 5


// 배열 구조 분해 : 일부 반환값 무시
// let arr6 = ['mike', 'tom', 'jane'];

// 필요하지 않은 배열 요소에 쉼표를 찍어서 넘기기
let [user01, , user02] = arr6;
console.log(user01, user02); // mike jane

// 배열 구조 분해 바꿔치기
// 두 값을 각각 할당된 변수를 바꾸고 싶을 때
let b = 'name';
[a, b] = [b, a];
console.log(a, b);

// 객체 구조 분해

// let user = {
//     name: 'Mike',
//     age: 30,
// }

// 순서와 상관없이 객체를 연결하면 해당 key값에 해당하는 value가 알아서 할당된다.
let {age, name} = user;
console.log(name, age);

// 새로운 변수 이름으로 할당
let {name: userName, age: userAge} = user;
console.log(userName, userAge);

// 객체 구조 분해: 기본값
let {name: userN, age: userA, gender = 'male'} = user;
console.log(userN, userA, gender);

// 나머지 매개변수와 전개구문

// ... 점 세개로 사용

// 매개변수에는 개수 제한이 없음, 다만, 함수에서 사용 개수 이외는 사용되지 않음
// function showName(name) {
//     console.log(name);
// }
// showName('Mike', 'Tom'); // Mike 만 출력됨

// 함수의 인수를 받는 방법
// 1. arguments 사용
// 함수로 넘어온 모든 인수에 접근
// 함수 내에서 이용 가능한 지역 변수
// Array형태의 객체 length/ index 사용 가능

// 2. 나머지 매개 변수 사용
// 정해지지 않은 개수의 인수를 배열로 나타낼 수 있게 해줌
// 배열로 반환해줌
function showName(...names) {
    console.log(names);
}

// showName(); // undefined가 아니라 빈배열을 반환 []
showName('Mike'); //
showName('Mike', 'Tom');


// 예제 ) 전달 받을 인수가 항상 다른 함수를 만들 때
function add(...numbers) {
    // let result = 0;
    // numbers.forEach(num => (result += num ));
    // console.log(result);

    // 또는 reduce() 메서드 사용
    let result = numbers.reduce((prev, cur) => prev + cur);
    console.log(result);
}

add(1, 2, 3);
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// user 객체를 만들어주는 생성자함수 만들기

function User2(name, age, ...skills) {
    this.name = name;
    this.age = age;
    this.skills = skills
}

const user001 = new User2('Mike', 30, 'HTML', 'CSS');
const user002 = new User2('Tom', 20, 'JS', 'React');
const user003 = new User2('Jane', 10, 'English');
console.log(user001, user002, user003);

// 전개구문 : 배열

let arr01 = [1, 2, 3];
let arr02 = [4, 5, 6];

// 배열을 풀어서 하나의 배열로 만들어 줌
let result10 = [0, ...arr01, ...arr02, 7, 8, 9];
console.log(result10);

//setTimeout(fn, 3000);

// setTimeout(showName, 3000, 'Mike')
// 인수를 추가로 보낼 경우 위와 같음

// setInterval(fn, 3000, 'Mike');

// delay 0이라고 적어도 4ms 만큼의 딜레이가 발생할 수 있음


// Closure 클로져
// 함수와 켁시컬 환경의 조합을 closure라고 함
// 함수가 생성될 당시의 외부 변수를 기억하고 생성된 후에도 계속 접근이 가능한 경우
// 자바스크립트는 어휘적 환경을 갖습니다. Lexical Environment


// 코드 실행 시 선언된 변수들이 '전역' Lexical 환경에 올라가게 됨
// one : 초기화 안되서 사용 불가
// addOne : function 선언문 바로 초기화되어서 사용 가능

let one; // 선언이 되어서 사용 가능, but undefined로 뜸
one = 1; // 값이 할당되어 one = 1 이 됨

function addOne(num) {  // 함수는 코드 실행과 함께 선언 완료
    console.log(one + num);
}

addOne(5); // 새로운 '내부' Lexical 환경이 만들어지면서 매개변수 num 5가 등록이 됨

// 또 다른 예제
// 전역 Lexical 환경 makeAdder: function, add3: undefined -> function이 됨
function makeAdder(x) {
    return function (y) { // 이 함수를 closure 함수라고 함, 이 함수는 y를 가지고 있고 상위함수인 makeAdder의 x에 접근 가능
        return x + y;
    }
}

const add3 = makeAdder(3); // makeAdder Lexical 환경, x : 3  // add3 함수가 생성된 후에도 상위함수인 makeAdder의 x에 접근 가능


// add에 3이라는 파라미터전달
console.log(add3(2));  // 익명함수 Lexical 환경 y: 2 // 5

const add10 = makeAdder(10);
console.log(add10(5)); // 15;
console.log(add3(1)); // 4

// 풀어쓰기
// add3(2) = makeAdder(3) {
//      return function(2) {
//          return 3 + 2; // 익명함수가 진행되는데 x가 지역변수 내 없으니 참조할 수 있는 외부 lexical 환경에서 x 를 찾아옴
//      }
// }
// 위와 같이 되는 상황

// 또 다른 예제
function makeCounter() {
    let num = 0; // 수정 할 수 없는 외부 변수를 은닉화 하기 위해 내부 함수 사용
    return function () { // 내부함수에서 외부함수 num에 접근하고 있음
        return num++;
    };
}

let counter = makeCounter();
// makeCounter() 가 반환하는 익명함수를 실행 하는 counter() 실행
console.log(counter());  // 0 // 한번 생성되면 내부 Lexical 환경에서 해당변수가 계속 기억됨
console.log(counter());  // 1
console.log(counter());  // 2


// call 사용할 객체를 부르는 함수
const mike = {
    name: "Mike"
}
const tom = {
    name: "Tom"
}

function showThisName() {
    console.log(this.name);
}

// showThisName(); // 함수 안에 this가 전역객체를 호출하기 때문에 참조오류가 발생한다.
showThisName.call(mike); // mike 객체 안에 this.name을 호출하기 때문에 'Mike'가 출력된다.

function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

// call은 일반적인 함수와 마찬가지로 매개변수를 직접 받음
update.call(mike, 1999, "singer");
console.log(mike);

update.call(tom, 2002, "teacher");
console.log(tom);

// apply 매개변수를 배열로 받음
update.apply(mike, [1989, "pilot"]);
console.log(mike);

update.apply(tom, [1980, "engineer"]);
console.log(tom);

const nums = [3, 10, 1, 6, 4];
const minNum = Math.min.apply(null, nums);
// = Math.min.call(null, ...nums) 첫번째 매개변수로 기존 배열 전달해야되기 때문에 없을 경우 null값 전달
const maxNum = Math.max.apply(null, nums);
// = Math.max.call(null, ...nums)

console.log(minNum);
console.log(maxNum);

// bind() : this 값을 바꾸는 방법
// update 함수의 this 값으로 mike Object를 지정해주어서 결과가 나올 수 있게 만들어 줌
const updateMike = update.bind(mike);
updateMike(2008, "police");
console.log(mike);

const userBind = {
    name: "Mike",
    showName: function () {
        console.log(`hello ${this.name}`);
    }
};

userBind.showName();

let fn = userBind.showName;
// fn에 할당할 때 this를 잃어버리게 됨
// fn(); // TypeError

// . 앞에 있는 것이 this인데 fn만 호출하니까 this를 잃어버리게 됨
fn.call(userBind);
fn.apply(userBind);

let boundFn = fn.bind(userBind);
boundFn();

// 상속, prototype
// prototype -> object 안에 __proto__ 라는 이름으로 저장되어 있는 기본 메서드들을 이야기함

// Prototype Chain : 상속, 프로토타입에 내용을 상속하여 쓸 수 있음
const car = {
    wheels: 4,
    drive() {
        console.log('drive...');
    }
};

const bmw = {
    color: 'red',
    navigation: 1,
}

const x5 = {
    color: 'white',
    name: 'x5',
}

bmw.__proto__ = car;
// car안에 있는 것을 prototype 안에서 상속받아서 쓸 수 있음
console.log(bmw.wheels); // 4

x5.__proto__ = bmw;
console.log(x5.wheels); // 4

// for in 문을 사용해서 객체 안의 프로퍼티를 순회하기
let x5p = [];
for (let p in x5) {
    x5p.push(p);
}
;
console.log(x5p); // (5) ['color', 'name', 'navigation', 'wheels', 'drive']

console.log(Object.keys(x5));  // (2) ['color', 'name']
console.log(Object.values(x5));

// for in 문에서 자신이 가지고 있는 프로퍼티만 확인하는 법
for (let pr in x5) {
    // 자신이 가지고 있는 프로퍼티만 확인시켜주는 .hasOwnProperty 메서드를 사용해서 구분할 수 있음
    if (x5.hasOwnProperty(pr)) {
        console.log('o', pr);
    } else {
        console.log('x', pr);
    }
}

// 생성자함수에 prototype 추가하는 방법


// 이 방식 말고
// const car = {
//     wheels: 4,
//     drive() {
//         console.log('drive...');
//     }
// };


const Bmw = function (color) {
    // 아래와 같이 this.color = color로 할 경우 나중에 해당 value 를 조작할 수 있게 된다.
    // this.color = color;
    // 다른 사람이 프로퍼티의 내용을 마음대로 바꾸는 것을 방지하기 위해서 closure 사용
    const c = color;
    this.getColor = function () {
        console.log(c);
    }
    // 위와 같이 closure를 사용하면 초기 세팅 값을 얻을 수만 있고 바꿀 수 없다.
};

const X5 = new Bmw('red');
const Z4 = new Bmw('blue');

// 생성자함수 prototype에 매번 이렇게 프로토타입을 추가하면 귀찮음
// X5.__proto__ = car;
// Z4.__proto__ = car;

// 아래와 같이 prototype에 넣을 내용을 추가해주면 한번만 추가해주면 모두 적용될 수 있어서 중복을 최소화함
Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function () {
    console.log('drive...');
}
Bmw.prototype.navigation = 1;
Bmw.prototype.stop = function () {
    console.log('STOP!');
}


// 생성자 함수로 새로운 객체를 생성하면 그것은 '인스턴스'라고 부름
console.log(Z4 instanceof Bmw); // 해당 인스턴스가 어떤 생성자함수를 통해서 만들어졌는지 확인하는 것
console.log(Z4.constructor === Bmw); // 인스턴스안에는 constructor 생성자라는 어느 생성자함수로부터 만들어졌는지 확인할 수 있는 메서드가 심어져있음


// 위의 내용을 아래와 같이 작성해도 되지만 그럴경우 constructor가 사라짐
// Bmw.prototype = {
//     wheels = 4;
//     drive = function () {
//         console.log('drive...');
//     }
//     navigation = 1;
//     stop = function () {
//         console.log('STOP!');
//     },
//     constructor: Bmw,
// }
// 이런 현상을 막기 위해서 위의 내용과 같이 하나씩 프로퍼티를 추가하는 것이 좋다.
// 또는 constructor: Bmw 와 같이 constructor를 명시해 주는 것이 좋다.

// Class
const User01 = function (name, age) {
    this.name = name;
    this.age = age;
    // this.showName = function () {
    //     console.log(this.name);
    // }
    // 생성자 함수에서 클래스와 동일하게 동작할 수 있도록 만들기
}
// 생성자 함수에서 클래스와 동일하게 동작할 수 있게 바꾸기
User01.prototype.showName = function () {
    console.log(this.name);
}

// const mike1 = new User01("Mike", 30); // 객체 내부에 showName()이 존재
const mike1 = new User01("Mike", 30); // 만약 생성자를 누락하는 실수를 했을 경우 원래는 알아차릴 수 없다고 함. 근데 지금보니 typeError 뜸
mike1.showName();

let mike1p = [];
for (const p in mike1) {
    mike1p += p + ' ';
}
console.log(mike1p); // name age showName 메서드까지 모두 보여줌

class User02 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    showName() {
        console.log(this.name);
    }
}

const tom1 = new User02("Tom", 19);  // __proto__ 내부에 showName이 존재
// new 생성자를 추가하지 않으면 추가해야된다고 TypeError를 띄워서 알려줌

let tom1p = [];
for (const p in tom1) {
    tom1p += `${p} `;
}
console.log(tom1p); // name age -> 클래스로 생성하면 메서드를 제외한 프로퍼티만 보여주는 것을 알 수 있음

// 상속에서도 차이를 보임

// class 는 extends로 상속시킴

class Car {
    constructor(color) { // constructor는 빈 객체 {}를 만들고 그 안에 프로퍼티를 넣어서 this.를 받게 됨
        this.color = color;
        this.wheels = 4;
    }

    drive() {
        consoe.log("drive...");
    }

    stop() {
        console.log("STOP!");
    }
}

class Bmw1 extends Car {
    constructor(color) { // 자식 생성자 contructor의 경우 빈 객체 {} 를 만들고 거기에 this 를 바인드 하는 것을 건너띄게 되서
        // 반드시 super()로 부모요소의 constructor를 첨부해야한다;
        super(color); // 상위요소에서 받은 매개변수를 연결해주어야 제대로 동작하게 됨
        this.navigation = 1;
    }

    park() {
        console.log('PARK')
    }

    //메소드 오버라이딩 (method overriding)
    stop() {
        // 부모의 메서드와 동일한 이름의 메서드가 있을 경우 overriding 덮어쓰게 됨
        super.stop(); // 부모의 상속받은 메소드를 사용하고 싶을 경우
        console.log('OFF');
    }
}

const z4 = new Bmw1('blue');

console.log(z4); // Bmw1 {color: 'blue', wheels: 4, navigation: 1}

// Promise

// 기본 사용 방법
// const pr = new Promise((resolve, reject) => {
//     // code
//     setTimeout(() => {
//         // resolve('OK'); // 결과가 처리되었을 경우
//         reject(new Error('err...')); // 결과가 에러일 경우
//     }, 3000); // 3초간 대기하고 ok를 출력하는 setTimeout
// });

// pr.then(
//     function(result) {
//         console.log(result + ' 가지러가자.')
//     },
//     function(err) {
//         console.log('다시 주문해 주세요.')
//     }
// )
// 위 코드를 아래와 같이 쓸 수 있음

// console.log('시작');
// pr.then( // 실행 결과에 대한 동작
//     result => {
//         console.log(result);
//     }
// ).catch( // 에러 발생 시 동작
//     err => {
//         console.log(err);
//     }
// ).finally( // 이행이든 거부든 실행되고 나오는 기본값
//     () => {
//         console.log('작업끝')
//     }
// )

// promise를 사용하지 않고 callback 함수를 쓸 경우
// f1 -> f2 -> f3 순으로 처리를 진행할 때

// const f1 = (callback) => {
//     setTimeout(function() {
//         console.log("1번 주문 완료");
//         callback();
//     }, 3000);
// }
//
// const f2 = (callback) => {
//     setTimeout(function() {
//         console.log("2번 주문 완료");
//         callback();
//     }, 3000);
// }
// const f3 = (callback) => {
//     setTimeout(function() {
//         console.log("3번 주문 완료");
//         callback();
//     }, 3000);
// }
//
// console.log('f 주문 시작');
// f1(function () {
//     f2(function () {
//         f3( function () {
//             console.log('f 주문 끝')
//         })
//     })
// })

// console.log('f 주문 시작');
// f1(function () {
//     f2(function () {
//         f3( function () {
//             console.log('f 주문 끝')
//         })
//     })
// })

// 시간이 지나고 callback 함수를 부르게 됨 callback hell이 저것처럼 있는 것
// promise 사용 시

// const f1 = () => {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res("1번 주문 완료");
//         }, 1000);
//     });
// }
// const f2 = (message) => {
//     console.log(message);
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res("2번 주문 완료");
//             // rej("2번 제고 없음");
//         }, 3000);
//     })
// }
// const f3 = (message) => {
//     console.log(message);
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res("3번 주문 완료");
//         }, 2000);
//     });
// }


// 프로미스 체이닝
// console.log('f promise 시작')
// console.time('x');
// console.time('y');
// f1()
//     .then((res) => f2(res))
//     .then((res) => f3(res))
//     .then((res) => console.log(res))
//     .catch(console.log)
//     .finally(() => {
//         console.log('f promise 끝');
//         console.timeEnd('y'); // 6초가 소요
//     });

// Promise All 모두 한번에 달려가서 업무처리를 진행하는 것
// 결과가 하나라도 안나올 경우 다 보여주거나 아예 안보여줄 때 사용
// Promise.all([f1(), f2(), f3()]) // 한번에 병렬로 업무처리가 됨
//     .then(res => {
//         console.log(res)
//     })
//     .finally(() => {
//         console.timeEnd('x') // 3초가 소요
//     });

// Promise.race
// 가장 먼저 처리가 완료된 파일 하나의 결과만 출력
// 용량이 다른 여러 이미지 중 어느것 하나라도 먼저 로딩 될 경우 다른 처리를 취소할 때 사용
// Promise.race([f1(), f2(), f3()])
//     .then(res => {
//         console.log(res)
//     })
//     .finally(() => {
//         console.timeEnd('x') // 3초가 소요
//     });


// async await
// promise에 then 형식을 붙이는 것보다 가독성이 좋아짐

// async 는 Promise 를 반환
// async function whoseName() {
//     // return 'Mike';
//     return Promise.resolve('Tom'); // 프로미스를 반환하면 프로미스 상태를 반환함
//     // throw new Error('err...');
// }

// whoseName().then((name) => { // 일반적인 promise 반환 시
// whoseName().catch((name) => { // 에러 반환시
//     console.log(name);
// });

// await
// function getName(name) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(name);
//         }, 1000);
//     })
// }
// async function showName() {
//     // await 키워드는 async 함수 내부에서만 사용 가능
//     const result = await getName('Mike'); // await 오른쪽에는 promise가 옴
//     console.log(result + ` await 끝`);
// }
// console.log('await 시작');
// showName();

// async await로 바꾸기


const f1 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("1번 주문 완료");
        }, 1000);
    });
}
const f2 = (message) => {
    console.log(message);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("2번 주문 완료");
            // rej("주문 불가");
            // rej("2번 제고 없음");
        }, 3000);
    })
}
const f3 = (message) => {
    console.log(message);
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("3번 주문 완료");
        }, 2000);
    });
}

// console.log('시작')
// async function order() {
//     try {
//         // const result = await Promise.all([f1(), f2(), f3()]); // Promise all 을 사용하는 경우
//         // console.log(result);
//
//         const result1 = await f1();
//         const result2 = await f2(result1);
//         const result3 = await f3(result2);
//         console.log(result3);
//     } catch(e) {
//         console.log(e); // 예외상황 처리 내용
//     }
//     console.log('종료');
// }
// order();

// Generator : 함수의 실행을 중간에 멈췄다가 재개할 수 있는 기능

// iterable 반복 가능한
// - Symbol.iterator 메서드가 있다.
// - Symbol.iterator 는 iterator를 반환

// iterator
// - next 메서드를 가진다.
// - next 메서드는 value와 done 속성을 가진 객체를 반환한다.
// - 작업이 끝나면 done은 true가 된다.

function* gen() { // function* 으로 생성
    try {
        console.log(1);
        yield 1;  // yield에서 함수 실행을 멈출 수 있음
        console.log(2);
        yield 2;
        console.log(3);
        console.log(4);
        yield 3;
        return "finish"
    } catch(e) {
        console.log(e);
    }
}

const res = gen(); // Generator 함수 실행하면 generator 객체 반환

res[Symbol.iterator]() === res; // true // generator에 Symbol.iterator 메소드 실행 결과가 자기자신과 같다.

for(let num of res) {  // generator에 반복문을 걸어주면 done= true 가 될때까지 반복함
    console.log(num); // 1 1 2 2 3 4 3
}



// res.next(); // 콘솔에 찍으면 첫 yield문이 나올때까지 진행
// res.next(); // 2
// res.next(); // 3, 4
// res.next(); // finish, done= true
// res.return('END'); // value: 'END', done: true // return 메서드 실행 시 바로 done = true 가 됨
// res.throw() // return과 마찬가지로 done = true 로 바꿈

const arrGen = [1, 2, 3, 4, 5];

const it = arr[Symbol.iterator](); // 배열은 Symbol.iterator 메서드를 가지고 있으므로 iterable (반복가능한)합니다.
it.next() // Array(2) done: false // Generator와 동일하게 작동하는 것을 확인 가능

const strc = 'hello';
const xx = strc[Symbol.iterator]()
xx.next(); // h -> 이처럼 일반 문장도 반복문으로 순회할 수 있음

// next()에 인수 전달하기

function* nxt() {
    const num1 = yield "첫번쨰 숫자를 입력해주세요.";
    console.log(num1);

    const num2 = yield "두번째 숫자를 입력해주세요."
    console.log(num2);

    return num1 + num2;
}
const resu = nxt();
resu.next(2); // 2
resu.next(4); // 6
// 이처럼 값을 미리 만들어 두지 않고 필요할때만 연산하기 떄문에 성능면에서도 좋음

function* gen1() {
    yield 'W';
    yield 'o';
    yield 'r';
    yield 'l';
    yield 'd';
}

function* gen2() {
    yield "Hello,";
    yield* gen1(); // 반복 가능한 모든 객체가 들어올 수 있음
    yield "!"
}
console.log(...gen2()); // spread 연산자 사용해서 배열을 하나의 문자열로 만들기

