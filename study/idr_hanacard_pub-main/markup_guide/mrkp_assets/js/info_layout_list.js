"use strict";

/**
 * Guide List Info
 */
var infoLayoutFolder = "./mrkp_pages/";
var infoLayoutList = [//label : hidden, modify, add, end, gui, ing, chk, chk02
{
  label: "end",
  dep1: "Layout",
  dep2: "Contents",
  dep3: "",
  url: "g_lyt_contents.html",
  status: "",
  date_complete: "22.02.23",
  writer: "·ù½ÂÇö",
  etc: "<span class='red'>Contents Template File</span>"
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Header + Footer",
  dep3: "",
  url: "g_lyt_subpage.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Header + Contents + Footer",
  dep3: "",
  url: "g_lyt_subpage_2.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "ÀüÃ¼¸Ş´º",
  dep3: "",
  url: "g_lyt_allmenu.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "ÄÁÅÙÃ÷ ÅÇ, ¾ÆÄÚµğ¾ğ ¸µÅ©",
  dep3: "",
  url: "g_lyt_tab_contents.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Å×ÀÌºí",
  dep3: "»ó/ÇÏ´Ü ±ÔÄ¢",
  url: "g_lyt_tab_table.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Step",
  dep3: "",
  url: "g_lyt_step.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "½ÅÃ»",
  dep3: "",
  url: "g_lyt_apply.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Á¶È¸",
  dep3: "»ó´ÜÁ¶È¸",
  url: "g_lyt_search.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "¹è³Ê °¡ÀÌµå",
  dep3: "",
  url: "g_lyt_banner.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Contents_Top",
  dep3: "",
  url: "g_lyt_contents_top.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "ÄÁÅÙÃ÷ Á¶È¸",
  dep3: "",
  url: "g_cnt_search.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "ÀÎÁõ",
  dep3: "",
  url: "g_cnt_certi.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "ÀÎÁõ",
  dep3: "",
  url: "temp04_190626.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "¾à°ü",
  dep3: "",
  url: "g_cnt_policy.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "È¸¿ø",
  dep3: "",
  url: "g_cnt_member.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "ÆË¾÷",
  dep3: "",
  url: "g_cnt_popup.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "¿Ï·á",
  dep3: "",
  url: "g_cnt_complete.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "Etc",
  dep3: "",
  url: "g_cnt_etec.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: ""
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "°¡ÀÌµå",
  dep3: "",
  url: "g_w_pop.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: "",
  onclick: "window.open(this.href,\"À©µµ¿ìÆË¾÷\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "ÄÁÅÙÃ÷",
  dep3: "",
  url: "g_w_pop_01.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: "",
  onclick: "window.open(this.href,\"À©µµ¿ìÆË¾÷\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "Ä«µå½ÅÃ»",
  dep3: "",
  url: "g_w_pop_02.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: "",
  onclick: "window.open(this.href,\"À©µµ¿ìÆË¾÷\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "Ä«µå»ó¼¼",
  dep3: "",
  url: "g_w_pop_03.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: "",
  onclick: "window.open(this.href,\"À©µµ¿ìÆË¾÷\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "»óÀ§ ÅÇ2",
  dep3: "",
  url: "g_w_pop_04.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: "",
  onclick: "window.open(this.href,\"À©µµ¿ìÆË¾÷\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "»óÀ§ ÅÇ3 ÀÌ»ó",
  dep3: "",
  url: "g_w_pop_05.html",
  status: "",
  date_complete: "22.03.08",
  writer: "·ù½ÂÇö",
  etc: "",
  onclick: "window.open(this.href,\"À©µµ¿ìÆË¾÷\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}];