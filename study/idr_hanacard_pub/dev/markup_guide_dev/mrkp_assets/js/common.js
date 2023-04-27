/**
 * Guide Common
 */
var tabPerTotalPageNum = 0; //탭 내 페이지 갯수

function setTotalPageNum(cnt) {
    $('.total_page_num span').html(cnt);
}

function activeTabs(targetTabs, idx) {
    $(targetTabs + ' a').eq(idx).trigger('click');
}

function drawGuideList(listInfo, path, targetBox) {
    var root = path;
    var temp_thaed = "";
    temp_thaed += "<tr>";
    if (listInfo[0].auth) {
        temp_thaed += "<th scope='col' class='auth'>Auth</th>";
    }
    temp_thaed += "<th scope='col' class='dep1'>1 Depth</th>";
    temp_thaed += "<th scope='col' class='dep2'>2 Depth</th>";
    temp_thaed += "<th scope='col' class='dep3'>3 Depth</th>";
    temp_thaed += "<th scope='col' class='url'>URL</th>";
    temp_thaed += "<th scope='col' class='status'>상태</th>";
    temp_thaed += "<th scope='col' class='date'>완료일자</th>";
    temp_thaed += "<th scope='col' class='writer'>작업자</th>";
    temp_thaed += "<th scope='col' class='desc'>비고</th>";
    temp_thaed += "</tr>";

    var temp_tbody = "";
    if (listInfo) {
        listInfo.forEach(function (itm, idx) {
            temp_tbody += "<tr class='" + itm.label + "'>";
            if (itm.auth) {
                temp_tbody += "<td class='auth'>" + itm.auth + "</td>";
            }
            temp_tbody += "<td class='dep1'>" + itm.dep1 + "</td>";
            temp_tbody += "<td class='dep2'>" + itm.dep2 + "</td>";
            temp_tbody += "<td class='dep3'>" + itm.dep3 + "</td>";
            if (itm.onclick) {
                temp_tbody += "<td class='url'><a href='" + root + itm.url + "' target='_blank' onclick='"+itm.onclick+"'>" + itm.url + "</a></td>";
            } else {
                temp_tbody += "<td class='url'><a href='" + root + itm.url + "' target='_blank'>" + itm.url + "</a></td>";
            }
            temp_tbody += "<td class='status'>" + itm.status + "</td>";
            temp_tbody += "<td class='date'>" + itm.date_complete + "</td>";
            temp_tbody += "<td class='writer'>" + itm.writer + "</td>";
            temp_tbody += "<td class='desc'>" + itm.etc + "</td>";
            temp_tbody += "</tr>";
        });
    }
    $('.' + targetBox + ' thead').html(temp_thaed);
    $('.' + targetBox + ' tbody').html(temp_tbody);
}

$(function ($) {

    //tabs click
    $('.guide_tabs a').click(function () {
        var targetTabsCon = $(this).attr('data-tabs');
        $('.tabs a').removeClass('on');
        $(this).addClass('on');
        $('.tabs_cont').removeClass('on');
        $('.' + targetTabsCon).addClass('on');

        //페이지갯수 갱신
        tabPerTotalPageNum = $('.tabs_cont.on tbody tr').length;
        setTotalPageNum(tabPerTotalPageNum);
    });

    //가이드 리스트 그리기
    drawGuideList(infoGuideList, infoGuideFolder, "guide_list_wrap");

    //레이아웃 리스트 그리기
    drawGuideList(infoLayoutList, infoGuideFolder, "layout_list_wrap");

    //가이드 리스트 그리기
    drawGuideList(infoPcardList, infoPcardFolder, "page_list_wrap");


    // to top
    var scrollDiv = document.createElement('div');
    $(scrollDiv).attr('id', 'toTop').html('<a href="#nohref">상단으로 가기</a>').appendTo('body');
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 600);
        return false;
    });

    $(function () {
        var locN = $('tbody tr').length;
        // console.log(locN)
        //$('body').append('<div id=\"locate\" style=\"position:fixed;left:20px;bottom:5px;width:50px;padding:2px 0;background:#fff;border:1px solid #000;text-align:center;z-index:1111112;\">' + locN + '</div>');
    });

    //수정내용
    $(function () {
        $('table tbody tr xmp').closest('tr').addClass('open').prev('tr').children('td:last-child').css('opacity', '1').append('<a href="#none" class="btn_open">open</a>');
        $('.btn_open').click(function () {
            if ($(this).parents('tr').next('tr').hasClass('on')) {
                $('table tbody tr.open.on').removeClass('on');
                $(this).parents('tr').next('tr').removeClass('on');
                $(this).text('open');
            } else {
                $('table tbody tr.open.on').removeClass('on');
                $('table tbody td .btn_open').text('open');
                $(this).parents('tr').next('tr').addClass('on');
                $(this).text('close');
            }
        });

    });

});