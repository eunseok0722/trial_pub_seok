/* Skip navi*/
jQuery(function($){
  $('a.skip_area').click(function(){
    $(this).css('position', 'absolute').css('top', '-60px');
    $('html, body').stop().animate({scrollTop:0}, 550);
  });
  //var container = $('section#container').html();
  //$('section#container').replaceWith('<div id="container">'+ container +'</div>');

  $('section#container').wrapInner('<div id="container"></div>');
  $('section#container div#container').unwrap();

});

function formTemp(){
  jQuery(function($){
    if($("input[type='checkbox']").length > 0){
      $("input[type='checkbox']").ezMark(); //checkbox
    }
    if($("input[type='radio']").length > 0){
      $("input[type='radio']").ezMark(); //radio
    }

    $("input[type='checkbox'], input[type='radio']").focusin(function(){
      $(this).parent().addClass('ez_focus');
    });
    $("input[type='checkbox'], input[type='radio']").focusout(function(){
      $(this).parent().removeClass('ez_focus');
    });
    $('.ez-radio div input, .ez-checkbox div input').unwrap();
    $('.radio_box label em, .radio_box02 label em, .radio_box03 label em').remove();
    $('.radio_box label, .radio_box02 label, .radio_box03 label').append('<em></em>');

    $("input[type='checkbox']").each(function(){
      if($(this).hasClass('hint_chk')){
        $(this).parent().addClass('hint_chk');
      }
    });
  });
}

function selectTemp(){
  jQuery(function($){
    $('select').selectBox();
  });
}

/* Form */
jQuery(function($){
  formTemp();
  //selectTemp()
  $('select').selectBox();
});


/** GNB **/
jQuery(function($){
  $('header').append('<span class=\"header_bg\"></span>');
  $('#wrap').prepend('<span class=\"nav_dims\"></span>');
  $('.gnb_nav').wrap('<div class=\"gnb_nav_wrap\"></div>')

  $('.gnb_nav a.dep_m').bind('mouseover focusin',function(){
    $('.nav_dims').addClass('on');
    $('.gnb_nav li').removeClass('over');
    $('.gnb_nav .dep2').removeClass('act');
    $(this).closest('li').addClass('over');
    $(this).closest('li').find('.dep2').addClass('act');

    var gnbDepH = $(this).closest('li').find('.dep2').innerHeight();
    var gnbHeaderH = gnbDepH + 110;
    $(this).closest('li').find('.li').css('height',gnbDepH);
    $('.header_bg').css('height', gnbDepH);
    $('header').css('height', gnbHeaderH);
    $('#gnb').css('height', gnbHeaderH - 9);

    var s = $(this).closest('li').find('.dep2 .li').length
    if( s < 4){
      $(this).closest('li').find('.dep2').addClass('len');
    } else if (s > 4){
      $(this).closest('li').find('.dep2').addClass('len_max');
    }
  });
  $('header').mouseleave(function(){
    gnbClose();
  });
  $('.util_list a, .gnb_right_nav a').focusin(function(){
    $('html, body').stop().animate({scrollTop:$('#wrap').offset().top}, 400);
    gnbClose();
  });
  $('.processing').append('<span class=\"bg\"></span>');
  $('.loading').append('<span class=\"bg\"></span>');

  $('.btn_banner_link').closest('li').addClass('bt');
});
function gnbClose(){
  jQuery(function($){
    $('.nav_dims').removeClass('on');
    $('.gnb_nav_wrap .hit_st, .gnb_nav_wrap .hit_ed').removeClass('on');
    $('.header_bg').css('height', 0);
    $('header').css('height', 110);
    $('.gnb_nav li').removeClass('over');
    $('.gnb_nav .dep2').removeClass('act');
    $('#gnb').css('height', 100);
  });
}


/* sticky_nav */
jQuery(function($){
  setTimeout(function() {
    $('#tier_banner').addClass('on');
  }, 700);

  $('.tier_btn').click(function(){
    $('#tier_banner').removeClass('on');
    setTimeout(function() {
      $('#tier_banner').hide();
    }, 500);
    return false;
  });
});

function allMenu(){
  jQuery(function($){
    $('#all_menu').popup('show');
  });
  return false;
}

/** 전체메뉴 **/
jQuery(function($){
  //전체메뉴 탭
  $('.tab_ty .all_menu_tab li.on a').attr('title', '현재 선택 탭');
  $('.tab_ty .all_menu_tab a').click(function(){
    var i = $(this).parent('li').index();
    $(this).parent('li').siblings('li').removeClass('on').find('a').removeAttr('title');
    $(this).parent('li').addClass('on').find('a').attr('title', '현재 선택 탭');
    $(this).closest('.all_menu').children('.all_menu_list').find('.on').removeClass('on');
    $(this).closest('.all_menu').children('.all_menu_list').find('.dep1').eq(i).addClass('on');
    return false;
  });
  //dep3
  $('.all_menu_list .dep3 > a').click(function(){
    var a = $(this).parent('.dep3');
    if(a.hasClass('on')){
      $(this).text('메뉴 열기');
      a.removeClass('on');
    }else{
      $(this).text('메뉴 닫기');
      a.addClass('on');
    }
    return false;
  });
});



/* Layout */
jQuery(function($){

  $(window).resize (resizeBox).resize();
  function resizeBox(){
    function scrollEvent() {
      locS =  $(window).scrollTop();
      if(locS > 110){
        $('.breadcrumb, #container, .search_all_box').addClass('on');
      }
      else{
        $('.breadcrumb, #container, .search_all_box').removeClass('on');
      }
      if(locS > 47){
        $('header, .mc_chk .search_all_box').addClass('on');
      }
      else{
        $('header, .mc_chk .search_all_box').removeClass('on');
      }
      if(locS > 146){
        $('.sticky_wrap').addClass('on');
      }
      else{
        $('.sticky_wrap').removeClass('on');
      }

      if(locS > 462){
        $('.main').removeClass('def').addClass('fix');
        $('.main header').removeClass('on');
      }
      else{
        $('.main').removeClass('fix').addClass('def');
        $('.main header').removeClass('on');
      }

      if(locS > 30){
        $('.win_wrap #container').addClass('on');
      }
      else{
        $('.win_wrap #container').removeClass('on');
      }

      /* 카드비교 */
      locH = $('body').height();
      topH = $(window).scrollTop() + $(window).height() + 170;

      if(topH < locH){
        $('.card_under').removeClass('act');
        $('.btn_top').removeClass('act');
      } else{
        $('.card_under').addClass('act');
        $('.btn_top').addClass('act');
      }
    }
    $(window).scroll(function() {
      scrollEvent();
    });
    $(window).resize(function() {
      scrollEvent();
    });
    $('.btn_top').css('right', $(window).width()/2 - 620);
  }


  /* BG Type : 승인신청 */
  $('.search_area').closest('.cont_area').addClass('bg');


  /* Breadcrumb */
  $('.breadcrumb .li .dep ul').css('min-width', $('.breadcrumb .li.act .link').innerWidth());
  $('.breadcrumb .link').click(function(){
    if($(this).closest('.li').hasClass('act')){
      $(this).closest('.li').removeClass('act');
      $(this).closest('.li').find('.link em').text('메뉴열기');
    }else{
      $('.breadcrumb .li').removeClass('act');
      $(this).closest('.li').addClass('act');
      $(this).closest('.li').find('.dep ul').css('min-width', $(this).closest('.li').find('.link').innerWidth() +20);
      $(this).closest('.li').find('.link em').text('메뉴닫기');
    }
    return false;
  });
  $('.breadcrumb .dep').bind('mouseleave',function(){
    $('.breadcrumb .li').removeClass('act');
    $('.breadcrumb .link em').text('메뉴열기');
  });
  $('.breadcrumb .li a, #container a, #container input, #container select').bind('focusin',function(){
    $('.breadcrumb .li').removeClass('act');
    $('.breadcrumb .link em').text('메뉴열기');
  });
  $('.breadcrumb .dep a').bind('focusin',function(){
    $(this).closest('.li').addClass('act');
    $(this).closest('.li').find('.dep ul').css('min-width', $(this).closest('.li').find('.link').innerWidth() +20);
    $(this).closest('.li').find('.link em').text('메뉴닫기');
  });

  /* Family site */
  $('.btn_familysite').click(function(){
    $(this).css('display', 'none');
    $('.btn_familysite_cl').css('display', 'block');
    $('.familysite_area').css('display', 'block').stop().animate({height:$('.familysite_area ul').height() + 20},300);
    $('.familysite_area li a').eq(0).focus();
    return false;
  });
  $('.btn_familysite_cl').click(function(){
    $(this).css('display', 'none');
    $('.btn_familysite').css('display', 'block');
    $('.familysite_area').stop().animate({height:0},300);
    setTimeout(function() {
      $('.familysite_area').css('display', 'none');
    }, 500);
    return false;
  });
  $('.familysite_area li:first-child a').keydown(function(e){
    var isShift = window.event.shiftKey ? true : false;
    if(isShift && (e.keyCode == 9)){
      $('.btn_familysite_cl').focus();
      return false;
    }
  });
  $('.btn_familysite_cl').keydown(function(e){
    var isShift = window.event.shiftKey ? true : false;
    if(event.keyCode == 9){
      $('.familysite_area li a').eq(0).focus();
      return false;
    }
  });

  /* btn_top */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.btn_top').css('display', 'block');
      $('.btn_top').stop().animate({opacity:1}, 300);
    } else {
      $('.btn_top').css('display', 'none');
      $('.btn_top').stop().animate({opacity:0}, 250);
    }
  });
  $('.btn_top').click(function(){;
    $('html, body').stop().animate({scrollTop:$('#wrap').offset().top}, 800);
    return false;
  });
});


