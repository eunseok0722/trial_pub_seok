
// ES5까지 배열 분해 할당 방법

// 배열의 인덱스를 활용하여 요소에 접근하는 방법 사용
var categories = ['IT', 'life', 'TIL'] // 할당할 배열

// n개의 할당을 해주고자 하면 가독성을 위해 n줄의 코드 작성이 필요
var category1 = categories[0];
var category2 = categories[1];
var category3 = categories[2];

console.log(category1, category2, category3);

// 아래와 같이 배열에 변수를 대입하면 됨
const [cg1, cg2, cg3] = categories;

console.log(cg1, cg2, cg3);

const [resume, tech_interview, final_interview] = [true, true, true];
// 가장 흔하게 볼 수 있는 배열 구조 분해 할당 구문이다.

console.log(resume, tech_interview, final_interview);
// 첫번째 할당문 : true true true

const [itm1, itm2, itm3] = 'true,true,true'.split(',');
// 두번째 할당문 : 'true' 'true' 'true'
console.log(itm1, itm2, itm3);


// 선언 후 변수에 할당하기
// const 사용하면 에러 발생하기 때문에 let 쓰기
let ct1, ct2, ct3;

// 변수를 먼저 선언하고 그 뒤에 값을 할당해주기
[ct1, ct2, ct3] = categories;
console.log(ct1, ct2, ct3);

// 좌변에서 변수의 갯수가 우변의 배열의 요소 갯수보다 많은 경우
const ctgr = ['IT', 'TIL']; // 배열 요소 갯수 2

const [ctgr1, ctgr2, ctgr3] = ctgr; // 변수의 갯수 3
// category3 === undefined

// 좌변에서 콤마 사이에 변수 선언을 하지 않는 경우
const [title, , categories1] = ['TIL-JS', '...content...', ['it', 'js', 'til']];
console.log(title, categories1)// TIL_JS, (3)['it', 'js', 'til']

// 구조분해할당을 통한 복잡 데이터 추출
// todos라는 배열 안에 객체가 3개 담겨진 구조
// 각각의 객체에는 id, content, completed라는 키 값이 존재
const todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'JS', completed: false },
];

// todos 배열의 두 번째 요소인 객체로부터 id 프로퍼티만 추출
const [, {id}] = todos;
console.log(id) // 2

// todos 배열의 세 번째 요소인 객체로부터 content 프로퍼티만 추출
const [,,{content}] = todos;
console.log(content); // 'JS'


// 기본값(default) 설정하기

const post = ['JS-study', ['til', 'fe', 'it']];

// 기본값을 설정하지 않은 경우
const [htitle, hcategories, isPrivate] = post;
console.log(isPrivate); // undefined

// 기본값을 설정한 경우
const [htitle1, hcategories1, isPrivate1 = false] = post;
console.log(isPrivate1); // false
// 기본 값도 설정되어 있고, 값을 할당도 받았다면 할당 받은 값이 적용된다.

let wade = {
    name : 'wade',
    ranking : '1st',
};

let licat = {
    name: 'licat',
    ranking: '2nd',
};

// 두 변수의 값을 교환할 때 아래와 같이 배열 구조 분해 할당 활용하기
[wade.ranking, licat.ranking] = [licat.ranking, wade.ranking];
console.log(wade, licat);

// 배열과 Rest 요소
// 구조 분해 할당에서 선언된 변수에 값을 할당 받을 때 나머지 요소들을 배열로 받는 것을 의미

const menu = ['IT', 'life', 'TIL', 'javascript'];
// 반드시 배열의 마지막에서 Rest 요소를 작성해야함
const [firstCategory, ...restCategories] = menu;
console.log(firstCategory); // 'IT'
console.log(restCategories); // ['life', 'TIL', 'javascript']


// 객체 구조 분해

// ES5 까지 객체 구조 분해 할당
const human = {name: 'su', age: 10}
// 객체의 프로퍼티 키(name, age) 를 이용해서 변수에 할당
// const name = human.name;
// const age = human.age;

// 현재의 객체 분해 할당
const {name, age} = human;
console.log(name, age);
// 객체 구조 분해 할당은 프로퍼티키를 기준으로 할당되기 떄문에 할당받을 변수의 이름과 프로퍼티 키가 동일해야 한다.
// const {name, birth} = human 으로 했을 경우에는 birth라는 프로퍼티키가 없기 때문에 구조 분해 할당이 되지 않는다.

// 새로운 변수를 이용한 할당
const myPet = {nickname: 'star', age: 8};

// {프로퍼티 키: 새로운 변수명} 형태로 작성
const {nickname: 이름, age: 나이} = myPet;

console.log(이름, 나이);
// 새로운 변수에 할당했으므로 기존의 프로퍼티 키와 동일한 변수는 존재하지 않게 됨
// console.log(nickname, age) // ReferenceError: age is not defined

// 기본값 설정
// 할당연산자 =, 콜론 : 을 사용하여 {프로퍼티 키 : 새로운 변수명 = 기본값} 형태로 작성
const man = {name1: 'jun'}
const {name1, height: h = 175} = man;
console.log(h);


