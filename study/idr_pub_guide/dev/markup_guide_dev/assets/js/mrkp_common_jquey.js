var mobile = false;

function page_resize() {
  // iframe 리사이징
  $('#pageSize').text($('#pageShow').width() + ' x ' + $('#pageShow').height());
}

$(document).ready(function () {
  if (mobile) {
    $('#bodyWrap').addClass('mobile');
    $('.iframe-wrap').addClass('portrait');
    $('#btnMobile').addClass('on');
  } else {
    $('#btnDesktop').addClass('on');
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

  $('#urls').html(output);
  $("#urls a[href='']").click(function (e) {
    e.preventDefault();
  });
  $('#btnReload').children().addClass('fa-spin');

  $('#urls a').each(function () {
    if (!$(this).attr('href') == '') {
      $(this).addClass('haslink');
    } else {
      $(this).addClass('nolink');
    }

    $('#urls a.haslink').each(function (idx) {
      var link = $(this).attr('href');
      var link_text = $(this).text();
      if (idx == 0) {
        $(this).addClass('on');
      }

      $(this).click(function (e) {
        e.preventDefault();
        $('#urls a').removeClass('on');
        $('#btnReload').children().addClass('fa-spin');
        $(this).addClass('on');
        $('#pageShow')
          .attr('src', link)
          .one('load', function () {
            $('#btnReload').children().removeClass('fa-spin');
          });

        $('#pageUrl').val('/' + link);
        $('#pageTitle, #pageTitle2').text(link_text);
      });
    });
  });

  var first_value = $('#urls a.haslink').first().attr('href');
  $('#pageTitle, #pageTitle2').text($('#urls a.haslink').first().text());
  $('#pageLeng').text('(' + $('#urls li a.haslink').length + ' pages)');

  $('#pageUrl').val('/' + first_value);
  $('#pageUrl').click(function () {
    $(this).select();
  });

  $('#pageShow')
    .attr('src', $('#urls a.haslink:first').attr('href'))
    .one('load', function () {
      $('#btnReload').children().removeClass('fa-spin');
    });

  // clickable
  $('.rotate').click(function () {
    if ($('.iframe-wrap').hasClass('portrait')) {
      $('.iframe-wrap').addClass('landscape').removeClass('ge_sizeportrait');
    } else if ($('.iframe-wrap').hasClass('landscape')) {
      $('.iframe-wrap').addClass('portrait').removeClass('landscape');
    }
  });
  $('#btnExternal').click(function () {
    window.open('.' + $('#pageUrl').val());
  });
  $('#btnReload').click(function () {
    $(this).children().addClass('fa-spin');
    $('#pageShow')
      .attr('src', '.' + $('#pageUrl').val())
      .one('load', function () {
        $('#btnReload').children().removeClass('fa-spin');
      });
  });
  $('#btnMobile').click(function () {
    $(this).addClass('on');
    $('#btnDesktop').removeClass('on');
    $('body').addClass('mobile');
    $('.iframe-wrap').addClass('portrait');
  });
  $('#btnDesktop').click(function () {
    $(this).addClass('on');
    $('#btnMobile').removeClass('on');
    $('body').removeClass('mobile');
    $('.iframe-wrap').removeClass('portrait landscape');
  });
});

$(window).bind('load resize', function () {
  if (!$('#bodyWrap').hasClass('mobile')) {
    page_resize(); // 모바일인 경우 비활성화
  }
});
