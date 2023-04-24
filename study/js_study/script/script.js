// 요소 값의 호출, 변경, 타입 확인

// 호출
const cafe = ['coffee', 'cake', 'tea', 'cookie'];

// n번째 값이 무엇인지 확인할 수 있음
console.log(cafe[0]);
// 테이블 형태로 배열의 인덱스 번호와 값을 확인할 수 있음

// 값의 변경
cafe[2] = 'dessert';

// 값의 타입 확인
typeof cafe
// 함수에서 type이 필요할 경우 사용


// 프로퍼티 length
// 프로퍼티란? 단순한 속성값을 출력하는 기능 단위
// 메소드란? 배열에 속한 기능 단위
// console.dir(변수명)으로 배열의 프로퍼티와 메서드 출력할 수 있음
cafe.length
// 배열의 최대값을 확인하는 용도로 많이 사용
console.log(cafe.length);
// console.dir()은 json 트리형태로 결과값을 출력해줌
// console.log()는 html 구조 트리형태로 결과값 출력

// 희소 배열
const rare = [1, , , , , , , , , 10];
console.log(rare);
// 빈자리가 있는 배열을 희소배열이라고 함

// unshift() 맨 앞에서 요소 추가
const cafe2 = cafe.unshift('sandwich');

// shift() 맨 앞에서 요소 삭제
const food = ['meet', 'egg', 'vege', 'milk'];
const vege = food.shift();
// vege 는 shift 결과물인 빠진 데이터를 출력
console.log(vege);
// food는 기존 배열에서 shift 결과 변경된 형태의 배열을 출력
console.log(food);

// push() 맨 뒤에서 요소 추가
const cafe3 = cafe.push('bread');

// pop() 맨 뒤에서 요소 삭제
const cafe4 = cafe.pop();

// splice() 특정 인덱스에 요소 위치 시키기
const cafe5 = cafe.splice(-3, 0, 1);
console.log(cafe);

// slice() 배열 일부분 잘라서 새로운 배열 반환
const cafe6 = cafe.slice(0, 2);
console.log("slice " + cafe6);
// 첫번째 매개변수 잘라낼 배열의 시작점 인덱스
// 두 번째 매개변수 잘라낼 배열의 종료시점, 잘라내는 부분에 미포함
const cafe7 = cafe.slice(-2, -1);
console.log("slice1 " + cafe7);
// 음수일 경우 뒤에서 몇째자리 숫자부터 시작인지
const cafe8 = cafe.slice(-4);
console.log("slice2 " + cafe8);
// 두번째 변수는 뒤에서 몇째자리 숫자까지 끊을지로 나옴, 생략하면 마지막 변수까지 추출

// reverse() 거꾸로 뒤집기
const cafe9 = cafe.reverse();
console.log("reverse " + cafe9);

// indexOf() 요소의 인덱스 찾고 싶을 때
console.log("indexof " + cafe.indexOf('cake', 1));
// 두번째 인수는 시작하고자 하는 인덱스번호이고 생략가능
// 탐색되지 않을 때 -1 출력
console.log("indexof " + cafe.indexOf('scone'));

// isArray() 인자가 배열인지 확인하고 싶을 때
console.log("isArray " + Array.isArray(cafe));

// join() 요소 연결해서 하나의 값으로 만들 때
console.log("join " + cafe.join(''));
console.log("join " + cafe.join('/'));

// fill() 모두 같은 요소로 채우고 싶을 때
console.log("fill " + cafe.fill('tea', -3, -2));
// 채우고 싶은 내용, 채울 위치, 채우는 것을 반복하는 마지막지점

// flat() 배열 평탄화
const arr = [[1, 2, 3], 4, 5, [6, 7, [8, 9, [10, 11, [12]]]]];
console.log("flat " + arr.flat());
console.log("flat " + arr.flat(3));
// 기본값 1, 괄호안에 들어간 숫자만큼 차원을 평탄화 해주는 메소드

// includes() 특정 요소 포함되었는지 확인
console.log("includes " + cafe.includes('coffee', 1));
// 두번째 인수는 index 시작위치, 음수일 경우 뒤에서부터 search, 생략 가능

// find() 하나의 요소라도 조건을 만족하는지 확인
const onetoten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(onetoten.find(i => i > 5));
// 특정조건에 만족하는 '1'개의 값만 반환
// 여기서는 6부터 만족하기 때문에 결과값이 6 하나만 나옴