/* Step_ty */
jQuery(function($){
  /*var stepNum = $('.step_ty li.on').index();
  for(var i = 0 ; i <= stepNum -1 ; i++) {
    $('.step_ty li').eq(i).addClass('off');
  }*/
  /* 17.07.25 접근성 수정 */
  //$('.step_ty li.on').find('i').text('현재단계');
  //$('.step_ty02 li.on').find('i').text('현재단계');
});


/* Scroll : 조회 */
jQuery(function($){
  //$('.scrollbar-outer').scrollbar();
  $('.scroll-content').attr('tabindex', 0);
  $('.search_chk .on a').attr('title','현재 선택됨');
  $('.search_chk a').click(function(){
    $(this).closest('.search_chk').find('li').removeClass('on');
    $(this).closest('li').addClass('on');
    $(this).parent().siblings().find('a').removeAttr('title');
    $(this).attr('title','현재 선택됨');
    //return false;
  });
  /* //17.08.01 접근성 수정 */
  /*
  $('.search_area02 .list .btn a').click(function(){
    $(this).closest('.search_area02').find('li').removeClass('on');
    $(this).closest('li').addClass('on');
    return false;
  });*/
  /*
  $('.btn_direct').click(function(){
    $(this).attr('checked', 'checked').parent().addClass('ez-selected').parent('li').addClass('chk_on');
    $(this).closest('li').siblings('li').removeClass('chk_on').children().removeClass('ez-selected');
    $(this).closest('.search_area02').find('.select_date').eq(0).focus();
    $(this).closest('.direct_area').find('.select_date').eq(0).focus();
    return false;
  });
  */

  //일선택
  $('.search_area02 .btn_direct').change(function(){
    if(!$(this).parent().hasClass('ez-selected')){
      $(this).closest('.search_area02').find('.select_date').eq(0).focus();
      return false;
    }
  });

  //월선택
  $('.month_area .radio_box02 input').change(function(){
    if(!$(this).parent().hasClass('ez-selected')){
      if($(this).hasClass('btn_direct')){
        $(this).closest('.month_area').find('.select_month').eq(0).focus();
      }else{
        $(this).closest('.month_area').find('.ly_cal ').removeClass('on');
      }
    }
  });
  $('.ly_cal').bind('mouseleave', function(){
    $('.ly_cal').removeClass('on');
  })

});
function scrollbar(){
  jQuery(function($){
    var ieCheck7 = navigator.userAgent.toLocaleLowerCase().indexOf("msie 7.0");
    var ieCheck = navigator.userAgent.toLocaleLowerCase().indexOf("msie 8.0");
    if(ieCheck > -1) {
      //$('.modal_wrap .scrollbar-outer').unwrap();
      //scrollbar();
      $('.win_pop .scrollbar-outer').scrollbar();
    } else if(ieCheck7 > -1) {
      $('.win_pop .scrollbar-outer').scrollbar();
    } else{
      $('.scrollbar-outer').scrollbar();
      $('.scroll-content').attr('tabindex', 0);
    }
  });
}


/* Tooltip */
jQuery(function($){
  scrollbar();
  $('.key_info').closest('.info_s').addClass('act_a');
  $('.btn_tip').bind('mouseover focusin',function(){
    $('.tooltip_ty').removeClass('on');
    $(this).closest('.tooltip_ty').addClass('on');
    return false;
  });
  $('.tooltip_area').prepend('<span class=\"tolltip_hit hit_t\"></span>');
  $('.tooltip_area').append('<span class=\"tolltip_hit hit_l\"></span><span class=\"tolltip_hit hit_r\"></span><span class=\"tolltip_hit hit_b\"></span>');
  $('.hit_b, .tooltip_cont').attr('tabindex', 0);

  $('.btn_tip, .hit_b').bind('focusin',function(){
    $('.tooltip_cont').focus();
  });
  $('.tolltip_hit').bind('mouseover',function(){
    $('.tooltip_ty').removeClass('on')
  });
  $('.btn_tooltip_close').bind('click',function(){
    $('.tooltip_ty').removeClass('on');
    return false;
  });
});

/* Calendar */
function calMonth(){
  jQuery(function($){
    $('.ly_cal .btn_close').text('달력 레이어팝업 닫기');
    $('.ly_cal_year').attr('tabindex', 0);
    $('.calendar_ty .btn_month').click(function(e){
      e.preventDefault();
      $('.ly_cal').addClass('on');
      $('.ly_cal_year').focus();
    });
    $('.ly_cal .btn_close').click(function(e){
      e.preventDefault();
      $(this).parent().removeClass('on');
      $('.calendar_ty .btn_month').focus();
    });
    $('.ly_cal .btn_close').keydown(function(e){
      if(event.keyCode == 9){
        $('.ly_cal_year').focus();
        return false;
      }
    });
    $('.ly_cal_year').keydown(function(e){
      var isShift = window.event.shiftKey ? true : false;
      if(isShift && (e.keyCode == 9)){
        $('.ly_cal .btn_close').focus();
        return false;
      }
    });

    //컨텐츠조회 : 월 달력
    $('.select_month').bind('focusin ',function(){
      var h = $(this).position().left;
      $('.ly_cal').removeClass('on');
      $(this).parent().find('.ly_cal').addClass('on');
      if($(this).closest('.list').parent('ul').hasClass('center')){
        $(this).parent().find('.ly_cal').css('left', h + 126);
      }else{
        $(this).parent().find('.ly_cal').css('left', h + 132);
      }
    });

  });
}
jQuery(function($){
  calMonth();
});



jQuery(function($){
  /* tab Nav */
  $.fn.tabNav = function(){
    $.each(this, function(i,v){
      $(v).closest('.tab_nav').find('a').removeClass('on');
      $(v).addClass('on');
      var s = $(v).attr("href");
      $(s).parent().find('.tab_cont').removeClass('on');
      $(s).addClass('on');
    });
  };
  $.fn.tabNav02 = function(){
    $.each(this, function(i,v){
      $(v).closest('.tab_nav02').find('li').removeClass('on');
      $(v).parent().addClass('on');
      var s = $(v).attr("href");
      //$('.tab_cont').removeClass('on');
      $(s).parent().find('.tab_cont').removeClass('on');
      $(s).addClass('on');
      $(s + 's').addClass('on');
    });
  };
  $.fn.tabLink = function(){
    $.each(this, function(i,v){
      //$('.card_info_tab').find('li').removeClass('on');
      //var num = $(this).closest('li').index() + 1;
      //$('.card_info_tab li').eq(num).addClass('on'); 탭 활성화 처리 개발에서 처리
      var s = $(v).attr("href");
      $(s).parent().find('.tab_cont').removeClass('on');
      $(s).addClass('on');
      $(s + 's').addClass('on');
    });
  };
  $.fn.tabNav03 = function(){
    $.each(this, function(i,v){
      $(v).closest('.tab_nav03').find('li').removeClass('on');
      $(v).parent('li').addClass('on');
      var s = $(v).attr("href");
      $(s).siblings('.tab_cont').removeClass('on');
      $(s).addClass('on');
    });
  };

  /* state_ty */
  $.fn.state_ty = function(){
    $.each(this, function(){
      var tar = $(this).closest('.list');
      var foldingChk = tar.hasClass('on');
      //alert('aaa');
      if (foldingChk){
        tar.removeClass('on');
        tar.find('em.blind').text('상세내용보기');
      } else {
        if(!$(this).hasClass('zero')){
          tar.siblings('.list').removeClass('on');
          tar.addClass('on');
          tar.siblings('.list').find('em.blind').text('상세내용보기');
        }
        tar.find('em.blind').text('상세내용닫기');
      }
      return false;
    });
  };

  /* accordian_ty */
  $.fn.accordian_ty = function(){
    var tar = $(this).closest('.list');
    //var tarHeight = 68;
    var tarHeight = $(this).height();
    var foldingChk = tar.hasClass('on');
    /*
    $('.accordian_ty .list').each (function(){
      $(this).removeClass('on');
      $('.accordian_ty .list').css('height', tarHeight);
    });
    */
    if (foldingChk){
      tar.removeClass('on');
      tar.css('height', tarHeight);
      tar.find('em.blind').text('상세내용보기');
    } else {
      if(!tar.parent('ul').hasClass('ty02') && !tar.parent('ul').hasClass('accordian_ty03') && !tar.parent('ul').hasClass('accordian_ty04') && !tar.parent('ul').hasClass('open') ){
        tar.siblings('.list').height(tarHeight).removeClass('on');
        tar.siblings('.list').find('em.blind').text('상세내용보기');
      }
      tar.addClass('on');
      tar.css('height', tar.find('.view').innerHeight() + tarHeight);
      tar.find('em.blind').text('상세내용닫기');
    }
  };

  /* info_box */
  $.fn.info_box = function(){
    var tar = $(this).closest('.info_box');
    var foldingChk = tar.hasClass('on');
    /*
    $('.info_box').each (function(){
      $(this).removeClass('on');
    });
    */
    if (foldingChk){
      tar.removeClass('on');
      tar.find('dt > a em.blind').text('상세내용보기');
    } else {
      tar.addClass('on');
      tar.find('dt > a em.blind').text('상세내용닫기');
    }
  };

  $('.info_box dt > a').append('<em class=\"blind\">상세내용보기</em>');
  $('.info_box.on dt > a em.blind').text('상세내용닫기');
  $('.info_box dt > a').click(function(){
    $(this).info_box();
    return false;
  });

  /* input Err */
  $.fn.hintTxt = function(){
    $.each(this, function(i,v){
      $(v).addClass('hint_txt');
      $(v).wrap('<div class=\"hint_txt_box\"></div>');
      s = $(v).data("text");
      $(v).closest('.hint_txt_box').append('<div class=\"hint_txt_t\">' + s + '</div>');
    });
  };
  /* input Err Close */
  $.fn.hintTxtOut = function(){
    $.each(this, function(i,v){
      $(v).removeClass('hint_txt');
      $(v).removeData('text');
      $(v).closest('.hint_txt_box').find('.hint_txt_t').remove();
      $(v).unwrap();

    });
  };

  $.fn.popOpen = function(){
    $(this).bind('click', function(e){
      var s = $(this).attr("href");
      $(s).popup();
    });
    return this;
  };
  $('.btn_pop').popOpen();
});

