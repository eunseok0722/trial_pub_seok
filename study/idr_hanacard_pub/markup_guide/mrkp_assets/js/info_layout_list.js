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
  writer: "������",
  etc: "<span class='red'>Contents Template File</span>"
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Header + Footer",
  dep3: "",
  url: "g_lyt_subpage.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Header + Contents + Footer",
  dep3: "",
  url: "g_lyt_subpage_2.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "��ü�޴�",
  dep3: "",
  url: "g_lyt_allmenu.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "������ ��, ���ڵ�� ��ũ",
  dep3: "",
  url: "g_lyt_tab_contents.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "���̺�",
  dep3: "��/�ϴ� ��Ģ",
  url: "g_lyt_tab_table.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Step",
  dep3: "",
  url: "g_lyt_step.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "��û",
  dep3: "",
  url: "g_lyt_apply.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "��ȸ",
  dep3: "�����ȸ",
  url: "g_lyt_search.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "��� ���̵�",
  dep3: "",
  url: "g_lyt_banner.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Layout",
  dep2: "Contents_Top",
  dep3: "",
  url: "g_lyt_contents_top.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "������ ��ȸ",
  dep3: "",
  url: "g_cnt_search.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "����",
  dep3: "",
  url: "g_cnt_certi.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "����",
  dep3: "",
  url: "temp04_190626.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "���",
  dep3: "",
  url: "g_cnt_policy.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "ȸ��",
  dep3: "",
  url: "g_cnt_member.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "�˾�",
  dep3: "",
  url: "g_cnt_popup.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "�Ϸ�",
  dep3: "",
  url: "g_cnt_complete.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Contents",
  dep2: "Etc",
  dep3: "",
  url: "g_cnt_etec.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: ""
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "���̵�",
  dep3: "",
  url: "g_w_pop.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: "",
  onclick: "window.open(this.href,\"�������˾�\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "������",
  dep3: "",
  url: "g_w_pop_01.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: "",
  onclick: "window.open(this.href,\"�������˾�\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "ī���û",
  dep3: "",
  url: "g_w_pop_02.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: "",
  onclick: "window.open(this.href,\"�������˾�\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "ī���",
  dep3: "",
  url: "g_w_pop_03.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: "",
  onclick: "window.open(this.href,\"�������˾�\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "���� ��2",
  dep3: "",
  url: "g_w_pop_04.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: "",
  onclick: "window.open(this.href,\"�������˾�\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}, {
  label: "end",
  dep1: "Win Pop",
  dep2: "���� ��3 �̻�",
  dep3: "",
  url: "g_w_pop_05.html",
  status: "",
  date_complete: "22.03.08",
  writer: "������",
  etc: "",
  onclick: "window.open(this.href,\"�������˾�\",\"width=1200,height=810,scrollbars=yes,resizable=yes\"); return false;"
}];