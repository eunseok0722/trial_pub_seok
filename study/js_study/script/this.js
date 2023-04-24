// this
// 자신이 속한 객체

// 함수 호출 방식

// this 는 함수를 호출하는 방식에 따라 값이 달라진다


// 일반 함수
// 함수 선언문에서 함수 호출 시 this는 전역 객체 window 바인딩
function a() {
  console.log(this);
}
a();

// use strict (엄격문)

function b() {
  'use strict';
  console.log(this);
}
b();

function aa() {
  console.log(this);
  function bb() {
    console.log(this);
  }
  bb();
}
aa();

function aa_() {
  'use strict';
  console.log(this);
  function bb_() {
    console.log(this);
  }
  bb_();
}
aa_();

// this는 자신이 속한 객체를 나타내는데 객체를 생성하지 않는 함수에서는 window나 undefined가 뜨게 됨
// map(), forEach() 같은 함수에서는 각각의 요소를 나타내기도 하기 때문에 일반함수에서 this 가 무조건 전역 객체를 나타내지는 않음



// 메서드
// 메서드 내부에서는 해당 객체를 가리킴

let fruit = {
  name: 'Apple',
  price: 5000
};

// 함수 만드록 객체 프로퍼티에 함수 할당
fruit.fruitName = function() {
  console.dir(`${this.name}입니다.`);
};

fruit.fruitName();

// 이미 정의된 함수를 이용해서 메서드 만들기

// 함수 선언
function fruitName2() {
  console.log('사과입니다.')
};

// 선언된 함수 메서드로 등록
fruit.fruitName2 = fruitName2;
fruit.fruitName2();

// this 사용하기
let fruit2 = {
  name: 'pineApple',
  price: 1000,
  fruitName: function() {
    console.log(`${this.name}은 마시쪙`);
  }
}

fruit2.fruitName();

// 위 내용 단축 문법 적용 시
let fruit2_ = {
  name: 'pineapple',
  price: 1000,
  // 단축 문법 적용
  fruitName() {
    console.log(`${this.name}은 맛있다.`);
  }
};
fruit2_.fruitName();

let anotherFruit = {
  name: "Strawberry"
};

// 메서드 사용 시 주의할 점
let obj = {
  word: 'word',
  sayhello() {
    return `hello ${this.word}`;
  }
}

// 선언된 함수를 메서드로 등록
let sayhello = obj.sayhello;
console.log(sayhello()); // 결과 undefined
// 위와 같이 할 때 일반 함수와 같이 전역 객체를 참조하거나 엄격모드일 경우 undefined가 바인딩 됨

let obj2 = {
  word: 'world',
  sayhello() {
    console.log(this);
    return `hello ${this.word}`;
  }
}
// 선언된 함수를 메서드로 등록
let sayhello2 = obj2.sayhello;
console.log(obj2.sayhello());
// 해당 객체의 컨텍스트로 명확하게 호출해야 원하는 결과를 얻을 수 있음



// 생성자 함수

// 프로타입을 생성하고 인스턴스를 만들어서 실행하는 과정에 대한 예시
function NormalFunction(arg1, arg2) {

  NormalFunction.prototype.normalMethod = function() {
    console.log('노말 메서드 예시입니다.')
  };
}

const normal = new NormalFunction(10, 20);

// 인스턴스.메서드이름()
normal.normalMethod(); //결과 : 노말 메서드 예시입니다.

// 생성자 함수 내 this의 부재

function NormalFunction_(arg1, arg2) {
  // 변수로 저장을 하게 되면 해당 클래스의 프로퍼티로 저장되지 않는다.
  // this를 통해서 현재 빈 객체를 지정해주어야 그것이 프로퍼티로 저장이 된다.
  this.normalArg1 = arg1;
  this.normalArg2 = arg2;

  this.normalMethod = function() {
    console.log("노말 메서드 예시입니다.");
  };

}

const normal_ = new NormalFunction_(10, 20);
// 값을 입력했지만, 프로퍼티가 아니라 변수로 저장된 normalArg1, 2에 값이 대입되지 않아 결과적으로 빈 메서드가 출력된다. 
console.log(normal_);
// 결과: NormalFunction_ {}
// this를 통해서 해당 object를 지정해주어야 거기에 프로퍼티가 저장이 된다.



// call(), apply(), bind()
// 함수 호출 방식마다 변화하는 this를 대체하기 위해 존재

// call()
// func.call(thisValue, arg1, arg2, ....)형태로 사용
function printThis(arg1, arg2) {
  console.log(this)
  console.log(`call을 통해 넘겨받은 인자들: ${arg1}, ${arg2}`);
}
const setThisValue = {};
// object를 생성해서 그 안에 인수를 입력해서 전역변수로 아무것도 안나오지 않고 첫 인수, 둘째 인수가 결과값으로 나올 수 있게 된 듯 함
printThis.call(setThisValue, "첫 인수", "둘째 인수");



// apply()
function printThisa(arg1, arg2) {
  console.log(this);
  console.log(`apply를 통해 넘겨 받은 인자들: ${arg1}, ${arg2}`);
}
// const setThisValue = {}; 위에서 선언했기 때문에 참조 처리
printThisa.apply(setThisValue, ["첫 인수", "둘째 인수"]);
// 함수 구문 func.apply(thisArg, [asgsArray])


// bind()
// 함수 구문 func.bind(thisValue, arg1, arg2, ...) 
function printThisb(arg1, arg2) {
  console.log(this);
  console.log(`bind를 통해 넘겨 받은 인자들: ${arg1}, ${arg2}`);
}
// const setThisValue = {}; 위에서 선언했기 때문에 참조 처리