/* 하단 컨텐츠 View */
function NextStepOpen(){
  jQuery(function($){
    $('.next_step_cont').addClass('on');
    $('html, body').stop().animate({scrollTop:$('.next_step_cont').offset().top - 200}, 400);
  });
}

/* 이용금액결제 */
jQuery(function($){
  $.fn.b_chk_all = function(){
    $(this).closest('.acc_list').find('.b_chk_part').removeClass('btn_ty05').removeClass('over');
    $(this).toggleClass('over');
    if($(this).hasClass('over')){
      $(this).closest('.acc_list').addClass('act');
      $(this).addClass('btn_ty05');
      $(this).closest('.acc_list').find('.state_head .tit').text('전액 선결제');
    } else if($(this).closest('.acc_list').hasClass('act')){
      $(this).removeClass('btn_ty05');
      $(this).closest('.acc_list').removeClass('act');
    } else{
      $(this).removeClass('btn_ty05');
    }
    $(this).closest('.acc_list').find('.state .s2').addClass('on');
    $(this).closest('.acc_list').find('.state .s3').removeClass('on');
  };

  $.fn.b_chk_part = function(){
    $(this).closest('.acc_list').find('.b_chk_all').removeClass('btn_ty05').removeClass('over');
    $(this).toggleClass('over');
    if($(this).hasClass('over')){
      $(this).closest('.acc_list').addClass('act');
      $(this).addClass('btn_ty05');
      $(this).closest('.acc_list').find('.state_head .tit').text('부분 선결제');
    } else if($(this).closest('.acc_list').hasClass('act')){
      $(this).removeClass('btn_ty05');
      $(this).closest('.acc_list').removeClass('act');
    } else{
      $(this).removeClass('btn_ty05');
    }
    $(this).closest('.acc_list').find('.state .s2').removeClass('on');
    $(this).closest('.acc_list').find('.state .s3').addClass('on');
  };
  $('.accordian_ty02 .b_chk_all').click(function(){
    $(this).b_chk_all();
    return false;
  });
  $('.accordian_ty02 .b_chk_part').click(function(){
    $(this).b_chk_part();
    return false;
  });
});


/*** 카드 ***/
/* 카드신청 */
/* 카드 1dep */
function cardApp(val){
  jQuery(function($){
    $('.card_step li, .card_app_info .list, .card_app_view .list').removeClass('on');
    $('.card_step li').eq(val - 1).addClass('on');
    $('#cs_info0' + val).addClass('on');
    $('#cs_cont0' + val).addClass('on');
    if(val == 3){
      $('.card_app_area').addClass('last');
      $('.card_app_comp').css('height', $('.card_app_info').innerHeight());
    }
    $('.card_app').focus();
    $('html, body').stop().animate({scrollTop:$('#wrap').offset().top  + 140 }, 300);
  });
  return false;
}

/* 카드 1dep_1 카드정보작성 */
function cardSt1(val){
  jQuery(function($){
    $('.card_st01 .card_aco').removeClass('on');
    $('.card_st01 .card_aco').eq(val - 1).addClass('on');
    $('.card_st01 .card_aco').removeClass('mod');

    var stepNum = $('.card_st01 .card_aco.on').index();
    for(var i = 0 ; i <= stepNum -2 ; i++) {
      $('.card_st01 .card_aco').eq(i).addClass('off');
    }
    $('.card_st01 .card_aco').eq(val - 1).removeClass('off');
    $('html, body').stop().animate({scrollTop:$('#wrap').offset().top  + 140}, 300);
  });
  return false;
}
function cardStMod1(val){
  jQuery(function($){
    cardSt1(val);
    $('.card_st01 .card_aco').eq(val - 1).removeClass('off');
    return false;
  });
}

/* 카드 1dep_2 신청서작성 */
function cardSt2(val){
  jQuery(function($){
    cardTable();
    $('.card_st02 .card_aco').removeClass('on');
    $('.card_st02 .card_aco').eq(val - 1).addClass('on');

    var stepNum = $('.card_st02 .card_aco.on').index();
    for(var i = 0 ; i <= stepNum -2 ; i++) {
      $('.card_st02 .card_aco').eq(i).addClass('off');
    }
    $('.card_st02 .card_aco').eq(val - 1).removeClass('off');
    if($('.has_group').length > 0){
      $('html, body').stop().animate({scrollTop:$('#wrap').offset().top  + 700 }, 300);
    }else{
      $('html, body').stop().animate({scrollTop:$('#wrap').offset().top  + 140 }, 300);
    }

  });
  return false;
}
function cardStMod2(val){
  cardSt2(val);
  cardTable()
  jQuery(function($){
    var modNum = val
    var modNumLen = $('.card_st02 .card_aco').length;
    for(var i = modNum; i <= modNumLen; i++) {
      $('.card_st02 .card_aco').eq(i).removeClass('off');
    }
  });
  return false;
}

/** cardTable **/
function cardTable(){
  jQuery(function($){
    $('.board_ty03 td').each(function(index){
      if($(this).innerHeight() > 95){
        $(this).closest('tr').find('th').addClass('td_h');
      }
    });
  });
}


/* 모바일카드 신청서 작성 */
function mobileSt2(val){
  jQuery(function($){
    $('.mobile_st .mobile_aco').removeClass('on');
    $('.mobile_st .mobile_aco').eq(val - 1).addClass('on');

    var stepNum = $('.mobile_st .mobile_aco.on').index();
    for(var i = 0 ; i <= stepNum -2 ; i++) {
      $('.mobile_st .mobile_aco').eq(i).addClass('off');
    }
    $('.mobile_st .mobile_aco').eq(val - 1).removeClass('off');
    $('html, body').stop().animate({scrollTop:$('#wrap').offset().top  + 140 }, 300);
  });
  return false;
}
function mobileStMod2(val){
  mobileSt2(val);
  jQuery(function($){
    //$('.mobile_st .mobile').eq(val - 1).removeClass('off');
    var modNum = val
    var modNumLen = $('.mobile_st .mobile_aco').length;
    for(var i = modNum; i <= modNumLen; i++) {
      $('.mobile_st .mobile_aco').eq(i).removeClass('off');
    }
  });
  return false;
}

