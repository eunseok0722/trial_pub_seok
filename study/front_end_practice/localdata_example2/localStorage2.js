window.onload = () => {
    // 버튼 가져오기
    const btnAllView = document.querySelector('.btnAllView');
    // console.log(btnAllView);

    // 버튼 클릭 시 -> 할 일 처리
    btnAllView.addEventListener('click', () => {

        /* ------------------------------------------------------- */
        // 배열 정보를 동적으로 테이블 생성하여 삽입하기 -> tbody
        // let ar = new Array();
        // let result= '';
        // ar.push({name: '홍길동', email: 'hong@hong.com', age: 25, pastTime: '음악감상'});
        // ar.push({name: '이순신', email: 'lee@hong.com', age: 44, pastTime: '걷기'});
        // ar.push({name: '강감찬', email: 'kang@hong.com', age: 28, pastTime: '영화보기'});
        // ar.push({name: '김유신', email: 'kim@hong.com', age: 55, pastTime: '야식먹기'});
        // ar.push({name: '광개토', email: 'kwang@hong.com', age: 15, pastTime: '독서'});
        // console.log(ar[0].name);
        // console.log(ar[1].email);
        // console.log(ar[2].age);
        // console.log(ar[3].pastTime);

        // for(const i in ar) {
        //     // console.log(i);
        //     result += "<tr>";
        //     result += "<td>" + ar[i].name + "</td>";
        //     result += "<td>" + ar[i].email + "</td>";
        //     result += "<td>" + ar[i].age + "</td>";
        //     result += "<td>" + ar[i].pastTime + "</td>";
        //     result += "</tr>";
        // }
        //
        // let hTbody = document.getElementById('htmlTbody');


        // 기존의 데이터를 삭제하고 새로운 정보를 불러오기
        // $('#htmlTbody').empty(); -> 제이쿼리 문법
        // hTbody.innerHTML = null;
        // Append
        // $('#htmlTbody').append(result); -> 제이쿼리 문법
        // hTbody.append(result) -> 텍스트 문자열 형태로 Append 됨
        // hTbody.innerHTML = result;

        /* ------------------------------------------------------- */

        // 할 일 처리 -> 로컬 스토리지 데이터 값들 가져와서 출력해주기
        // const getData = localStorage.getItem('background-color');
        // console.log(getData);

        // 첫번째 키만 출력하기
        // console.log(localStorage.key(0));

        // 키가 몇 개인지 -> length
        // console.log(localStorage.length);

        // 배열 변수 사용한 방법
        // let ar = new Array()
        // let result = '';
        // for (let i = 0; i < localStorage.length; i++) {
        //     const key = localStorage.key(i);
        //     result += "<tr>";
        //     result += "<td>" + key + "</td>";
        //     result += "<td>" + localStorage.getItem(key) + "</td>";
        //     result += `<td> <button class="btnRemove">Remove</button> </td>`;
        //     result += "</tr>";
        // }
        // ar.push(result);
        // let hTbody = document.getElementById('htmlTbody');
        // hTbody.innerHTML = null;
        // hTbody.innerHTML = ar;

        // 배열 안쓴 버전
        let result = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            result += "<tr>";
            result += "<td>" + key + "</td>";
            result += "<td>" + localStorage.getItem(key) + "</td>";
            result += `<td> <button class="btnRemove">Remove</button> </td>`;
            result += "</tr>";
        }
        // ar.push(result);
        let hTbody = document.getElementById('htmlTbody');
        // hTbody.innerHTML = null;
        hTbody.innerHTML = result;
    })

}