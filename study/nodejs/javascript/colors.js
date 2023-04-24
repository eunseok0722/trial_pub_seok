// 객체를 이용하여 메서드를 생성한 경우
let Body = {
    setColor: function (color) {
        // document.querySelector('body').style.color = color;
        $('body').css('color', color);
    },
    setBackgroundColor: function (color) {
        // document.querySelector('body').style.backgroundColor = color;
        $('body').css('background-color', color)
    }
}
let Link = {
    setColor: function (color) {
        // const a = document.getElementsByTagName('a');
        // for (let i = 0; i < a.length; i++) {
        //     document.getElementsByTagName('a')[i].style.color = color;
        // }
        //     jQuery 사용
        $('a').css('color', color);
    }
}

/* function 안에서 this 는 전역스코프이기 때문에 파라미터로  this 값을 받아와야된다 */
function nightDayHandler(that) {

    // 객체를 사용하지 않고 함수를 사용할 경우
    // function linkSetColor(color) {
    //     for (let i = 0; i < a.length; i++) {
    //         a[i].style.color = color;
    //     }
    // }
    // function BodySetColor(color) {
    //     body.style.color = color;
    // }
    // function BodySetBackgroundColor(color) {
    //     body.style.backgroundColor = color;
    // }
    let night = function () {
        Body.setBackgroundColor('black');
        Body.setColor('white');
        // for (let i = 0; i < a.length; i++) {
        //     a[i].style.color = 'white';
        // }
        Link.setColor('white');
        document.getElementById('active').style.color = 'yellow';
        that.value = 'day';
        that.innerHTML = 'Light Mode';
    };

    let day = function () {
        Body.setBackgroundColor('white');
        Body.setColor('');
        // for (let i = 0; i < a.length; i++) {
        //     a[i].style.color = '';
        // }
        Link.setColor('');
        document.getElementById('active').style.color = '';
        that.value = 'night';
        that.innerHTML = 'Dark Mode';
    };

    // const that = document.querySelector('.dark-mode');

    // that.addEventListener('click', () => {
    const value = that.value;
    if (value === 'night') {
        night();

    } else if (value === 'day') {
        day();
    }
    // })
}