jQuery(function($){
  cardTable();

  $('.card_app_info .info .img img').attr('alt', '');
  $('.card_app_area.last .card_app_comp').css('height', $('.card_app_info').innerHeight());
  $('.card_app_area.last02 .card_app_view').css('height', $('.card_app_info').innerHeight() -2);
  $('.card_app_area.last02 .card_app_comp').css('height', $('.card_app_info').innerHeight() -2);

  /* 카드메인 : Slide */
  $.fn.card_slide = function(){
    $.each(this, function(i,v){
      $(v).find('.card_slide_area .li').each(function(i) {
        $(this).addClass('itm'+i);
        $('.card_slide_area .li').removeClass('selected').find('.c_target').attr('tabindex', -1);
        $('.card_slide_area .li.itm0').addClass('selected').find('.c_target').attr('tabindex', 0);
        $('.card_slide_area .li.itm1').addClass('selected').find('.c_target').attr('tabindex', 0);
        $('.card_slide_area .li.itm2').addClass('selected').find('.c_target').attr('tabindex', 0);
      });
      $prev = $(v).find('.card_slide_prev');
      $next = $(v).find('.card_slide_next');
      //$pagin = $(v).find('.card_pagn');
      $(v).find('.card_slide_area').carouFredSel({
        responsive:false,
        firstLoadChk :true,
        direction:'left',
        circular:true,
        infinite:false,
        items:3,
        swipe:{onMouse:false, onTouch:false},
        align:false,
        auto:false,
        prev: {
          button: $prev,
          key: "left"
        },
        next: {
          button: $next,
          key: "right"
        },
        pagination:false,
        scroll:{
          items:1,
          onBefore: function() {
            var pos = $(this).triggerHandler('currentPosition');
            $(v).find('.card_slide_area .li').removeClass('selected').find('.c_target').attr('tabindex', -1);
            $(v).find('.card_slide_area .li.itm' + pos).addClass('selected').find('.c_target').attr('tabindex', 0);
            $(v).find('.card_slide_area .li.itm' + pos).next('.li').addClass('selected').find('.c_target').attr('tabindex', 0);
            $(v).find('.card_slide_area .li.itm' + pos).next('.li').next('.li').addClass('selected').find('.c_target').attr('tabindex', 0);
          }
        }
      });
    });
    return this;
  };

  /* 라이프메인 : Slide */
  $.fn.smart_slide = function(){
    $.each(this, function(i,v){
      $(v).find('.smart_slide_area .li').each(function(i) {
        $(this).addClass('itm'+i);
        $('.smart_slide_area .li').removeClass('selected').find('a').attr('tabindex', -1);
        $('.smart_slide_area .li.itm0').addClass('selected').find('a').removeAttr('tabindex');
        $('.smart_slide_area .li.itm1').addClass('selected').find('a').removeAttr('tabindex');
        $('.smart_slide_area .li.itm2').addClass('selected').find('a').removeAttr('tabindex');
        $('.smart_slide_area .li.itm3').addClass('selected').find('a').removeAttr('tabindex');
      });
      $prev = $(v).find('.smart_slide_prev');
      $next = $(v).find('.smart_slide_next');
      //$pagin = $(v).find('.smart_pagn');
      $(v).find('.smart_slide_area').carouFredSel({
        responsive:true,
        firstLoadChk :true,
        direction:'left',
        circular:true,
        infinite:false,
        items:4,
        swipe:{onMouse:false, onTouch:false},
        align:false,
        auto:false,
        prev: {
          button: $prev,
          key: "left"
        },
        next: {
          button: $next,
          key: "right"
        },
        pagination:false,
        scroll:{
          items:1,
          //fx: "crossfade",
          easing: "linear",
          onBefore: function() {
            var pos = $(this).triggerHandler('currentPosition');
            $(v).find('.smart_slide_area .li').removeClass('selected').find('a').attr('tabindex', -1);
            $(v).find('.smart_slide_area .li.itm' + pos).addClass('selected').find('a').removeAttr('tabindex');
            $(v).find('.smart_slide_area .li.itm' + pos).next('.li').addClass('selected').find('a').removeAttr('tabindex');
            $(v).find('.smart_slide_area .li.itm' + pos).next('.li').next('.li').addClass('selected').find('a').removeAttr('tabindex');
            $(v).find('.smart_slide_area .li.itm' + pos).next('.li').next('.li').next('.li').addClass('selected').find('a').removeAttr('tabindex');
          }
        }
      });
    });
    return this;
  };

  /* 혜택 - 이벤트 */
  $.fn.eventMcBanner = function(){
    $.each(this, function(i,v){
      $(v).find('.event_mc_banner .list').each(function(i) {
        $(this).addClass('itm'+i);
        $('.event_mc_banner .list').removeClass('selected').find('a').attr('tabindex', -1);
        $('.event_mc_banner .list.itm0').addClass('selected').find('a').removeAttr('tabindex');
      });
      $prev = $(v).find('.prev');
      $next = $(v).find('.next');
      $pagin = $(v).find('.pagn_s');
      $(v).find('.event_mc_banner').carouFredSel({
        responsive:false,
        firstLoadChk :true,
        direction:'left',
        circular:true,
        infinite:false,
        auto:true,
        prev:{
          button: $prev,
          onAfter: function(){
            $(v).find('.pagn_act').removeClass('on');
            $(v).find('.event_mc_banner').trigger('pause', true);
          }
        },
        next:{
          button: $next,
          onAfter: function(){
            $(v).find('.pagn_act').removeClass('on');
            $(v).find('.event_mc_banner').trigger('pause', true);
          }
        },
        pagination:{
          container: $pagin,
          onAfter: function(){
            $(v).find('.pagn_act').removeClass('on');
            $(v).find('.event_mc_banner').trigger('pause', true);
          }
        },
        scroll:{
          items:1,
          fx :'crossfade',
          duration:500,
          onBefore: function() {
            var pos = $(this).triggerHandler('currentPosition');
            $(v).find('.event_mc_banner .list').removeClass('selected').find('a').attr('tabindex', -1);
            $(v).find('.event_mc_banner .list.itm' + pos).addClass('selected').find('a').removeAttr('tabindex');
          }
        }
      });
      $(v).find('.pagn_s a span').append('번 슬라이드 보기');
      $(v).find('.btn_stop_s').click(function(){
        $(v).find('.pagn_act').removeClass('on');
        $(v).find('.event_mc_banner').trigger('pause', true);
        return false;
      });
      $(v).find('.btn_play_s').click(function(){
        $(v).find('.pagn_act').addClass('on');
        $(v).find('.event_mc_banner').trigger('play', true);
        return false;
      });
      $(v).find('.pagn_act').addClass('on');

      $(v).find('.event_mc_banner .list a').focusin(function(){
        var i = $(this).parent('.list').index();

        $('.pagn_act').removeClass('on');
        $('.event_mc_banner').trigger('pause', true);

      });
    });
  };
  $('.event_visual').eventMcBanner();

  /* 카드 - 프로모션 */
  $.fn.eventCardBanner = function(){
    $.each(this, function(i,v){
      $(v).find('.event_prom_banner .list').each(function(i) {
        $(this).addClass('itm'+i);
        $('.event_prom_banner .list').removeClass('selected').find('a').attr('tabindex', -1);
        $('.event_prom_banner .list.itm0').addClass('selected').find('a').removeAttr('tabindex');
      });
      $(v).find('.event_prom_banner').carouFredSel({
        responsive:false,
        firstLoadChk :true,
        direction:'left',
        circular:true,
        infinite:true,
        auto:true,
        scroll:{
          items:1,
          fx :'crossfade',
          duration:300,
          timeoutDuration:12700,
          onBefore: function() {
            var pos = $(this).triggerHandler('currentPosition');
            $(v).find('.event_prom_banner .list').removeClass('selected').find('a').attr('tabindex', -1);
            $(v).find('.event_prom_banner .list.itm' + pos).addClass('selected').find('a').removeAttr('tabindex');
          }
        }
      });
    });
  };
  $('.event_prom').eventCardBanner();

});


function cardList(){
  jQuery(function($){
    /*
        $('.c_target .s2').click(function(){
          if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).find('.btn_annual em').text('열기');
          }else{
            $(this).addClass('on');
            $(this).find('.btn_annual em').text('닫기');
          }
          return false;
        });
    */
    $('.c_target').attr('tabindex', 0);
    $('.card_main_cont .list').card_slide();

    $('.card_slide .c_target').bind('mouseover focusin',function(){
      $('.card_slide li').removeClass('on');
      $(this).closest('.li').addClass('on');
    });
    $('.card_slide .li').bind('mouseleave',function(){
      $(this).closest('.li').addClass('off');
      $(this).closest('.li').removeClass('on');
      setTimeout(function() {
        $('.card_slide .li').removeClass('off');
      }, 150);
    });
    $('.search_list_head, .useful_nav a, .event_prom a, .btn_main_under a, .banner_visual a, .main_under_banner a, .btn_more, .btn_area a, .my_card_life_view_target a, .card_under a').focusin(function(){
      $('.card_slide .li').removeClass('off');
      $('.card_slide .li').removeClass('on');
    });
    $('.card_slide_nav a').bind('focusin',function(){
      $('.card_slide li').removeClass('on');
    });
  });
}

/* 연회비 */
function btnAnnual(v){
  jQuery(function($){
    if($(v).closest('.s2').hasClass('on')){
      $(v).closest('.s2').removeClass('on');
      $(v).closest('.s2').find('.btn_annual em').text('열기');
    }else{
      $(v).closest('.s2').addClass('on');
      $(v).closest('.s2').find('.btn_annual em').text('닫기');
    }
  });
  return false;
}

function lifeMainList(){
  jQuery(function($){
    $('.lift_service .smart_service').smart_slide();
  });
}

jQuery(function($){
  cardList();
  lifeMainList();
});

/** 카드상세 **/
jQuery(function($){
  var cardViewInfo = $('.card_view_info .info01 .list').length;
  if(cardViewInfo > 3){
    $('.card_view_info .info01').addClass('length');
  }
  $('.card_view_info .info01.d3').removeClass('length');

  var cardInfoTab = $('.card_info_tab li').length;
  if(cardInfoTab > 6){
    $('.card_info_tab').removeClass('tab_ty').addClass('tab_ty02').addClass('length');
  }else{
    $('.card_info_tab').removeClass('tab_ty02').removeClass('length').addClass('tab_ty');
  }

  $('.related_card .btn_hit').BlackAndWhite({
    speed:200
  });
  $('.related_card li').attr('tabindex', 0);
  $('.related_card li').bind('mouseover focusin',function(){
    $('.related_card li').removeClass('on');
    $('.related_card li .BWfade').css('opacity', '1');
    $(this).addClass('on');
    $(this).find('.BWfade').css('opacity', '0');
  });
  $('.related_card li').bind('mouseleave',function(){
    $(this).removeClass('on');
    $(this).find('.BWfade').css('opacity', '1');
  });
  $('.related_card li:first-child').keydown(function(e){
    var isShift = window.event.shiftKey ? true : false;
    if(isShift && (e.keyCode == 9)){
      $('.related_card li').removeClass('on');
      $('.related_card li .BWfade').css('opacity', '1');
      return false;
    }
  });
  $('.card_view_cont .btn a').bind('focusin',function(){
    $('.related_card li').removeClass('on');
    $('.related_card li .BWfade').css('opacity', '1');
  });

  $('.card_info_list .ico img').attr('alt', '');
  $('.card_view_btn .txt').wrap('<div class=\"txt_wrap\"></div>')
  $('.card_view_btn .txt_wrap').eq(0).addClass('mt');


  /* 카드 비교하기 */
  $('.card_under').attr('tabindex', -1);
  $('.card_under_cont .btn').keydown(function(e){
    if(event.keyCode == 9){
      $('.card_under').focus();
    }
  });
  $('.btn_card_under').keydown(function(e){
    var isShift = window.event.shiftKey ? true : false;
    if(isShift && (e.keyCode == 9)){
      $('.btn_card_under').focus();
      return false;
    }
  });
  $('.btn_card_under').click(function(){
    if($('.card_under').hasClass('on')){
      $('.card_under').removeClass('on');
      $('.btn_card_under').text('카드비교 보기');
      $('.card_under .hit_st, .card_under .hit_ed').css('display' , 'none');
    }else{
      $('.card_under').addClass('on');
      $('.btn_card_under').text('카드비교 닫기');
      $('.card_under .hit_st, .card_under .hit_ed').css('display' , 'block');
    }
    return false;
  });

  $('.btn_card_under_delete').click(function(){
    $('.btn_card_under').focus();
  });

  /* 내게 맞는 카드 */
  $('.btn_c_view').click(function(){
    $(this).addClass('off');
    $('.card_my_cate_list').addClass('on');
    return false;
  });
  $('.btn_c_close').click(function(){
    $('.btn_c_view').removeClass('off');
    $('.card_my_cate_list').removeClass('on');
    return false;
  });
  $('.tab_ty a, .my_card_search .btn_area a').bind('focusin',function(){
    //$('.btn_c_view').removeClass('off');
    //$('.card_my_cate_list').removeClass('on');
  });

  /* 제휴사로 찾기 */
  $('.my_alliance .dep').closest('.li').addClass('chk');
  $('.my_alliance .chk').prepend('<a href=\"#ca_cate\" class=\"btn_c\">상세제휴사 보기</a>');
  //$('.my_alliance .chk .li_c input').prop('disabled', 'disabled').change();
  $('.my_alliance .chk .li_c').addClass('li_c_all');

  $('.my_alliance .chk .btn_c').click(function(){
    if($(this).closest('.li').hasClass('act')){
      $(this).closest('.li').removeClass('act');
      $(this).text('상세제휴사 보기');
      $('.my_alliance .chk .hit_st, .my_alliance .chk .hit_ed').css('display','none');
    }else{
      $('.my_alliance .li').removeClass('act');
      $(this).closest('.li').addClass('act');
      $(this).text('상세제휴사 닫기');
      $('.my_alliance .chk .hit_st, .my_alliance .chk .hit_ed').css('display','block');
    }
    return false;
  });
  $('.my_alliance .li_c input').click(function(){
    allianceClose();
  })

  $('.my_alliance .dep li:last-child').keydown(function(e){
    if(event.keyCode == 9){
      allianceClose();
      return false;
    }
  });
  $('.my_alliance .chk .btn_c').keydown(function(e){
    var isShift = window.event.shiftKey ? true : false;
    if(isShift && (e.keyCode == 9)){
      allianceClose();
    }
  });
});
function allianceClose(){
  jQuery(function($){
    $('.my_alliance .li').removeClass('act');
    $('.my_alliance .chk .btn_c').text('상세제휴사 닫기');
  });
}
function cardFill(elem){
  jQuery(function($){
    $('.card_under').addClass('on');
    $('.btn_card_under').text('카드비교 닫기');
    $('.card_under .hit_st, .card_under .hit_ed').css('display' , 'block');
    elem.innerHTML="비교함에 빼기";

    setTimeout(function() {
      $('.card_under').removeClass('on');
      $('.btn_card_under').text('카드비교 보기');
      $('.card_under .hit_st, .card_under .hit_ed').css('display' , 'none');
    }, 3000);
  });
  return false;
}
function cardFillOut(elem){
  jQuery(function($){
    $('.card_under').removeClass('on');
    $('.btn_card_under').text('카드비교 보기');
    $('.card_under .hit_st, .card_under .hit_ed').css('display' , 'none');
    elem.innerHTML="비교함에 담기";
  });
  return false;
}


