// ver
// 중복선언 가능
// 재할당 가능
// 함수 레벨 스코프(Function-level scope)
// 호이스팅 시 undefined로 초기화됨
// 전역객체 프로퍼티

// let
// 중복선언 불가
// 값 재할당 가능
// 블록 레벨 스코프(block-level scope)
// 호이스팅 안되는 것과 같이 작동
let hello;             // 초기화 단계
console.log(hello);

hello = 99;            // 할당 단계
console.log(hello);
// 선언단계와 초기화 단계가 분리되어 진행
// 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간이 존재
hello = 10;            // 전역 변수
{
  // console.log(hello);    // ReferenceError: hello is not defined
  let hello = 2;         // 지역 변수
}
// 전역객체 프로퍼티가 아님
hello = 123;
console.log(hello);           // 123
console.log(window.hello);    // undefined

// const
// 중복 선언 불가
// 값 재할당 불가
// 선언과 값 할당을 동시에 해줘야 함
const kakao = 1;

// 객체 프로퍼티 변경 가능
const company = { name: 'kakao' };
company.name = 'naver';
console.log(company);

// 객체 프로퍼티 변경 가능
const nmLst = [10, 20, 30];
nmLst.push(100);
console.log(nmLst);

// 블록 레벨 스코프(Block-level scope) 블록을 벗어나면 별도 선언이 필요해짐
// TDZ; Temporal Dead Zone 
// 선언 전에 변수에 접근하는 것을 막기 위해서 존재하는 임시영역
// 저장장소에 할당되었지만 접근이 막혀있음
// const apple = 'outer scope';
// (function() {
//   console.log(apple);
//   const apple = 'inner scope';
// }());

// 전역객체 프로퍼티가 아니다

console.log(window.kakao); // undefined
console.log(kakao); // 1