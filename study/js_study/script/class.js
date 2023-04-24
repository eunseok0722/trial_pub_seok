// Class
// 생성자 함수에 의한 생성 방식
const player = new Object();
// new 로 새로운 객체 타입, 내장 객체타입 인스턴스 생성
player.name = 'Choi';
player.sayWinner = function() {
  console.log('Ladies and gentlemen, Champion is ' + this.name);
};
player.sayWinner();

// 객체 리터럴에 의한 생성 방식
const rabbit = {
  type: '토끼',
  name: '빙키',
  sound: '깡총',
  say() {
    console.log(this.type + '는 ' + this.sound);
  }
};

rabbit.say();

const frog = {
  type: '개구리',
  name: '개리',
  sound: '개굴',
  say() {
    console.log(this.type + '는 ' + this.sound);
  }
}
frog.say();
// 만들때 가장 직관적이고 편하지만, 같은 프로퍼티 구조를 반복해서 작성해줘야하기 때문에 불편하다.

// 생성자 함수에 의한 객체 생성
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
  this.say = function() {
    console.log(this.type + '는 ' + this.sound);
  };
}

const rabbit2 = new Animal('토끼', '빙키', '깡총깡총');
const frog2 = new Animal('개구리', '개굴', '두껍두껍');
// 생성자 함수를 호출할 떄 new로 작성

rabbit2.say();
frog2.say();

// 프로토타입
// 생성자함수에서 재사용하는 함수 또는 값을 프로토타입이라고 함
// 다른 객체의 부모(상위) 객체 역할을 하는데 다른 객체에 프로퍼티 공유 가능
// 자식(하위)객체는 부모 객체 프로퍼티 자신것으로 사용할 수 있음

class Player {
  constructor(type, name, sound) {
    // constructor 프로토타입에서 생성자 함수의 역할을 함
    this.type = type;
    this.name = name;
    this.sound = sound;
    this.say = function() {
      console.log(this.name + '는 ' + this.sound);
    };
  }
}

const player1 = new Player('mid', 'Choi', '아자아자');
const player2 = new Player('def', 'Lee', '으쌰으쌰');
// new 연산자를 꼭 붙여야지 오류가 나지 않는다.

player1.say();
player2.say();
// 클래스가 생성자 함수보다 더욱 엄격한 규칙을 따르며, 생성자 함수에서 제공하지 않는 기능을 제공한다.

// 클래스는 new 연산자가 없을 경우 오류로 표기해준다. 
// 상속을 지원하는 extend와 super 키워드를 지원한다. 
// 모든 코드에 strict mode(엄격모드)가 지정되어있고 해제할 수 없다.

// 클래스 사용
class Apple { }
// class 키워드와 클래스 이름을 사용
// 첫번째 글자를 대문자로 사용하는 파스칼 케이스 사용이 일반적

// 클래스는 일급 객체 인데 아래는 일급객체의 특징
// 함수 리터럴을 사용하여 생성할 수 있음
// 변수나 프로퍼티, 자료구조에 값으로 할당이 가능
// 함수 인자로 전달 가능
// 함수의 리턴 값으로 사용 가능
console.log(typeof Apple);

const Player3 = class { }; // 익명 클래스
const Player4 = class myClass { }; // 기명 클래스



// 정의 방식 비교

// 생성자 함수 방식
var Player5 = (function() {

  function Player5(name) {
    this.name = name;
  }

  // 프로토타입메서드
  Player5.prototype.sayWinner = function() {
    console.log('Ladis and gentlemen, Champion is ' + this.name);
  };

  Player5.prototype.sayYum = function() {
    console.log(`${this.name} is Yummy`);
  };

  // 정적메서드
  Player5.sayWinner = function() {
    console.log('Champion!');
  };

  return Player5;
}());

Player5.sayWinner();
const sayBye = new Player5('Bye');
const sayyummy = new Player5('hamberger');
sayBye.sayWinner();
sayyummy.sayYum();

// 클래스

class Player6 {
  constructor(name) {
    this.name = name;
  }
  // 프로토타입 메서드
  sayWinnner() {
    console.log(`Ladies and gentlemen, Champion is ${this.name}`);
  }

  sayYum() {
    console.log(`${this.name} is Yummy`);
  }

  // 정적 메서드
  static sayWinner() {
    console.log('Champion!')
  }
  // static 이라는 연산자를 붙여서 선언한다. 
}