jQuery(function($){
  $.fn.keyBanner = function(){
    $.each(this, function(x,v){
      /** Banner Visual **/
      var autoObj;
      var currentNum = 1;
      function s_right(){
        currentNum++;
        if(currentNum > $(v).find('.mb_list').length){
          currentNum = 1;
        }
        showPic(currentNum);
      }
      function s_left(){
        currentNum--;
        if(currentNum<1){
          currentNum = $(v).find('.mb_list').length
        }
        showPic(currentNum);
      }
      function play(){
        currentNum++;
        if(currentNum > $(v).find('.mb_list').length){
          currentNum = 1;
        }
        if($(v).find('.mb_list').length>1){
          showPic(currentNum);
        }
      }

      function showPic(num){
        jQuery(function($){
          $(v).find('.mb_list').each(function(i){
            if(num-1==i){
              $(this).fadeIn();
            }else{
              $(this).fadeOut();
            }
          });

          $(v).find('.paging a').each(function(i){
            if(i==num-1){
              $(this).addClass('on');
            }else{
              $(this).removeClass('on');
            }
          });
          $(v).find('.count em').each(function(i){
            if(i==num-1){
              $(this).addClass('on');
            }else{
              $(this).removeClass('on');
            }
          });
        });
      }

      $(v).find('.btn_b_next').click(function(){
        s_right();
        clearInterval(autoObj);
        $(this).closest('.pagn_act').removeClass('on');
        return false;
      });
      $(v).find('.btn_b_prev').click(function(){
        s_left();
        clearInterval(autoObj);
        $(this).closest('.pagn_act').removeClass('on');
        return false;
      });
      $(v).find('.btn_stop').click(function(){
        clearInterval(autoObj);
        $(this).closest('.pagn_act').removeClass('on');
        return false;
      });
      $(v).find('.btn_play').click(function(){
        //console.log();
        autoObj = setInterval(play, 5000);
        $(this).closest('.pagn_act').addClass('on');
        return false;
      });

      var imgLength=$(v).find('.slide .mb_list').length
      if(imgLength==1){
        $(v).find('.stop').hide();
        $(v).find('.play').hide();
        $(v).find('.btn_b_prev').hide();
        $(v).find('.btn_b_next').hide();
        $(v).find('.pagn_act').hide();
      }
      for(var i = 1 ; i < imgLength+1; i++) {
        var a = document.createElement('a');
        var e = document.createElement('em');
        $(a).text(i)
        $(a).attr('href','#')
        $(e).text(i)
        $(v).find('.paging').append(a)
        $(v).find('.count p').append(e)

      }
      $(v).find('.paging a').click(function(){
        $(v).find('.pagn_act').removeClass('on');
        menuNum=$(this).index()+1;
        showPic(menuNum);
        clearInterval(autoObj);
        return false;
      });

      $(v).find('.mb_list').eq(0).show();
      $(v).find('.paging a').eq(0).addClass('on');
      $(v).find('.paging a').append('번 슬라이드 보기');
      $(v).find('.count em').eq(0).addClass('on');
      $(v).find('.count span').text(imgLength)
      autoObj = setInterval(play, 5000);
      $('.pagn_act').addClass('on');
    });
  };
});

/* 이전 다음 Type */
jQuery(function($){
  $.fn.keyBanner02 = function(){
    $.each(this, function(x,v){
      /** Banner Visual **/
      var autoObj;
      var currentNum = 1;
      function s_right02(){
        currentNum++;
        if(currentNum > $(v).find('.mb_list').length -1){
          currentNum = $(v).find('.mb_list').length
          $(v).find('.btn_b_next').addClass('off');
        }else{
          $(v).find('.btn_b_next').removeClass('off');
        }
        $(v).find('.btn_b_prev').removeClass('off');
        showPic(currentNum);
      }
      function s_left02(){
        currentNum--;
        if (currentNum<2){
          currentNum = 1;
          $(v).find('.btn_b_prev').addClass('off');
        } else{
          $(v).find('.btn_b_prev').removeClass('off');
        }
        $(v).find('.btn_b_next').removeClass('off');
        showPic(currentNum);
      }
      function play(){
        currentNum++;
        $(v).find('.btn_b_prev').removeClass('off');
        $(v).find('.btn_b_next').removeClass('off');
        if(currentNum > $(v).find('.mb_list').length){
          $(v).find('.btn_b_prev').addClass('off');
          currentNum = 1;
        }
        if(currentNum == $(v).find('.mb_list').length){
          $(v).find('.btn_b_next').addClass('off');
        }
        if($(v).find('.mb_list').length>1){
          showPic(currentNum);
        }
      }

      function showPic(num){
        jQuery(function($){
          $(v).find('.mb_list').each(function(i){
            if(num-1==i){
              $(this).fadeIn();
            }else{
              $(this).fadeOut();
            }
          });

          $(v).find('.paging a').each(function(i){
            if(i==num-1){
              $(this).addClass('on');
            }else{
              $(this).removeClass('on');
            }
          });
          $(v).find('.count em').each(function(i){
            if(i==num-1){
              $(this).addClass('on');
            }else{
              $(this).removeClass('on');
            }
          });
        });
      }

      $(v).find('.btn_b_next').click(function(){
        s_right02();
        clearInterval(autoObj);
        $(this).closest('.pagn_act').removeClass('on');
        return false;
      });
      $(v).find('.btn_b_prev').click(function(){
        s_left02();
        clearInterval(autoObj);
        $(this).closest('.pagn_act').removeClass('on');
        return false;
      });
      $(v).find('.btn_stop').click(function(){
        clearInterval(autoObj);
        $(this).closest('.pagn_act').removeClass('on');
        return false;
      });
      $(v).find('.btn_play').click(function(){
        //console.log();
        autoObj = setInterval(play, 5000);
        $(this).closest('.pagn_act').addClass('on');
        return false;
      });

      var imgLength=$(v).find('.slide .mb_list').length
      if(imgLength==1){
        $(v).find('.stop').hide();
        $(v).find('.play').hide();
        $(v).find('.btn_b_prev').hide();
        $(v).find('.btn_b_next').hide();
        $(v).find('.pagn_act').hide();
      }
      for(var i = 1 ; i < imgLength+1; i++) {
        var a = document.createElement('a');
        var e = document.createElement('em');
        $(a).text(i)
        $(a).attr('href','#')
        $(e).text(i)
        $(v).find('.paging').append(a)
        $(v).find('.count p').append(e)

      }
      $(v).find('.paging a').click(function(){
        $(v).find('.pagn_act').removeClass('on');
        menuNum=$(this).index()+1;
        showPic(menuNum);
        clearInterval(autoObj);
        return false;
      });

      $(v).find('.mb_list').eq(0).show();
      $(v).find('.paging a').eq(0).addClass('on');
      $(v).find('.paging a').append('번 슬라이드 보기');
      $(v).find('.count em').eq(0).addClass('on');
      $(v).find('.btn_b_prev').addClass('off');
      $(v).find('.count span').text(imgLength)
      autoObj = setInterval(play, 5000);
      $('.pagn_act').addClass('on');
    });
  };
});

