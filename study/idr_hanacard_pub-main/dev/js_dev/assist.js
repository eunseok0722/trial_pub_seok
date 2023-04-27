/*** assist.js ***/
function setAuthClass(authVal) {
  $('.auth_wrap').addClass(authVal);
}

function activeTabTy(targetTabs, idx) {
  $(targetTabs + ' ul li').eq(idx).addClass('on');
}

;(function ($) {
  console.log("assist.js start");
})(jQuery);