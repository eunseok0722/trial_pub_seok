console.log(Math.round(1.6));  // 2
console.log(Math.round(1.4)); // 1

function sum(first, second) { // 매개변수 parameter
    console.log('a');
    return first + second; // return을 만나면 1. 해당 값을 반환하고, 2. 함수가 자동으로 종료됨
    // console.log('b'); 아래에 console.log가 있어도 이것을 수행하지 않음
}

sum(2, 4); // 6 각각의 입력값 -> 인자(argument)

console.log(sum(2,4));
