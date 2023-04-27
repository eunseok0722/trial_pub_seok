"use strict";

(function () {
  // SyntaxHighlighter.config.bloggerMode = true;
  // SyntaxHighlighter.config.stripBrs = true;
  // SyntaxHighlighter.config.strings.expandSource='코드표시';
  // SyntaxHighlighter.defaults['html-script'] = true;
  SyntaxHighlighter.defaults['class-name'] = 'sh-wrap';
  SyntaxHighlighter.defaults['toolbar'] = false;
  SyntaxHighlighter.defaults['gutter'] = true;
  SyntaxHighlighter.defaults['tab-size'] = 2;
  SyntaxHighlighter.defaults['first-line'] = 1;
  SyntaxHighlighter.defaults['auto-links'] = true;
  SyntaxHighlighter.defaults['collapse'] = false;
  SyntaxHighlighter.all();
})();

$(window).bind('load resize', function () {
  /*
  $('<a href="#none" class="code-copy">소스복사</a>').insertBefore('.gw-code-wrap .sh-wrap'); //버튼생성
  $('.code-copy').click(function () {
      var tempCode = $(this).parent().find('.sh-wrap').html();
      alert(tempCode);
  });
  */
  // prettyPrint();
});