// 함수를 호출(실행)하지 않고 새로운 함수를 생성해 준다.
// 초기 인수로 "첫 인자"를 지정해준다.
const newPrintThis = printThisb.bind(setThisValue, "첫 인수");
newPrintThis();
newPrintThis("둘째 인자");
printThisb();

// 화살표 함수의 this
// 일반 함수나 메서드로 호출되던 호출 방식과 상관없이 화살표 함수를 감싸고 있는 것이 this가 참조할 값에 영향을 미침


// 비교하기
// var 를 통해 변수 선언하여 전역객체 window의 프로퍼티로 저장
var fruitN = 'apple';
const obja = { fruitN: 'banana' };

function nestedFunc() {
  function normalFunc() {
    console.log(this.fruitN);
  }
  // 일반 함수로 호출되어서 window의 객체를 불러오게 됨
  const arrowFunc = () => {
    console.log(this.fruitN);
  }
  // 한 단계 위의 nestedFunc의 obj 값을 반환
  const nestedArrowFunc = () => {
    const arrowFunc2 = () => {
      console.log(this.fruitN);
    }
    arrowFunc2();
  };
  // 화살표 함수가 아닌 함수가 나올때까지 올라가서 그 함수의 obj 값이 무엇이냐를 가리키게 됨
  normalFunc();
  arrowFunc();
  nestedArrowFunc();
}
nestedFunc.call(obja);
// 결과 apple, banana, banana

// 자바스크립트에서는 함수가 실행 된 위치에서 상위 스코프를 찾는 것이 아니라 함수가 선언된 위치에서 상위 스코프를 찾기 때문에 함수 선언의 위치에 따라서 값이 바뀔 수 있기 때문에 주의해야 한다.

// 함수 선언과 실행 위치 변화에 따른 값 변화 확인
function nestedFunc2() {
  normalFunc();
  arrowFunc();
  nestedArrowFunc();
}

function normalFunc() {
  console.log(this.fruitN);
}
const arrowFunc = () => {
  console.log(this.fruitN);
}
const nestedArrowFunc = () => {
  const arrowFunc2 = () => {
    console.log(this.fruitN);
  }
  arrowFunc2();
};

nestedFunc2.call(obj);
// 결과 apple, apple, apple



// this의 활용
// 객체 단위로 this를 사용하고 싶지만 콜백함수, 일반 함수로 사용되는 경우 메서드 내에 있다면 의도치 않은 window 객체를 가리키는 문제가 발생
// 이러한 문제를 화살표 함수를 이용해서 해결

var fruitName = 'cherry';
function Fruit() {
  this.fruitName = 'grape';

  // setTimeout의 인수로 '일반 함수'를 사용
  // 생성된 인스턴스에서 makeFruitChip1을 사용할 수 있도록 prototype에 함수 등록
  Fruit.prototype.makeFruitChip1 = function() {
    console.log(`I will make ${this.fruitName} chips by makeFruitChip1`);
    console.log('making fruit chips..');
    setTimeout(function() {
      console.log(this.fruitName + " chips is Done! by makeFruitChip1");
    }, 1000);
  }

  // setTimeout 인수로 "화살표 함수" 사용
  Fruit.prototype.makeFruitChip2 = () => {
    console.log(`I will make ${this.fruitName} chips by makeFruitChip2`);
    console.log('making fruit chips..');
    setTimeout(() => {
      console.log(this.fruitName + ' chips is Done! by makeFruitChip2')
    }, 1000);
  }
}

const fruit3 = new Fruit();
fruit3.makeFruitChip1(); //setTimeout 인자로 this가 들어가면서 전역변수로 변경되어 cherry가 출력되는 결과가 나옴
fruit3.makeFruitChip2(); //상위 스코프로 인해서 Fruit()함수 내에 인자인 grape로 끝까지 출력되는 모습을 볼 수 있음
// this 가 의도치 않게 전역변수로 변경되는 것을 막기 위해서 화살표 함수를 써야 함



// 이벤트 핸들러 함수의 this

// addEventListener 방식
//  이벤트 핸들러 함수 내 this가 이벤트 처음 발생한 타깃을 가리킴

// $(function() { })과 동일한 역할
// document.addEventListener("DOMContentLoaded", function() {})

const bananaBtn = document.querySelector('.banana-btn');

function handleBanana() {
  console.log("바나나입니다. 🍌");
  console.log(this);
}

// 이벤트 핸들러 등록: addEventListener

bananaBtn.addEventListener("click", handleBanana);


// event handler property 방식
const grapeBtn = document.querySelector('.grape-btn');

function handleGrape(event) {
  console.log('포도 버튼을 눌렀습니다. 🍇');
  console.log(this);
}

// 이벤트 핸들러 등록
grapeBtn.onclick = handleGrape;



// event handler attribute 방식
function handleApple(thisValue) {
  console.log('사과 버튼을 눌렀습니다. 🍎');
  console.log(thisValue);
}

// 또는
function handleApple2() {
  console.log('사과 버튼이 눌렸습니다. 🍎');
  console.log(this);
}
// 로 하고 html 인라인에 .call(this)를 넣는 방식으로 진행

// 이렇게 해야하는 이유
// onclick(event) { hadleApple()}; 형식으로 작동하기 때문에 onclick()이 일반함수로 처리되어 this 가 window 를 참조하게 됨
