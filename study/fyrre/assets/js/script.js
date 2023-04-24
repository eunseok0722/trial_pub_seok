'use strict';

const MobileNavBtn = document.getElementsByClassName('nav-mobile-btn');
const MobileNav = document.getElementsByClassName('header-mobile');


for (let i = 0; i < MobileNavBtn.length; i++) {
    MobileNavBtn[i].addEventListener('click', () => {
        // console.log('click')
        this.classList.add('active');
        for (let j = 0; j < MobileNav.length; j++ ) {
            MobileNav[j].classList.add('active');
        }
    })
}