jQuery(function($){
  $('.banner_visual').keyBanner();
});


/* 청구단위 보유카드 */
jQuery(function($){
  $('.search_area02 .list .btn_card').click(function(){
    $(this).toggleClass('on').next('.box_scroll').toggleClass('on');
    return false;
  });
});


/* common */
jQuery(function($){
  $('.hint_txt').hintTxt();
  //$('.s2').closest('.state_area > .list > .view').addClass('ty02');	//마이페이지, 내역 버튼 조건
  state_area();
  $('.state_ty a.btn_more, .state_ty02 a.btn_more').closest('.cont').find('ul.btn_area').addClass('ty02');//state_ty
  $('.state_ty strong.ico_card').closest('.cont').find('div.state_tit').addClass('ty_card');//state_ty : 카드 아이콘인 경우
});

jQuery(function($){
  if($('.state_ty a.btn_more').css('display') == 'none'){
    $('.state_ty a.btn_more').closest('.cont').find('p.table_info02').addClass('ty02');
  }else{
    $('.state_ty a.btn_more').closest('.cont').find('p.table_info02').removeClass('ty02');
  }
});

jQuery(function($){
  if($('.state_ty a.btn_more').css('display') == 'none'){
    $('.state_ty a.btn_more').closest('.cont').find('ul.btn_area').removeClass('ty02');
  }else{
    $('.state_ty a.btn_more').closest('.cont').find('ul.btn_area').addClass('ty02');
  }
});

function state_area(){
  jQuery(function($){
    $('.state_area .list .view .s1').each(function(){
      if($(this).siblings('ul').hasClass('s2')){
        $(this).parent('.view').addClass('ty02');
        state_w();
      }
    });
  });
}

function state_w(){
  jQuery(function($){
    $('.state_area .list .view .s1').each(function(){
      var w = $(this).siblings('.s2').width() + 107;
      $(this).parent('.view').css('padding-right', w);
      //console.log();
    });
  });
}

function moreHdn(){
  jQuery(function($){
    $('.state_ty, .state_ty02').closest('.cont').find('ul.btn_area').removeClass('ty02');
  });
}

function tabTemp(){
  jQuery(function($){
    /*$('.tab_ty a span em').contents().unwrap();
    $('.tab_ty a span').contents().unwrap();
    $('.tab_ty a').wrapInner('<span><em></em></span>');*/
    $('.tab_s').closest('.tab_ty').addClass('mb02');

    $('.tab_nav a').click(function(){
      $(this).tabNav();
      return false;
    });
    $('.tab_nav02 a').click(function(){
      $(this).tabNav02();
      return false;
    });

    $('.tab_nav03 a').click(function(){
      $(this).tabNav03();
      return false;
    });
    $('.tab_link').click(function(){
      $(this).tabLink();
      return false;
    });
  });
}
/*function stateTemp(){
	jQuery(function($){
		$('.state_ty .info').click(function(){
			//$(this).state_ty();
			//return false;
		});
	});
}*/
function stateTemp(){
  jQuery(function($){
    $('.state_ty .list .info em.blind').remove();
    $('.state_ty .list .info').append('<em class=\"blind\">상세내용보기</em>');
    $('.state_ty .list.on .info em.blind').text('상세내용닫기');
    $('.state_ty .list .zero').attr('tabindex', '-1');
    $('.state_ty .list .zero em.blind').text('');
    $('.state_ty .info').unbind('click').bind('click',function(){
      $(this).state_ty();
      state_w();
      return false;
    });

  });
}
function accordianTemp(){
  jQuery(function($){
    $('.accordian_ty .list > a em.blind').remove();
    $('.accordian_ty .list > a').append('<em class=\"blind\">상세내용보기</em>');
    $('.accordian_ty .list.on > a em.blind').text('상세내용닫기');
    //$('.accordian_ty .list.on').css('height', $(this).find('.view').innerHeight() + 68);
    $('.accordian_ty .list > a').click(function(){
      $(this).accordian_ty();
      return false;
    });

    $('.accordian_ty03 .list .info_btn').append('<em class=\"blind\">상세내용보기</em>');
    $('.accordian_ty03 .list.on .info_btn em.blind').text('상세내용닫기');
    /*$('.accordian_ty03 .list .info_btn').click(function(){
      $(this).accordian_ty();
      return false;
    });*/

    $('.accordian_ty04 .list a em.blind').remove();
    $('.accordian_ty04 .list a').append('<em class=\"blind\">상세내용보기</em>');
    $('.accordian_ty04 .list.on a em.blind').text('상세내용닫기');
    $('.accordian_ty04 .list > a').click(function(){
      $(this).accordian_ty();
      return false;
    });

    //고객센터 메인
    $('.c_main_ask .aco_box .accordian a em.blind').remove();
    $('.c_main_ask .aco_box .accordian a').append('<em class=\"blind\">상세내용보기</em>');
    $('.c_main_ask .aco_box .accordian a em.blind').text('상세내용닫기');
    $('.c_main_ask .aco_box .accordian a').click(function(){
      $(this).accordian_ty();
      return false;
    });
  });
}
function chkstateTemp(){
  jQuery(function($){
    $('.chk_state .chk_ts').click(function(){
      if($(this).closest('.list').hasClass('on')){
        $(this).closest('.list').removeClass('on');
        $(this).closest('.list').find('.inner input').attr('disabled', 'disabled');
        $(this).closest('.list').find('.inner input').prop('disabled', true).change();
        $(this).closest('.list').find('.inner input').prop('checked', false).change();
      }else{
        $(this).closest('.list').addClass('on');
        $(this).closest('.list').find('.inner input').removeAttr('disabled', 'disabled');
        $(this).closest('.list').find('.inner input').prop('disabled', false).change();

      }
    });
  });
}
function radiostateTemp(){
  jQuery(function($){
    $('.radio_state .radio_ts').click(function(){
      $('.radio_state .list').removeClass('on');
      /*
      $('.radio_state .list .select_ty').attr('disabled');
      $('.radio_state .list .selectBox').addClass('selectBox-disabled');
      */
      $(this).closest('.list').addClass('on');
      /*$(this).closest('.list').find('.inner .select_ty.select_on').removeAttr('disabled');
      $(this).closest('.list').find('.inner .selectBox.select_on').removeClass('selectBox-disabled');
      */
    });
    //$('.radio_state .on .select_ty.select_on').removeAttr('disabled');
    //$('.radio_state .on .selectBox.select_on').removeClass('selectBox-disabled');\
    $('.list_con_chk .chk_on').closest('.list').addClass('on');
  });
}

jQuery(function($){
  //scroll 높이
  //$('.win_pop').find('.selectBox-options').last().addClass('last');
  $('.win_pop .selectBox-options').height(120);
  $('.win_pop .selectBox').click(function(){
    if($(this).hasClass('selectBox-menuShowing')){
      var opt = $('.win_pop').find('ul.show');
      var h = (opt.find('li').length * 38) + 26;
      var a = $('.win_pop').height() - (opt.offset().top + h + 15);
      if(a < 0){
        opt.height(120);
      }else{
        opt.height(100 + '%');
      }
    }
  });
});


/* 라이프 메인 */
jQuery(function($){
  $.fn.lifeBanner = function(){
    $.each(this, function(i,v){
      $(v).find('.life_mc_banner li').each(function(i) {
        $(this).addClass('itm'+i);
        $('.life_mc_banner li').removeClass('selected');
        $('.life_mc_banner li.itm0').next('li').addClass('selected');
      });
      $prev = $(v).find('.prev');
      $next = $(v).find('.next');
      $pagin = $(v).find('.pagn_s');
      $(v).find('.life_mc_banner').carouFredSel({
        responsive:false,
        firstLoadChk :true,
        direction:'left',
        circular:true,
        infinite:false,
        items:{start:-1, visible:3},  // Nav Contents 수량 : visible : 3
        auto:true,
        prev:{
          button: $prev,
          onAfter: function(){
            $(v).find('.pagn_act').removeClass('on');
            $(v).find('.life_mc_banner').trigger('pause', true);
          }
        },
        next:{
          button: $next,
          onAfter: function(){
            $(v).find('.pagn_act').removeClass('on');
            $(v).find('.life_mc_banner').trigger('pause', true);
          }
        },
        pagination:{
          container: $pagin,
          onAfter: function(){
            $(v).find('.pagn_act').removeClass('on');
            $(v).find('.life_mc_banner').trigger('pause', true);
          }
        },
        scroll:{
          items:1,
          duration:700,
          onBefore: function() {
            var pos = $(this).triggerHandler('currentPosition');
            $(v).find('.life_mc_banner li').removeClass('selected').find('a').attr('tabindex', -1);
            $(v).find('.life_mc_banner li.itm' + pos).next('li').addClass('selected').find('a').removeAttr('tabindex');
          }
        }
      });
      $(v).find('.pagn_s a span').append('번 슬라이드 보기');
      $(v).find('.btn_stop_s').click(function(){
        $(v).find('.pagn_act').removeClass('on');
        $(v).find('.life_mc_banner').trigger('pause', true);
        return false;
      });
      $(v).find('.btn_play_s').click(function(){
        $(v).find('.pagn_act').addClass('on');
        $(v).find('.life_mc_banner').trigger('play', true);
        return false;
      });
      $(v).find('.pagn_act').addClass('on');

      $(v).find('.life_mc_banner .list a').focusin(function(){
        var i = $(this).parent('.list').index();
        $('.pagn_act').removeClass('on');
        $('.life_mc_banner').trigger('pause', true);

      });
    });
  };
  $('.life_mc_banner_area').lifeBanner();
  $('.life_banner_visual .pagn_area').attr('tabindex', 0);

});