// 객체와 Rest 프로퍼티
// 변수에 담지 못한 나머지 객체 프로퍼티 모아서 할당 가능
const myBag = {laptop: 'black', card: 'blue', powder: 'white', lipstick: 'red'};
const {laptop, card, ...cosmetics} = myBag;
console.log(laptop, card, cosmetics);// black, blue, {powder: 'white', lipstick: 'red' }

// 중첩 구조 분해
const bread = {
    title: '빵',
    info: {
        make: true,
        type: ['바게뜨', '호밀빵', '핫도그 번', '도넛', '브래드스틱', '난', '비스킷'],
    },
    ingredients: ['ingredients', ['밀가루', '이스트', '사워도', '소금']]
}
// type 의 배열, ingredients의 밀가루, 이스트, 소금을 한번에 추출하는 방법
const {
    ingredients: [, [ // ingredients 2차원 배열 추출할 값 할당
        ingredient1, ingredient2, ingredient3
    ]],
    info: {  // info가 객체이므로 {}로 접근
        type : breadType // type 변수 이름 'breadType'로 변경
    }
} = bread
console.log(ingredient1, ingredient2, ingredient3, breadType) // 밀가루, 이스트, 사워도, [바게트 부터 줄줄]

// for of 반복문과 구조 분해

// Object.entries(), for of
// Object.entries()와 반복문 사용하면 객체의 키와 값을 순회하여 변수로 분해 할당 할 수 있음
const site = {
    name: 'paullab',
    url: 'www.paullab.co.kr',
    mobile: 'm.paullab.co.kr'
}
for (const [key, val] of Object.entries(site)) {
    console.log(`${key}: ${val}`)
}

// Map(), for of
// Map()과 반복문 사용해서 객체의 키와 값을 순회하여 변수로 분해할당 할 수 있음
const siteURL = new Map();
siteURL.set('name', 'paullab') // set으로 객체에 삽입
siteURL.set('url', 'www.paullab.co.kr');

for (const [key, val] of siteURL) {
    console.log(`${key}: ${val}`);
}

// 함수 구조 분해
// 함수 매개변수의 기본값 설정
// es5 의 경우
// function person(user) {
//     user = user === undefined ? {} : user;
//     let name = user.name === undefined ? 'X' : user.name;
//     let age = user.age === undefined ? 'X' : user.age;
//     console.log(`이름 : ${name}, 나이 : ${age}`);
// }

// es6부터 함수 매개변수의 기본값을 설정할 수 있게 되어 편리하게 사용할 수 있게 되었음

// 구조분해 된 좌변을 우변의 빈 객체에 할당하여 사용 {name = 'X', age = 'X', favoriteColor = 'black'}={}
function person({name = 'X', age = 'X', favoriteColor = 'black'}={}) {
    console.log(`이름 : ${name}, 나이 : ${age}, 좋아하는 색상 : ${favoriteColor}`);
}

person({
    name: 'kimcoding'
}); // 기본값에서 이름만 kimcoding으로 변경되어 출력됨

function person1({name = 'X', age = 'X', favoriteColor = 'black' }) {
    console.log(`이름 : ${name}, 나이 : ${age}, 좋아하는 색상 : ${favoriteColor}`);
} // 기본값을 할당해 주려면 지금과 같이 빈 객체를 전달하면 됨
person1({});
// person1()과 같이 빈 객체를 전달해 주지 않을 경우 에러가 발생한다.

// 빈 객체를 전달하지 않고 매개 변수로 객체를 넣어 값을 추가하고 싶은 경우 아래와 같이 작성
function shape({color = 'puple', cords = {x: 0, y: 0}, radius = 10} = circle) {
    circle = {
        color,
        cords,
        radius
    }
}

shape(circle = {
    cords: {x: 10, y: 20}
});
console.log(circle)

// 함수 매개변수로 전달된 객체에서 속성 분해 할당
// movie 객체에서 함수를 사용하여 id, category, title을 분해하고 할당하는 방법
function movieID({id}) {
    return id;
}

function whatMovie({category: genre, title: {main: name}}) {
    console.log(`${genre[0]} movie is ${name}`);
}

const movie = {
    id: 14,
    category: ['SF', 'Fantasy'],
    title: {
        main: '듄',
        sub: '이것이 위대한 시작이다.'
    }
};

console.log(`movieID: ${movieID(movie)}`);
whatMovie(movie);

// 구조 분해 문제
//최연소 찾기
// people 객체의 이름과 나이의 정보가 담겨있다. 가장 나이가 적은 사람의 이름과 나이를 반환하는 함수를 만들어보자
// Object.entires와 구조 분해를 사용해서 문제를 풀어보자
const List = {
    roberst: 20,
    mark : 18,
    kevin: 7,
    james: 21,
    michael: 11,
    marks: 15
}

function findYoungest(people) {
    let name = '';
    let age = Number.MAX_SAFE_INTEGER; // 안전한 최대 정수값 초기화 설정
    let result;
    for ([key, val] of Object.entries(List)) {
        if (age > val) {
            age = val;
            name = key;
        }
    }
    result = `이름: ${name} 나이: ${age}`
    return result;
}
console.log(findYoungest(List));