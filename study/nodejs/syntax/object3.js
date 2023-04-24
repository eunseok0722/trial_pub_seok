var v1 = 'v1';
// 10000000 개 정도의 코드가 중간에 끼었들었다고 상상
v1 = 'egoing'; // 다른 사람이 중간에 내용을 수정했음
var v2 = 'v2';

// 연관된 정보를 하나의 객체 안에 넣어놓을 수 있음
// 파일을 정리정돈 해주는 것과 같은 의미
var o = {
    v1: 'v1',
    v2: 'v2',
    // 객체를 참조할 수 있도록 현재 객체의 데이터를 참조할 수 있도록  this라는 스코프가 있음
    f1: function () {
        console.log(this.v1);
    },
    f2: function () {
        console.log(this.v2);
    }
}

function f1 () {
    console.log(v1);
}

function f2 () {
    console.log(v2);
}

o.f1();
o.f2();