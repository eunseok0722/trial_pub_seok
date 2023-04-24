window.onload = () => {
    //  버튼 가져오기
    const btnCrt = document.querySelector('.btnCrt');
    let i = 0;
    // 버튼 할 일 정하기
    btnCrt.addEventListener('click', () => {
        // 할 일 처리
        let hTbody = document.getElementById('htmlTbody');

        // Javascript Table row and column;
        // Insert a row at the end of the table
        const newRow0 = hTbody.insertRow();
        const newCell0 = newRow0.insertCell();
        const newCell1 = newRow0.insertCell();
        const newCell2 = newRow0.insertCell();
        const newCell3 = newRow0.insertCell();

        // console.log(hTbody);
        const arr = new Array();
        arr.push({name: '홍길동', email: 'hong@hong.com', age: 25, pastTime: '음악감상'});
        arr.push({name: '이순신', email: 'lee@hong.com', age: 44, pastTime: '걷기'});
        arr.push({name: '강감찬', email: 'kang@hong.com', age: 28, pastTime: '영화보기'});
        arr.push({name: '김유신', email: 'kim@hong.com', age: 55, pastTime: '야식먹기'});
        arr.push({name: '광개토', email: 'kwang@hong.com', age: 15, pastTime: '독서'});

        // Append - 텍스트 노드를 새롭게 생성한 Cell에 붙이기
        const newText0 = document.createTextNode(arr[i].name);
        const newText1 = document.createTextNode(arr[i].email);
        const newText2 = document.createTextNode(arr[i].age);
        const newText3 = document.createTextNode(arr[i].pastTime);
        // console.log(arr.length, i);
        // arr의 길이에 1을 빼서 0, 1, 2, 3, 4번째 값까지 왔을 때 초기화 될 수 있도록 함
        if (i < arr.length - 1) {
            i++;
        } else {
            i = 0;
        }
        newCell0.appendChild(newText0);
        newCell1.appendChild(newText1);
        newCell2.appendChild(newText2);
        newCell3.appendChild(newText3);

        /*---------------------------------------------------------------------------------*/

        //     테이블 row 구하기
        const table = document.getElementById('myTable');
        // 테이블의 행의 길이에서 -1을 빼서 thead를 제외한 값을 구함
        // console.log(table.rows.length - 1);
        // 첫번째 행, 즉 thead
        // console.log(table.rows[0]);
        // tbody의 첫번째 행
        // console.log(table.rows[1]);

        // 행이 몇개인지 확인
        const r = table.rows.length - 1;
        // console.log(
        //     '테이블의 row 갯수는' + r + '입니다.'
        // )

        // 해당 행의 cell이 몇개인지 확인
        const c = table.rows[0].cells.length
        // console.log(
        //     '테이블의 cell 갯수는' + c + '입니다.'
        // )

        // 반복문 순회하면서 각 Cell에 정보값 세팅
        // 내가 작성한 내용, 매번 모든 셀의 내용을 다시 입력하기 때문에 셀이 늘어날수록 연산 개수가 늘어나기 때문에 잘못됨
        // for (let k = 1; k < r + 1; k++ ) {
        //     for (let l = 0; l < c; l++ ) {
        //         table.rows[k].cells[l].innerText = `${k}번째 줄의 ${l}번째 셀`
        //     }
        // }

        // 강사가 작성한 내용
        // 반복문 순회하면서 각 Cell에 정보값 세팅
        for (let k = 0; k < c; k++) {
            // hTbody가 tbody만 가져오는 것이기 때문에 row의 첫 열이 table의 1번째 줄
            hTbody.rows[r-1].cells[k].innerHTML = `${r}열 ${k}셀`;
        }
    })
}