// filter() 모든 요소가 조건을 만족하는지 확인
const titList = [
  {
    'name': 'title1',
    'contents': 'contents1',
    'dataNum': 1
  }, {
    'name': 'title2',
    'contents': 'contents2',
    'dataNum': 2
  }, {
    'name': 'title3',
    'contents': 'contents3',
    'dataNum': 3
  }, {
    'name': 'title4',
    'contents': 'contents4',
    'dataNum': 4
  }, {
    'name': 'title5',
    'contents': 'contents5',
    'dataNum': 5
  }, {
    'name': 'title6',
    'contents': 'contents6',
    'dataNum': 6
  }
];
// 특정 조건에 부합하는 모든 요소의 배열
console.log(titList.filter(i => i.dataNum > 3));

// findIndex() 조건을 만족하는 첫 번째 인덱스 찾기
const menu = [{
  'item': 'coffee',
  'amount': 1
}, {
  'item': 'cake',
  'amount': 2
}, {
  'item': 'tea',
  'amount': 3
}, {
  'item': 'cookie',
  'amount': 4
}];

const idx = menu.findIndex(obj => obj.item.length <= 3);
console.log("findindex " + idx);
// 주어진 조건에 부합하는 배열의 첫번쨰 요소 인덱스 반환


// map() 각각 요소 함수 호출
const map = [{
  'name': 'title1',
  'contents': 'contents1',
  'dataNum': 1,
  'data': [1, 2, 3]
}, {
  'name': 'title2',
  'contents': 'contents2',
  'dataNum': 2,
  'data': [1, 2, 3]
}, {
  'name': 'title3',
  'contents': 'contents3',
  'dataNum': 3,
  'data': [1, 2, 100]
}, {
  'name': 'title4',
  'contents': 'contents4',
  'dataNum': 4,
  'data': [1, 2, 3]
}, {
  'name': 'title5',
  'contents': 'contents5',
  'dataNum': 5,
  'data': [1, 2, 100]
}];

console.log('map ' + map.map(i => i.name));
// 요소의 인덱스 번호를 호출하고 싶을 때
console.log('map indexof ' + map.map(i => i.name).indexOf('title3'));

map.map((i) => {
  if (i.data.includes(100)) {
    return i.name
  }
  return
}).filter(i => i);


console.log('map3 ' + map.map((i) => {
  if (i.data.includes(100)) {
    return i.name
  }
  return
}).filter(i => i));
// map() 메서드를 이용해서 해당하는 값이 있는 항목만 'name'으로 변환, filter를 이용해서 값이 없어 비어있는 부분을 제거하고 2개만 남김

// flatMap() 함수 실행과 배열 평탄화 동시에
const coffee = ['iced americano and latte', 'espresso', ' ', 'macchiato', ' ', 'cappuccino'];

const cfmap = coffee.map(i => i.split(' '));
console.log('map ' + cfmap);
// split 전 각각의 요소가 내부 배열이 되어서 별도의 평탄화가 필요함
const flatMap = coffee.flatMap(i => i.split(' '));
console.log('flatMap ' + flatMap);
// 각 요소에서 분해된 요소들이 하나의 배열안에 나열됨

// forEach() 각각의 요소를 실행하고 싶을 때
const ott = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
ott.forEach(i => console.log(i));

// reduce() 각 요소에 누적해주며 실행하고 싶을 때
ott.reduce((rd, crt, idx, ary) => {
  console.log('reduce 누적값 ' + rd);
  console.log('reduce 현재값 ' + crt);
  // console.table(ary);
  return rd + crt;
});

// Array.from() 유사 배열 객체 배열로 만들기
console.log('Array.form ' + Array.from('hello world'));
console.log('Array.form ' + Array.from([1, 2, 3], x => x ** 2));
console.log('Array.form ' + Array.from([{ 'value': 100 }, { 'value': 200 }, { 'value': 300 }], x => x.value));

// concat() 배열 함치거나 새로운 요소 추가
const caf = ['coffee'];
caf.concat(['cake']);
caf.concat(['tea'], 'cookie');
console.log(caf.concat(['tea'], 'cookie'));
// 기존 배열을 변경하지 않고 추가된 새로운 배열을 반환함

// sort() 배열 내 요소 정렬
const nbs = [3, 4, 1, 2];
console.log('sort 0-9 ' + nbs.sort());

