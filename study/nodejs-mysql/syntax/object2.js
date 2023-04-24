// Array, Object


// 함수는 다른 구문과 다르게 처리구문임과 동시에 값이 될 수 있다.
var f = function () {
    console.log(1+1);
    console.log(1+2);
}
console.log(f());

var a = [f];
a[0](); // f()를 실행하는 것과 같음, 배열의 원소로서 존재할 수 있음

var o = {
    func: f
}
o.func();

// !!자바스크립트에서 처리방법을 그루핑하는 함수도 배열, 객체의 데이터로 저장할 수 있다.!!