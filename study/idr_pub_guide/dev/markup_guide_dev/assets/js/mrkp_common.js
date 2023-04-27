var mobile = false;

const pageShow = document.querySelector('#pageShow');
const bodyWrap = document.querySelector('#bodyWrap');

function pageResize() {
  const pageSize = document.querySelector('#pageSize');
  // iframe 리사이징
  pageSize.textContent = pageShow.offsetWidth + 'x' + pageShow.offsetHeight;
}

document.addEventListener('DOMContentLoaded', function () {
  const iframeWrap = document.querySelector('.iframe-wrap');
  const btnMobile = document.querySelector('#btnMobile');
  const btnDesktop = document.querySelector('#btnDesktop');
  if (mobile) {
    bodyWrap.classList.add('mobile');
    iframeWrap.classList.add('portrait');
    btnMobile.classList.add('on');
  } else {
    btnDesktop.classList.add('on');
  }

  // first call
  var output = '<ul>';
  for (var i in page_list.pages) {
    output +=
      '<li>' +
      "<a href='" +
      page_list.pages[i].url +
      "'>" +
      page_list.pages[i].title +
      '</a>' +
      '</li>';
  }
  output += '</ul>';

  const urls = document.querySelector('#urls');

  urls.innerHTML = output;

  const urlAnchor = document.querySelectorAll('#urls a');
  const btnReload = document.querySelector('#btnReload');
  for (let i = 0; i < urlAnchor.length; i++) {
    urlAnchor[i].addEventListener('click', function (e) {
      e.preventDefault();
    });
    if (urlAnchor[i].getAttribute('href') == '') {
      urlAnchor[i].classList.add('nolink');
    } else {
      urlAnchor[i].classList.add('haslink');
    }
  }
  btnReload.firstChild.classList.add('fa-spin');
  const hasLink = document.querySelectorAll('#urls a.haslink');
  const pageUrl = document.querySelector('#pageUrl');
  const pageTitle = document.querySelector('#pageTitle');
  const pageTitle2 = document.querySelector('#pageTitle2');
  for (let i = 0; i < hasLink.length; i++) {
    const link = hasLink[i].getAttribute('href');
    const link_text = hasLink[i].textContent;
    if (i === 0) {
      hasLink[i].classList.add('on');
    }
    hasLink[i].addEventListener('click', function (e) {
      e.preventDefault();
      btnReload.firstChild.classList.add('fa-spin');
      for (let x = 0; x < hasLink.length; x++) {
        hasLink[x].classList.remove('on');
      }
      e.target.classList.add('on');
      pageShow.setAttribute('src', link);
      pageShow.addEventListener('load', function () {
        btnReload.firstChild.classList.remove('fa-spin');
      });
      pageUrl.value = '/' + link;
      pageTitle.textContent = link_text;
      pageTitle2.textContent = link_text;
    });
  }
  const pageLeng = document.querySelector('#pageLeng');
  const firstValue = hasLink[0];
  pageTitle.textContent = firstValue.textContent;
  pageTitle2.textContent = firstValue.textContent;
  pageLeng.textContent = '(' + hasLink.length + ' pages)';

  pageUrl.value = '/' + firstValue.getAttribute('href');
  pageUrl.addEventListener('click', function () {
    pageUrl.select();
  });

  pageShow.setAttribute('src', firstValue.getAttribute('href'));
  pageShow.addEventListener('load', function () {
    btnReload.firstChild.classList.remove('fa-spin');
  });

  // clickable
  const rotate = document.querySelector('.rotate');
  const btnExternal = document.querySelector('#btnExternal');
  rotate.addEventListener('click', function () {
    if (iframeWrap.classList.contains('portrait')) {
      iframeWrap.classList.add('landscape');
      iframeWrap.classList.remove('portrait');
    } else if (iframeWrap.classList.contains('landscape')) {
      iframeWrap.classList.add('portrait');
      iframeWrap.classList.remove('landscape');
    }
  });
  btnExternal.addEventListener('click', function () {
    window.open('.' + pageUrl.value);
  });
  btnReload.addEventListener('click', function () {
    btnReload.firstChild.classList.add('fa-spin');
    pageShow.setAttribute('src', '.' + pageUrl.value);
    pageShow.addEventListener('load', function () {
      btnReload.firstChild.classList.remove('fa-spin');
    });
  });
  btnMobile.addEventListener('click', function () {
    btnMobile.classList.add('on');
    btnDesktop.classList.remove('on');
    document.body.classList.add('mobile');
    iframeWrap.classList.add('portrait');
    iframeWrap.classList.remove('landscape');
  });
  btnDesktop.addEventListener('click', function () {
    btnDesktop.classList.add('on');
    btnMobile.classList.remove('on');
    document.body.classList.remove('mobile');
    iframeWrap.classList.remove('portrait');
    iframeWrap.classList.remove('landscape');
  });
});

window.addEventListener('load', resizeActive);
window.addEventListener('resize', resizeActive);

function resizeActive() {
  if (!bodyWrap.classList.contains('mobile')) {
    pageResize(); // 모바일인 경우 비활성화
  }
}
