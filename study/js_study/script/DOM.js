//DOM에 접근하기

//특정 요소 노드 취득
// querySelector, querySelectorAll
const button = document.querySelector('button');
const button1 = document.querySelectorAll('button');
console.log('button');
console.dir(button);
console.log('-----------');
console.log('button1');
console.log(button1);


// ID를 이용한 요소 노드 취득
const button2 = document.getElementById('btnID');
console.log('button2' + button2);
console.dir(button2);

// class를 이용한 요소 노드 취득
const button3 = document.getElementsByClassName('btnClass');

// 태그를 이용한 요소 노드 취득
const button4 = document.getElementsByTagName('button');
console.log('button4 ' + button4 );
console.dir(button4);

const button5 = document.getElementById('button');
const buttonChild = button5.childNodes;
console.log(buttonChild.length);  // 3
button5.appendChild(document.createElement('div'));
console.log(buttonChild.length); // 4
console.log(buttonChild);


const btn1 = document.querySelector('.styleBtn');
btn1.addEventListener('click', () => {
    const div = document.getElementById('d1');
    const bgColorBtn = document.getElementById('t1');
    div.style.backgroundColor = bgColorBtn.value;
})

const btn2 = document.querySelector('.addBtn');
btn2.addEventListener('click', () => {
    const list = document.querySelectorAll('li');
    list.forEach( i => {
        var li = document.createElement('li');
        li.textContent = 'list2';
        i.appendChild(li);
    });
})