const sayHi = new Player6('hi');
const sayyum = new Player6('Pizza');
// 이렇게 내용물을 클래스에 넣어서 만든 것을 인스턴스라고 함
sayHi.sayWinnner();
sayyum.sayYum();
// 프로토타입 메서드는 위와 같이 인스턴스로 호출해야함


// 호이스팅
// 클래스도 선언 전에 먼저 영역을 배정받고 거기에 초기화 선언이 있기 전까지 호출을 할 수 없는 구간인 TDZ이 존재한다.

// 인스턴스
// 클래스로 만든 객체를 의미
// 클래스가 붕어빵틀, 그리고 인스턴스가 틀로 만든 붕어빵

class Fruit {
  constructor(name) {
    this.name = name;
  }
}

const fruit = new Fruit('mango');
console.log(fruit);
console.log(typeof Fruit);

// constructor 특징
// 클래스 내 한 개만 존재할 수 있음, 2개 이상 시 에러 발생

// 정적 메서드
//인스턴스를 생성하지 않고 호출 가능
// 클래스에 바인딩 되어 있기 때문에 인스턴스로 호출하면 오류 발생
Player6.sayWinner();
// 정적 메서드는 클래스명으로 호출해야한다.

// 프로퍼티
// 인스턴스 프로퍼티(Instance property) : 주어진 특정한 인스턴스(객체)의 데이터를 가진다. 
// 스태틱 프로퍼티(Static property) : 모든 객체 인스턴스들과 공유되는 데이터 가짐. 
// 이름: 문자열이거나 심볼(key)
// 값: 원시값(primitive), 메서드(method)또는 객체 참조(object reference) (value)

const user = {
  // 아래 쌍으로 이루어진 값을 객체의 프로퍼티라고 함
  // 데이터 프로퍼티라고 함
  // key : vaule
  name: 'eunseok',
  dept: 'FE',
  age: 18
};

//프로퍼티의 상태 : 프로퍼티 어트리뷰트
// 확인방법
Object.getOwnPropertyDescriptor(user, 'name');
Object.getOwnPropertyDescriptors(user);

// 프로퍼티 수정, 삭제
user.name = 'junhyun';
delete user.age;
console.log(user);

// 인스턴스 프로퍼티
class Student {
  constructor(id, name, topics) {
    this.id = id;
    this.name = name; 
    this.topic = topics;
    this.subject = 'javascript study'
  }

  // setter 함수 : 저장한 값 변경할 때 사용
  set name(value) {
    this._name = value;
    // .name으로 하면 계속해서 자신을 호출하게 되어 오류 발생
    // ._name으로 덮어쓰도록 만듦
  }

  // getter 함수 : 저장한 값 읽어올 때
  get name() {
    return this._name;
    // ._name으로 저장했으므로 불러오기도 _name으로 통일
  }

  set nameAndId(value) {
    [this._name, this.id] = value;
  }
}

const sungjae = new Student(1, '성재', ['조건문', '클래스', '구조분해할당']);
sungjae.name = '곽성재';
sungjae.nameAndId = ['김준현', 1100110];
console.log(sungjae);

// 접근자 프로퍼티 (accessor property)
// class가 만들어낼 인스턴스 프로퍼티에 접근할 때 사용하는 메서드
// getter함수, setter함수라고도 함

// getter함수, setter함수
// 메서드 앞에 get or set 을 붙이면 getter, setter함수가 됨 

// 클래스필드
// 자바스크립트에서 정의 : 클래스 몸체에서 프로퍼티 정의하는 방법

class Student1 {
  subject = 'javascript study'
  // 최신 스크립트에서는 이처럼 constructor 안에서 쓰지 않아도 데이터 프로퍼티를 정의할 수 있음
  // 위치는 constructor 앞, 뒤 상관 없음
  // 몸체에서 정의할때는 this는 사용하지 않음
  
  // 다만 외부에서 값을 받아서 입력하려면 constructor에서 해야함
  constructor(id, name, topics) {
    this.id = id;
    this.name = name;
    this.topic = topics;
  }
}

let junhyun = new Student1(1, '성재', ['조건문', '클래스', '구조분해할당']);
console.log(junhyun);

// private 필드 정의
// 접근제한자 #

class Student2 {
  subject = 'javascript study'
  #id;
  // 값은 받아와서 선언만 해줌, 값을 받아오지 않으면 undefined
  // constructor 외부에서 반드시 선언해주어야 함

