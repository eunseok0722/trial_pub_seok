// function a() {
//     console.log('A');
// }
var a = function () {
    console.log('A');
}
a();

function slowfunc(callback) {
    // 엄청나게 복잡한 어떠한 프로세스가 있는 slow fucntion이 실행된 이후
    // 파라미터로 받은 a의 함수 a()를 실행하도록 하는 것
    callback();
}

slowfunc(a);