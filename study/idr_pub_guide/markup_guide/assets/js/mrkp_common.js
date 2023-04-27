"use strict";

var mobile = false;
var pageShow = document.querySelector('#pageShow');
var bodyWrap = document.querySelector('#bodyWrap');
function pageResize() {
  var pageSize = document.querySelector('#pageSize');
  // iframe 리사이징
  pageSize.textContent = pageShow.offsetWidth + 'x' + pageShow.offsetHeight;
}
document.addEventListener('DOMContentLoaded', function () {
  var iframeWrap = document.querySelector('.iframe-wrap');
  var btnMobile = document.querySelector('#btnMobile');
  var btnDesktop = document.querySelector('#btnDesktop');
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
    output += '<li>' + "<a href='" + page_list.pages[i].url + "'>" + page_list.pages[i].title + '</a>' + '</li>';
  }
  output += '</ul>';
  var urls = document.querySelector('#urls');
  urls.innerHTML = output;
  var urlAnchor = document.querySelectorAll('#urls a');
  var btnReload = document.querySelector('#btnReload');
  for (var _i = 0; _i < urlAnchor.length; _i++) {
    urlAnchor[_i].addEventListener('click', function (e) {
      e.preventDefault();
    });
    if (urlAnchor[_i].getAttribute('href') == '') {
      urlAnchor[_i].classList.add('nolink');
    } else {
      urlAnchor[_i].classList.add('haslink');
    }
  }
  btnReload.firstChild.classList.add('fa-spin');
  var hasLink = document.querySelectorAll('#urls a.haslink');
  var pageUrl = document.querySelector('#pageUrl');
  var pageTitle = document.querySelector('#pageTitle');
  var pageTitle2 = document.querySelector('#pageTitle2');
  var _loop = function _loop(_i2) {
    var link = hasLink[_i2].getAttribute('href');
    var link_text = hasLink[_i2].textContent;
    if (_i2 === 0) {
      hasLink[_i2].classList.add('on');
    }
    hasLink[_i2].addEventListener('click', function (e) {
      e.preventDefault();
      btnReload.firstChild.classList.add('fa-spin');
      for (var x = 0; x < hasLink.length; x++) {
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
  };
  for (var _i2 = 0; _i2 < hasLink.length; _i2++) {
    _loop(_i2);
  }
  var pageLeng = document.querySelector('#pageLeng');
  var firstValue = hasLink[0];
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
  var rotate = document.querySelector('.rotate');
  var btnExternal = document.querySelector('#btnExternal');
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