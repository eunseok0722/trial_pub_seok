
// 콜백함수
// 콜백 예시
function dessert(count, eat, good) {
  count < 3 ? eatDessert() : goodDessert();
}
function eatDessert() {
  console.log('오늘 머겅야 할 간식을 먹어주세요');
}

function goodDessert() {
  console.log('오늘 먹어야 할 간식을 모두 먹었습니다.');
}

dessert(4, eatDessert, goodDessert);
// dessert함수의 콜백함수로 eatDessert, goodDessert가 반환된다.

// 동기/ 비동기 처리

function time() {
  setTimeout(() => {
    const 시작 = Date.now();
    for (let k = 0; k < 100000000; k++) {
    }
    const 끝 = Date.now();
    console.log(끝 - 시작 + 'ms');
  }, 0);
}
// 순차적으로 처리된 것 : 동기적
// for가 실행되는 동안 const 끝이 진행되지 않는 것을 알 수 있음
console.log('시작')
time(() => {
  console.log('작업이 끝났습니다.');
});
console.log('다음 작업');

// 콜백함수 활용하는 메서드

// forEach() 콜백함수를 활용하는 함수
let numberList = [181, 161, 25, 44];

numberList.forEach(function(value, index, array) {
  console.log(value, index, array);
  console.log(`${index}번째의 값은 ${value}`);
})