// 브라우저 로컬데이터에 저장하기

// [!] 주요 메서드
// 값 저장하기 -> localStorage.setItem('key', value);
// 값 가져오기 -> localStorage.getItem('key');
// 값 삭제하기 -> localStorage.removeItem('key');
// 키(key)를 그대로 놓고 새로운 값 저장하면 기존 로컬데이터 정보가 수정됨

window.onload = () => {

    // set Data 버튼
    const btnSLD = document.querySelector('.btnSetLocalData');
    const btnGLD = document.querySelector('.btnGetLocalData');
    const btnRLD = document.querySelector('.btnRemoveLocalData');

    // Input Text 값
    const input = document.querySelector('input');

    // Set Data 버튼 클릭 시
    btnSLD.addEventListener('click', () => {
        // 할 일 처리 => 입력한 테긋트 값 가져오기
        const inputValue = input.value;
        console.log(inputValue);

        // localStorage 저장
        localStorage.setItem('userid', inputValue);
        input.value = '';
    })
    // Get data 버튼 클릭 시
    btnGLD.addEventListener('click', () => {
        // 할 일 처리 -> 해당 키의 로컬 데이터가 있으면 가져오기
        const getData = localStorage.getItem('userid')
        // console.log(getData);
        if(!getData) {
            alert('해당 키로 로컬에 저장된 데이터가 없습니다.')
        }else{
            input.value = getData;
        }
    })
    btnRLD.addEventListener('click', () => {
        // 할 일 처리 -> 해당 키의 로컬 데이터 삭제
        const userData = localStorage.getItem('userid')
        alert(userData + '이(가) 삭제되었습니다.');
        if(userData) {
            localStorage.removeItem('userid');
        }
    })

}