/* 고객센터 고객상담 */
jQuery(function($){
  $('.ars_area .ars_phone li.on').attr('title', '현재 선택됨');
  $('.ars_phone a').click(function(){
    $(this).closest('div').find('li').removeClass('on').removeAttr('title');
    $(this).closest('li').addClass('on').attr('title', '현재 선택됨');
    var phoneAct = $(this).attr("href");
    //$('.ars_aco .list').removeClass('on');
    $(this).closest('.cont').find('.ars_aco .list').removeClass('on').removeAttr('title');
    //$(phoneAct).addClass('on')
    $(phoneAct).find('a').trigger('click');
    //$('html, body').stop().animate({scrollTop:$('.ars_area').offset().top - 190}, 600);
    return false;
  });
  $('.ars_aco .list > a').click(function(){
    $(this).closest('.accordian_ty').find('li').removeAttr('title');
    $(this).parent().attr('title', '현재 선택됨');
    var s = $(this).attr("href").split("_")[1];
    //$('.ars_phone li').removeClass('on');
    //$('.ars_phone li.s' + s).addClass('on');
    $(this).closest('.cont').find('.ars_phone li').removeClass('on').removeAttr('title');
    $(this).closest('.cont').find('.ars_phone li.s' + s).addClass('on').attr('title', '현재 선택됨');
    return false;
  });
});

/** 약관 **/
jQuery(function($){
  $('.terms_list a').click(function(){
    var termTab = $(this).attr("href");
    $('html, body').stop().animate({scrollTop:$(termTab).offset().top  - 180 }, 300);
    return false;
  });
});

/* 내게 맞는 카드 : 제휴사로 찾기 검색 */
jQuery(function($){
  $('.card_my_cate').append('<span class=\"bc1\"></span>').append('<span class=\"bc2\"></span>');

  $.fn.cardSlideSearch = function(){
    $.each(this, function(i,v){
      $(v).owlCarousel({
        items:5,
        slideBy:5,
        margin:0,
        nav: true,
        navSpeed: 200,
        loop: false,
        autoHeight:true,
        mouseDrag:false,
        dots:false,
      });

    });
  };
  $('.owl-carousel').cardSlideSearch();

  $('.my_alliance .owl-next, .my_alliance .owl-prev').attr('tabindex', 0);
  $('.my_alliance .list').attr('tabindex', 0)

  $('.owl-stage').append('<span class=\"bc_hit\"></span>');
  $('.bc_hit').attr('tabindex', 0).text('제휴사로 찾기 처음으로 이동');
  $('.bc_hit').focus(function(){
    $('.my_alliance .owl-item').eq(0).find('.list').focus();
  });

  $('.my_alliance .owl-next, .my_alliance .owl-prev').click(function(){
    $('.my_alliance .chk.li').removeClass('act');
    $('.my_alliance .chk .btn_c').text('상세제휴사 보기');
    $('.my_alliance .chk .hit_st, .my_alliance .chk .hit_ed').css('display','none');
  });
  $('.my_alliance .off .list').focus(function(){
    $('.my_alliance .owl-next').trigger('click');
    $('.bc_hit').addClass('on');
  });
  $('.my_alliance .active .list').focus(function(){
    $('.my_alliance .owl-prev').trigger('click');
    $('.bc_hit').removeClass('on');
  });
  $('.my_alliance .owl-next, .my_alliance .owl-prev').keydown(function(e){
    if(e.keyCode==13){
      $(this).trigger('click');
    }
  });
});



jQuery(function($){
  tabTemp();
  stateTemp();
  accordianTemp();
  chkstateTemp();
  radiostateTemp();
  //commTemp();
  $('.card_info_list .txt').wrapInner("<div class='inner'></div>");

  $('.float_banner').css('top', $(window).height() - 230);

  $('.search_all_box .hit_st').remove();
  $('.search_all_box .hit_ed').remove();
});


/** 통합검색 **/
function searchAll(){
  jQuery(function($){
    $('.gnb_search').hide();
    $('.search_all_box').addClass('act');
    $('.search_all_box .sa_dims').addClass('on');
    $('.sa_input input').focus();

    gnbClose();
  });
  return false;
}
function searchAllClose(){
  jQuery(function($){
    $('.gnb_search').show();
    $('.sa_page').closest('body').find('.gnb_search').hide();
    $('.search_all_box').removeClass('act');
    $('.search_all_box .sa_dims').removeClass('on');
    $('.sa_result').removeClass('on');
    $('.search_all_box_cont .inner').removeClass('act');
    $('.gnb_search').focus();
  });
  return false;
}
function searchAllView(){
  jQuery(function($){
    $('.search_all_box .sa_dims').addClass('on');
    $('.sa_result').addClass('on');
    $('.search_all_box_cont .inner').addClass('act');
  });
  return false;
}
function searchAllViewClose(){
  jQuery(function($){
    $('.sa_result').removeClass('on');
    $('.search_all_box_cont .inner').removeClass('act');
    $('.search_all_box.sa_page .sa_dims').removeClass('on');

  });
  return false;
}
function searchAllTy(){
  jQuery(function($){
    $('.sa_input input').focusin(function(){
      $('.sa_box_inner').addClass('on');
    });
    $('.sa_input input').focusout(function(){
      $('.sa_box_inner').removeClass('on');
    });
    $('.search_all_box .inner .sa_page_line').remove();
    $('.search_all_box .inner').append('<span class=\"sa_page_line\"></span>');
    $('.sa_page').closest('body').find('.gnb_search').hide();

    $('.search_all_box_cont').attr('tabindex', -1);

    $('.btn_sa_close').keydown(function(e){
      var isShift = window.event.shiftKey ? true : false;
      if(isShift && (e.keyCode == 9)){
        return;
      }else if(event.keyCode == 9){
        $('.search_all_box_cont').focus();
        return false;
      }

    });
    $('.search_all_box_cont').keydown(function(e){
      var isShift = window.event.shiftKey ? true : false;
      if(isShift && (e.keyCode == 9)){
        $('.btn_sa_close').focus();
        return false;
      }else if(event.keyCode == 9){
        return;
      }
    });

    $('.sa_dims').click(function(){
      searchAllClose();
    });
  });
}



jQuery(function($){
  searchAllTy();
});

function cardSearchFill(elem){
  jQuery(function($){
    //elem.innerHTML="카드 비교 대상 삭제";
    $(elem).closest('.c_target').find('.check').remove();
    $(elem).closest('.c_target').prepend('</span><div class=\"check\"><strong class=\"t_compare\">카드 비교 대상</strong></div>');
    $(elem).closest('.c_target').find('.btn').addClass('act');
  });
  return false;
}
function cardSearchFillOut(elem){
  jQuery(function($){
    //elem.innerHTML="카드 비교 대상 추가";
    $(elem).closest('.c_target').find('.check').remove();
    $(elem).closest('.c_target').find('.btn').removeClass('act');
  });
  return false;
}



/* datepicker */
jQuery(function($){
  $('.select_date').datepicker({
    //showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
    showOn: "button",
    buttonImage:false, // 버튼 이미지
    buttonImageOnly: false, // 버튼에 있는 이미지만 표시한다.
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames: ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'],
    dayNamesShort: ['SUN','MON','THU','WED','THU','FRI','SAT'],
    dayNamesMin: ['SUN','MON','THU','WED','THU','FRI','SAT'],
    showMonthAfterYear: true,
    yearSuffix: '년',
    buttonText: "달력보기",
    //minDate: new Date(),
  });
  $('.select_date').attr('placeholder', '예 : 0000-00-00');
  $('.ui-datepicker-trigger').attr('tabindex', -1);
  if($('.ui-datepicker-trigger').prev().is('.board_ty .input_ty, .board_ty02 .input_ty, .board_ty03 .input_ty, .board_box_list .input_ty')){
    $('.ui-datepicker-trigger').css('margin-left','-45px');
  } else if($('.ui-datepicker-trigger').prev().is('.search_area02 .list .input_ty')){
    $('.ui-datepicker-trigger').css('float','left');
  } else if($('.ui-datepicker-trigger').prev().is('.search_area02 .center .list .input_ty, .search_area02.sec_chg .sec_tag .input_ty, .board_search .input_ty, .state_foot .sum.inp .input_ty')){
    $('.ui-datepicker-trigger').css('margin-left','-39px');
  };
  //input click
  $('input.select_date').click(function(){
    $(this).datepicker('show');
  })
});



