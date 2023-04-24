# Fyrre Magazine Project

퍼블리싱 작업환경
---
- node.js : [다운로드](https://nodejs.org/ko/)
- gulp Task Tool 사용 : gulpfile.js 참조


퍼블리싱 작업내용
---
- style.scss 구조
  ```
  @import
    'utils/mixin',
    'utils/variables',
  
  @import
   'base/fonts',
   'base/normalize',
   'base/reset';

  @import
   'layout/common',
   'layout/layout';
  
  @import
    'pages/components',
    'pages/footer',
    'pages/header',
    'pages/main',
    'pages/sub_main'
    'pages/posts'
    'pages/mediaquery'
  
  ```
- 기본폰트 : GeneralSans, Sans-Serif
- mediaQuery 분기사이즈(글로벌사이트 기준)
    - mobile : ~ 640
    - tablet : 641 ~ 1023
    - pc : 1024 ~


- 기본 layout 마크업 구조
  ```
  body
  └ #wrapper 
    ├ #header : Header
    ├ #footer : Footer
    └ #container
       └ #content : 본문
          └ .section : 구역

    ```

- 파일 위치 : index.html 참조
- 컴포넌트 별 역할
  ```
  
   ├ MainContent : 메인 페이지
   │ ├ MainMagazineList : 메인 페이지 Magazine Post 섹션 
   │ ├ PodcastList : 메인 페이지, 서브페이지 latest Podcast 섹션
   │ └ MainAuthor : 메인 페이지 Author 섹션
   │
   ├ MagazineMain : 서브페이지 Magazine 메인
   │ └ MagazineList : 서브페이지 Magazine의 Post List 섹션
   │   └ MagazinePost : 각 Magazine Post의 세부 Contents
   │
   ├ AuthorsMain : 서브페이지 Author 메인
   │ └ AuthorsList : 서브페이지 Author의 List 섹션
   │   └ AuthorPost : 각 Author Post의 세부 Contents
   │     └ AuthorArticlesList : 해당 Author가 발행한 Post List
   │
   ├ PodcastMain : 서브페이지 Podcast 메인
   │ └ PodcastMainList : 서브페이지 Podcast의 List 섹션
   │   └ PodcastPost : 각 Podcast Post의 세부 Contents
   │
   ├ CompHeader : Header 컴포넌트
   ├ CompFooter : Footer 컴포넌트
   ├ NewsTicker : Main의 news-ticker 컴포넌트
   ├ Categories : Magazine Main의 Category Filter 컴포넌트
   └ NavSnsList : Main과 Post 내 SNS Link Icon List 컴포넌트
  
  ```

퍼블리싱 산출물 디렉토리 구조
---

  ```
  /root
  ├ /dev : 퍼블리셔 전용
  │　└ /css_dev : 신규 css를 위한 sass 폴더
  │　　├ /base : 웹표준, 브라우저 최적화, 웹페이지 기본 세팅 관련 scss
  │　　├ /layout : layout 및 공통 클래스 요소에 관련한 scss
  │　　├ /pages : 페이지별 세부 scss
  │　　├ /utils : sass변수, mixin 선언 scss
  │　　└ styles.scss : css 산출물 생성을 위한 gulp-sass용 scss
  │
  │　└ /node_modules : node.js 실행 관련 파일
  │
  │　└ /page_dev : gulp-html-extend 구동용 자료(퍼블 전용)
  │
  │　└ /js_dev : 페이지 동작 관련 js 생성 자료(퍼블 전용) 
  │
  │　├ gulpfile.js : gulp 작동을 위한 스크립트
  │　├ layout_template.html : gulp-html-extend용 html 파일(퍼블 전용)
  │　├ pakage.json : node.js 실행 관련 파일
  │　└ pakage-lock.json : node.js 실행 관련 파일
  │
  │
  ├ /static : 퍼블 static 소스
  │　├ /css : scss파일로 렌더링이 완료된 신규 css
  │　├ /fonts : 신규 font
  │　├ /images : 신규 images
  │　└ /js : 페이지 동작 실행 관련 신규 js
  │
  │
  ├ /components : Vue.js sfc 모음
  │　├ modules : sfc별 state 저장용 js
  │　├ app.js : Vue 실행 세팅 파일
  │　├ router.js : Vue-router 실행 세팅 파일
  │　└ store.js : Vuex 실행 세팅 파일
  │
  │
  ├ /pages : html 산출물
  │
  ├ index.html : 퍼블 마크업 리스트 html
  └ README.md : 퍼블리싱 산출물 index
  ```

퍼블리싱 작업 특이사항
---
- 타이포그래피가 많아 media query 세분화(mobile small, medium, large, tablet small, medium, large, pc small, medium, large)
- sass, html, js(인터렉션용) 산출물 작업에 gulp 사용
- 세부 페이지 마크업에 Vue.js sfc 사용

지원브라우저
---
- 엣지, 크롬, 사파리, 오페라, 파이어폭스(최신버전기준)