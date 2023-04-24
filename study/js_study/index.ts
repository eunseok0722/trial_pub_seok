let 이름 :string = 'kim';
let 이름들 :string[] = ['kim', 'park'];
let 이름오브젝트 :{ name? : string } = { name : 'kim' };
// 여러 타입 지정
let 이름이나 : string | number = 123;
// 타입을 변수에 담아서 사용할 수 있음
type Name = string | number;
let 타입변수 :Name = 123;
// 함수 파라미터와 리턴값 타입지정
function 함수(x :number) :number {
    return x * 2
}
// array 자료에 쓸 수 있는 튜플 타입
type Member = [number, boolean];
let john:Member = [123, true];

type Member1 = {
    [key :string]: string
}
let john1 : Member1 = { name : 'kim'}

class User {
    name;
    constructor(name :string) {
        this.name = name;
    }
}