/* as-is 팝업) */
var opcI = 0;
function layPop(id, strHTML, objSourceBtn){

  //Layer scroll 을 위한 동작
  function LPopRsz(){
    clearTimeout(laypop_scroll)

    var laypop_scroll = setTimeout(function(){

      if(jQuery(window).height() - 220 < jQuery(lpop).find(".laySclW_02").height() ){
        //alert('a');
        // 스크롤이 나오는 경우
        jQuery(lpop).find(".laySclW_01").height(jQuery(window).height() - 220);
        jQuery(lpop).find(".laySclW_01").css({"overflow-y":"auto"})
      } else{
        //alert('b');
        // 스크롤이 나오지 않는 경우
        jQuery(lpop).find(".laySclW_01").height( jQuery(lpop).find(".laySclW_02").height() + 25 );
        jQuery(lpop).find(".laySclW_01").css({"overflow-y":"hidden"})
      }
      fnLpopPos();
    },100)
  }

  if(strHTML) {
    //동적으로 생성된 HTML 소스를 overlay로 보여주는 경우
    //해당 id의 layer가 존재하면 지워준다.
    var overLayEL = jQuery("#"+id);

    jQuery(".deemed").hide();
    jQuery(".cont_box_area").css({"display":"relative","z-index":"0"});

    if(overLayEL.length > 0) {
      overLayEL.remove();
      opacityHide();
    }

    //html 소스를 페이지에 삽입
    var overlayEL = jQuery(strHTML);
    jQuery("body").append(overlayEL);
  } else {
    //정적인 overlay 를 처리하는 경우
    var lpopEL = jQuery("#" + id);

    if(lpopEL.css("display") != "none") {
      return;
    }
  }

  var lpop = document.getElementById(id);
  opacityShow(id);

  jQuery(".deemed").show();
  jQuery(".breadcrumb").removeClass("on").css({"position":"static"});
  jQuery(".card_under").css({"z-index":"-1"});
  jQuery(".cont_box_area").css({"position":"static","z-index":"999"});

  opcI = opcI + 2;
  var zIdx = Number('990' + opcI);
  jQuery("#" + id).css({
    'position':'fixed',
    'top':'-9999px',
    'left':'-9999px',
    'visibility': 'visible',
    'display':'block'
  });

  setTimeout(function(){
    jQuery("#" + id).css({"z-index":"990" + opcI})
  },100)


  if(jQuery(lpop).find(".wcont").children().hasClass("laySclW_01") == false){
    jQuery(lpop).find(".wcont").wrapInner("<div class='laySclW_01' tabindex='0'style='overflow:hidden; overflow-y:auto; display:block; position:relative; text-align:justify; padding-left:0;/>")
    jQuery(lpop).find(".laySclW_01").wrapInner("<div class='laySclW_02' style='display:block;'/>")

    if(jQuery(lpop).find(".wbtm").length > 0){
      jQuery(lpop).find(".wbtm").attr('tabindex','0')
    }else{
      jQuery(lpop).find(".fWrap").attr('tabindex','0')
    }
  }
  function fnSetFocus(strId, objSourceBtn) {

    var targetEL;

    if(objSourceBtn) {
      targetEL = jQuery(objSourceBtn);
    } else {
      targetEL = jQuery("#" + strId);
    }

    if(targetEL.length > 0) {
      targetEL.focus();
    }
  }

  //닫기 버튼에 추가 동작 맵핑
  if(objSourceBtn) {
    jQuery(lpop).find(".close > a").click(function(){
      fnSetFocus(null, objSourceBtn);
      //console.log(objSourceBtn)
    });


  }

  //Layer 위치를 위한 동작
  function fnLpopPos(){
    var re_layerHeight = lpop.scrollHeight;
    var _layerHpos = (jQuery(window).height() - re_layerHeight) / 2;
    var _layerWidth = lpop.scrollWidth;
    var _layerWpos = (jQuery(window).width() - _layerWidth) / 2;

    if(_layerHpos < 40){var _layerHpos_f = 40}
    else{var _layerHpos_f = _layerHpos}

    jQuery(lpop).css({
      top:_layerHpos_f,
      left:_layerWpos
    });
  }

  // .laySclW_02 가 ajax, 데이터호출로 높이값의 변화가 있을시 실행되는 함수
  function fnLpr(){
    jQuery(lpop).find(".laySclW_02").resize(function(){
      if(jQuery(window).height() - 220 < jQuery(lpop).find(".laySclW_02").height()){
        jQuery(lpop).find(".laySclW_01").css({"overflow-y":"auto"})
        //	jQuery(lpop).find(".laySclW_01").height(jQuery(window).height() - 220);
        LPopRsz();
      }else{
        jQuery(lpop).find(".laySclW_01").css({"overflow-y":"hidden"})
        jQuery(lpop).find(".laySclW_01").height(jQuery(lpop).find(".laySclW_02").height());
        LPopRsz();
      }
    })
  }
  if(jQuery(window).height() - 220 >= jQuery(lpop).find(".laySclW_02").height()){
    fnLpr();
  }
  jQuery(lpop).find(".laySclW_02").find("a").click(function(){
    var heti = 0;
    var rePosInterval = setInterval(function(){
      LPopRsz();
      heti++;
      if(heti > 5){
        clearInterval(rePosInterval)
      }
    },1000)
  })

  jQuery(window).resize(function(){
    LPopRsz();
  })
  LPopRsz();

  setTimeout(function(){
    LPopRsz();
  },2000)
  //fnLpr();

  if(jQuery(lpop).find(".wbtm").length > 0){
    jQuery(lpop).find(".wbtm").focus();
  }else{
    jQuery(lpop).find(".fWrap").focus();
  }

  jQuery("span.close").keydown(function(e){
    if(e.keyCode == '9'){
      jQuery(this).closest("div[tabindex='0']").eq(0).focus();
      e.preventDefault();
    }
  })

};

function layPopClose(id){ // 레이어팝업을 닫는 함수
  opacityHide();
  var lpop=document.getElementById(id);
  jQuery(lpop).css({
    visibility: 'hidden',
    display:'none'
  });
  jQuery(".card_under").css({"z-index":"201"});
  jQuery(".breadcrumb").css({"position":"absolute"});
  jQuery(lpop).prev("a").focus();
}

//var opcI = 0;
function opacityShow(id){ // 레이어팝업을 열때 투명배경제어, 플래쉬의 접근성 이슈관련 위치이동 및 더미이미지 삽입등의 기능

  jQuery("<div class='opacityWrap_0" + opcI + "' style='display:block; position:fixed; left:0; top:0; z-index:990" + (opcI + 1) + "; min-width:970px; width:100%; min-height:1080px; background:#000; filter:alpha(opacity=20);opacity:0.2; overflow:auto;'>&nbsp;</div>").insertAfter("#" + id);
  jQuery(".opacityWrap_0" + opcI).height(jQuery(window).height());
  jQuery(".opacityWrap_0" + opcI).show();

  var NowTopPos = jQuery(window).scrollTop()
  jQuery(window).scrollTop(NowTopPos);
  jQuery("html").css({"overflow-y":"hidden", "overflow-x":"hidden"});

};

function opacityHide(){ // 활성화된 투명배경, 플래쉬의 위치이동 원상복귀

  jQuery(".opacityWrap_0" + (opcI - 2)).hide();
  jQuery(".opacityWrap_0" + (opcI - 2)).remove();
  var layPopELs = jQuery(".layPop");
  if(opcI > 0 ){opcI = opcI - 2}


  var NowTopPos = jQuery(window).scrollTop()
  jQuery(window).scrollTop(NowTopPos);
  jQuery("html").css({"overflow-y":"scroll", "overflow-x":"auto"});
};


//laysPop 위치 재정의 함수
function lpS_Rops(){
  var lpS_count = jQuery('.laysPop:visible').length;
}

jQuery(window).ready(function(){
  lpS_Rops();
});

//마이페이지 서브메인 탭
jQuery(function($){
  $('.bank_info .tab a').click(function(){
    var n = $(this).parent().index();

    if(!$(this).parent().hasClass('on')){
      $(this).closest('.tab').find('.on').removeClass('on');
      $(this).parent().addClass('on');
      $(this).closest('.tab').siblings('.tab_con').find('div').removeClass('on');
      $(this).closest('.tab').siblings('.tab_con').children('div').eq(n).addClass('on');
    }
    return false;
  });

});

//btn_pop text
/* 17.07.25 접근성 수정 */
jQuery(function($){
  $('.btn_pop').append(' <i class="blind">레이어팝업 열림</i>');

  $('a[target="_blank"]').each(function() {
    var blankTitle = $(this).text();
    $(this).attr('title', blankTitle + ' 새창 열림');
  });
  $('a[target="blank"]').each(function() {
    var blankTitle = $(this).text();
    $(this).attr('title', blankTitle + ' 새창 열림');
  });


  $('.fri_card_rec .img img, .card_view_info .info01 img, .card_view_img img, .event_img img, .card_main_banner .mb_bg img, card_comepare_table .img img, .useful_nav img, .useful_nav02 img').attr('alt', '');
  $('.gnb_search').append(' <i class="blind">레이어팝업 열림</i>');
  $('.calendar_ty .btn_month').text('달력 월 레이어팝업 열림');
  $('.search_area02 a.btn_card').append('<i class="blind">상세보기</i>');
});



jQuery(function($){
  var cardTabLenth = $('.card_tab_b li').length;
  if (cardTabLenth > 2){
    $('.card_tab_b').addClass('len');
  }
});





/* 접근성 수정 : table caption */
function captionText(){
  jQuery(function($){
    $('table caption').each(function() {
      var tdArr = new Array();
      var caTxt1 = $(this).text();
      var caTxt2 = $(this).closest('table').find('thead th');
      var caTxt3 = $(this).closest('table').find('tbody th');
      var caTxtLan = $(this).closest('table').find('thead').length;

      if(caTxtLan < 1){
        caTxt3.each(function(i) {
          tdArr.push(' ' + caTxt3.eq(i).text());
        });
      }else{
        caTxt2.each(function(i) {
          tdArr.push(' ' + caTxt2.eq(i).text());
        });
      }
      $(this).text(caTxt1 + ' :' + tdArr + '을(를) 나타내는 안내 표입니다. ');
    });
  });
}

jQuery(function($){
  captionText()

  $('a dl').wrap('<div role="button"></div>');
  var repTxt = $('.accordian_ty04 .list > a');
  repTxt.find('dt').unwrap('dl').closest('a')/*.wrapInner('<div role="button"></div>')*/;
  repTxt.find('dt').wrapInner('<p class="tit"></p>')
  repTxt.find('p.tit').unwrap();
  repTxt.find('.photo').wrapInner('<p class="photo"></p>')
  repTxt.find('p.photo').unwrap();
  repTxt.find('.ico').wrapInner('<p class="ico"></p>')
  repTxt.find('p.ico').unwrap();
  repTxt.find('.txt').wrapInner('<div class="txt"></div>')
  repTxt.find('div.txt').unwrap();

});