  constructor(id, name, topics) {
    this.#id = id;
    this.name = name;
    this.topic = topics;
  }

  // get 함수로 불러오기 해야지만 조회가 가능
  get id() {
    return this.#id;
  }
  // setter 함수 설정해야 수정 가능
  set id(val) {
    this.#id = val;
  }
}

let heewon = new Student2(2, '희원', ['클래스']);
heewon.id = 123; //getter, setter 함수 설정해서 수정이 가능해짐
console.log(heewon.id); //결과값 undefined


// static 필드 정의
class Student3 {
  static isHumen = 'true';
  static level = 'begginer';
  subject = 'javascritp study';
  #id;
  
  constructor(id, name, topics) {
    this.#id = id;
  this.name = name;
    this.topic = topics;
  }

  get id() {
    return this.#id;
  }
  set id(val) {
    this.#id = val;
  }
}

let dongjae = new Student3(100, '동재', ['이직']);
// static 메서드는 위와 같은 인스턴스로 접근하면 접근할 수 없다. 
// 클래스명으로 접근해야지만 접근 가능하다. 
console.log(Student3.isHumen);


// 둘 비교
// 접근을 객체에서 해야한다 == 개별 객체만이 가질 속성이다. -> 인스턴스 프로퍼티
// 접근을 클래스에서 해야한다. == 클래스가 가져야할 속성이다. -> 스태틱프로퍼티

// 프로퍼티는 객체 또는 클래스의 속성 혹은 상태
// 프로퍼티는 값을 받거나 직접 할당 가능
// 프로퍼티 조회 클래스명.객체명

// 최신변경점
// constructor 외부에서도 정의 가능
// #을 이용해서 외부 접근 불가능한 private 필드 지원
// 클래스 자체에 속성, 상태 지정 시 static 메서드 이용




// 상속에 의한 확장

// 기존: 인스턴스 생성해서 클래스의 프로퍼티, 메서드 사용
class NormalClass {
  constructor(arg1, arg2) {
    this.normalArg1 = arg1;
    this.normalArg2 = arg2;
  }

  normalMethod() {
    console.log(`노말 메소드 예시 ${this.normalArg1} ${this.normalArg2}`);
  }
}

const normal = new NormalClass(10, 20);
normal.normalMethod();

// 클래스 확장 정의 : 클래스 -> 또 다른 클래스로 프로퍼티와 메서드 사용권한 상속
//  클래스A <-(상속) 클래스B <-(상속) 인스턴스

// 클래스A의 속성을 클래스B가 상속받는다
// 클래스A : 슈퍼 클래스, 베이스 클래스, 부모 클래스
// 클래스B : 서브 클래스, 드라이브드(파생) 클래스, 자식 클래스
// 클래스B extends 클래스A

// 클래스 확장 정의


// 슈퍼클래스
class Human {
  constructor(height, weight) {
    console.log(this);
    this.height = height; 
    this.weight = weight;
  }
  walk() {
    console.log('걷는 중..');
  }
  see() {
    console.log('보는 중..');
  }
}

// 서브클래스1

class Chef extends Human {
  constructor(height, weight, orderedMenu) {
    super(height, weight);
    this.orderedMenu = orderedMenu;
  }
  // chef 자체 메서드
  cook() {
    console.log(`${this.orderedMenu}를 만드는 중...`);
  }
}

// 서브클래스2 

class Waiter extends Human {
  constructor(height, weight, cookedMenu) {
    super(height, weight);
    this.cookedMenu = cookedMenu;
    console.log(this);
  }

  // waiter 자체 메서드
  order() {
    console.log(`주문 받는 중...`);
  }
// walk 메서드 오버라이드, 실행할 메서드를 찾을 때는 프로토타입 체인 상에서 제일 가까운 메서드를 찾아서 실행한다.
  walk() {
    console.log(`요리된 ${this.cookedMenu} 서빙하는 중...`)
  }

  superWalk() {
    super.walk();
  }
  
}

const chef = new Chef(160, 67, '고등어 정식');
const waiter = new Waiter(180, 80, '고등어 정식');

console.dir(chef);
chef.cook();
chef.see();
chef.walk();

console.dir(waiter);
waiter.order();
waiter.see();
waiter.walk();
waiter.superWalk();

// 클래스 확장을 통한 인스턴스 생성 과정

