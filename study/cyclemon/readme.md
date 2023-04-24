# Cyclemon Clone Coding

퍼블리싱 작업환경
---
- HTML, Handlebars.js
- scss
- Javascript

지원브라우저
---
- 엣지, 크롬, 사파리, 오페라, 파이어폭스(최신버전기준)

퍼블리싱 작업 특이사항
---
- html 템플릿 엔진으로 [Handlebar.js](https://handlebarsjs.com/)사용
- sass 컴파일 도구로 Node.js [Sass](https://sass-lang.com/), WebStorm File Watcher 사용
- 원본 소스의 jQuery, jQuery plugins 삭제, Vanilla JS로 구현

퍼블리싱 작업내용
---

- 파일 위치 : [index.html](https://idrpubadmin.github.io/trial_pub_seok/study/cyclemon/index.html)
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
    'pages/main',
  
  ```
- 폰트
    - Lucida Sans Unicode
    - Lucida Grande
    - Georgia

- mediaQuery 분기사이즈
    - mobile : ~ 960
    - pc : 961 ~

- 기본 layout 마크업 구조
  ```
  body
  └ #wrapper 
    ├ #header : Header
    ├ #footer : Footer
    └ #container
       └ #content : 본문
          └ .section : 구역
            └ article : 단락 

    ```

퍼블리싱 산출물 디렉토리 구조
---

  ```
  /root
  ├ /dev : 퍼블리셔 전용
  │　└ /css_dev : 신규 css를 위한 sass 폴더
  │　　├ /base : 웹표준, 브라우저 최적화, 웹페이지 기본 세팅 관련 scss
  │　　├ /pages : 페이지별 세부 scss
  │　　├ /utils : sass변수, mixin 선언 scss
  │　　└ styles.scss : css 산출물 생성을 위한 scss
  │
  ├ /assets : 퍼블 static 소스
  │　├ /css : 컴파일 된 css
  │　├ /fonts : font 정적 파일 모음
  │　├ /images : images 정적 파일 모음
  │　└ /js : 템플릿 엔진, 데이터, 인터렉션 js 모음
  │　   ├ handlebars_4.7.7.js : 템플릿 엔진
  │   　├ templates.js : 템플릿, 데이터 정의 및 적용을 위한 js 파일
  │　   └ script.js : 인터렉션 정의용 js 파일
  │
  ├ /pages : html 템플릿 목록
  │　├ know.html : Know More 페이지
  │　└ show.html : Show 페이지
  │
  ├ index.html : main page
  └ README.md : 퍼블리싱 산출물 index
  ```