# IDR_Pub_Guide

퍼블리싱 작업환경
---
- node.js : [다운로드](https://nodejs.org/ko/)
- gulp Task Tool 사용 : gulpfile.js 참조


퍼블리싱 작업내용
---
- display.scss 구조
  ```
  @import
   'base/frontend_min_overwrite',
   'base/org_page_inside',
   'base/org_page_inside_sizeguide',
   'base/org_page_inside_overwrite';

  @import
   'base/font',
   'base/common',
   'base/header',
       :
       :
  ```
- 기본폰트 : Arket Sans, Arket Sans SC, Noto Sans KR
- mediaQuery 분기사이즈(글로벌사이트 기준)
    - mobile : ~ 400
    - tablet : 401 ~ 630 or 401 ~ 768
    - pc : 769 ~ 1024 or 1025 ~
- 기본 layout 마크업 구조
  ```
  <html>
    <head>
      
      <link rel="stylesheet" href="<%= pageInfo.root %>/org/etc/designs/appeaser/p11/pattern-lib/frontend.min.1987a0f885a03ad325376517da7bed68.css" type="text/css">
  
      <link rel="stylesheet" href="<%= pageInfo.root %>/css/jquery-ui.css" type="text/css">
  
      <!-- frontend.renew.css -->
      <link rel="stylesheet" href="<%= pageInfo.root %>/css/frontend.renew.css" type="text/css">
      <!-- //frontend.renew.css -->
  
    </head>
    <body data-component="OPage" class="layout-inside" id="oPage">
      
      <div id="site-banner-id" data-component="MSiteBanner" class="m-site-banner slide-down" style="background-color: rgb(0, 0, 0);"></div>
      
      <div class="u-no-select">
        <header data-component="OHeader" class="o-header hide-departments">
          헤더
        </header>
      </div>
  
      <div data-component="OPageContent" class="o-page-content cofs-page">
         본문
      </div>
  
      <div class="u-no-select" id="footer_warp">
        <footer class="o-footer o-footer-top u-clearfix">
          푸터메뉴
        </footer>
        <footer class="o-footer v2 u-clearfix">
          푸터
        </footer>
      </div>
  
      <script src="<%= pageInfo.root %>/org/etc/designs/appeaser/p11/pattern-lib/frontend.min.53fbce400c01c000a192f9a286ec0c06.js"></script>
      <script src="<%= pageInfo.root %>/org/etc/designs/appeaser/p11/pattern-lib/controllers/controllers.js"></script>
  
      <!-- frontend.renew.js -->
      <script src="<%= pageInfo.root %>/js/jquery-ui.js"></script>
      <script src="<%= pageInfo.root %>/js/frontend.renew.js" defer></script>
      <!-- //frontend.renew.js -->
      
    </body>  
  </html>
  ```

- 파일 위치 : 

퍼블리싱 산출물 디렉토리 구조
---

/root

├ /dev : 신규 css를 위한 sass 폴더

│　└ /css_dev : 신규 css를 위한 sass 폴더

│　　├ /base : layout 및 페이지 기본 요소에 관련한 scss

│　　　├ frontend_min_overwrite : frontend.min.css에서 특정 속성을 재선언하는 scss

│　　　├ org_page_inside : 글로벌사이트에서 html에 inline 으로 선언되어 있던 css

│　　　├ org_page_inside_overwrite : org_page_inside에서 특정 속성을 재선언하는 scss

│　　　└ org_page_inside_sizeguide : org_page_inside에서 사이즈가이드 관련 속성을 재선언하는 scss

│　　├ /pages : 페이지별 scss

│　　├ /utils : scss mixin 관련 scss

│　　├ frontend.renew.error.scss : error pages에서만 사용하는 scss

│　　└ frontend.renew.scss : 그 외 모든 pages에서 사용하는 scss

├ /dist : [official site] html 로 변환된 퍼블 산출물

│　└ /ko

├ /dist-sis : [shop in shop(Use iFrame)] html 로 변환된 퍼블 산출물

│　└ /ko

├ /dist-sis-con : [shop in shop(For iFrame)] html 로 변환된 퍼블 산출물

│　└ /ko

├ /static : 퍼블 static 소스

│　├ /css : scss파일로 렌더링이 완료된 신규 css

│　├ /fonts : 신규 font

│　├ /js : 신규 images

│　├ /js : 신규 js

│　└ /org : 기존 사이트(글로벌사이트) static 소스

├ /temp : 글로벌사이트에서 확인한 페이지 마크업 임시 저장 폴더

├ /views : ejs 관련 파일

│　└ /common : page 별 include ejs 파일

│　└ /handlebars : handlebars ejs 파일(ex. 레이어 팝업)

│　└ /pages : page 별 ejs 파일

├ app.js : express 관련 파일

├ index.html : 퍼블 마크업 리스트 html

└ package.json : node.js 관련 파일


퍼블리싱 작업 특이사항
---
- 특이사항 1

지원브라우저
---
- IE11, 엣지, 크롬, 사파리, 오페라, 파이어폭스(최신버전기준)