const vgs = ['beet', 'carrot', 'apple'];
console.log('sort a-z ' + vgs.sort());

// some() 1개 이상의 요소가 조건에 맞는지 찾을 떄
console.log(menu.some(i => { return i.amount <= 1 }));

// every() 모든 요소가 조건에 맞는지 찾을 때
console.log(menu.every(i => { return i.amount <= 4 }));


// for() 
const kFoods = ['김치', '비빔밥', '김밥', '떡볶이', '순두부찌개'];

let info = '꼭 먹어야 할 한국 음식: '
for (let i = 0; i < kFoods.length; i++) {
  info += kFoods[i];
  if (i < kFoods.length - 1) info += ', ';
}
console.log(info);
// for(초기화식; 조건식; 증감식)
// 생략할 경우 for문 안에서 if 라던가 ++ 증감이라던가 등등을 별도로 지정해줘야하고, 나갈 때 break문을 사용한다.

// while()
// true 일경우 실행, false가 되면 종료
let i = 0;
let j = 2;
while (i < 5) {
  i++;
  console.log('while ' + i * j);
}

// do while문 
// 반드시 한번 실행된 뒤 다음으로 while과 같이 작동
let sum = 0;
let k = 0;

do {
  k++;
  sum += k;
} while (k < 10);

console.log('do while ' + sum);

// break
let l = 0;

while (l < 100) {
  l++;
  if (l === 14) {
    console.log(l + '살 부터 중학생이 됩니다.');
    break;
  }
}
console.log('중학교 입학을 축하합니다');

// continue
// 조건문을 건너뛸 때 사용
for (let i = 0; i < 20; i++) {
  if (i < 13) continue;
  console.log(i + '살은 청소년입니다.');
}

// 레이블 : 식별자, 네임테그 반복문 앞에 레이블을 붙여 구문과 함께 사용하여 반복문 컨트롤 
timestable:
// timestable: 레이블명
for (let x = 2; x < 10; x++) {
	for (let y = 1; y < 10; y++) {
		if (x === 4) break timestable;
		console.log(`${x} X ${y} = ${x * y}`);
	}
}
// 4일경우 반복 자체가 멈추도록 작업

for (let x = 2; x < 10; x++) {
  test:
  // test: 레이블명
	for (let y = 1; y < 10; y++) {
		if (x === 4) break test;
		console.log(`${x} X ${y} = ${x * y}`);
	}
}; 
// 4단만 멈추도록 작업한 내용


// object(객체) 반복문





// for in 반복문
// literal(문자) object(객체)는 반복 가능한 객체로 인식되지 않음
// 키 값만 출력하는 반복문 
const pocketmons = {
  피카츄: 1,
  라이츄: 2,
  파이리: 3,
  꼬부기: 4,
  버터플: 5,
  야도란: 6, 
  피죤투: 7,
  또가스: 8,
  메타몽: 9,
};

console.table(pocketmons);

// key값 출력
for (let pocketmon in pocketmons) {
  console.log(pocketmon);
}

// value값 출력
for (let pocketmon in pocketmons) {
  console.log(`${pocketmons[pocketmon]}`);
}

// Object.keys
console.log(Object.keys(pocketmons));
// 키값을 배열로 변환
console.log(Object.values(pocketmons));
// 인덱스(value)값 배열 형태 반환
console.table(Object.entries(pocketmons));


// array(배열) 반복문
const languages = ['Java', 'Javascript', 'Python', 'Ruby', 'C', 'C++', 'Node.js', 'Django'];

for (let lang of languages) {
  console.log(lang);
}

// for of 문
// for in 문과 비슷하지만 불필요한 프로퍼티를 줄이고 깔끄하게 보이게 할 수 있음
// for문을 가독성 높게 보여줄 수 있다는 점이 좋음

const seat = [['피카츄' , '라이츄', '파이리' ],
						  ['꼬부기' , '버터플', '야도란' ],
              ['피죤투' , '또가스', '메타몽' ]];

//for 문 사용
// for (let i = 0; i < seat.length; i++) {
//     const row = seat[i];
//     for (let j = 0; j < row.length; j++) {
//         console.log(row[j]);
//     }
// }

//for of 문 사용
for (let row of seat) {
    for (let pocketmon of row) {
        console.log(pocketmon);
    }
}
// 반복 가능한 객체가 아닐 경우 for of문을 쓰면 에러가 발생.
// 이럴 경우 for in문을 사용