//.stylelintrc.json 를 rule 설명을 위한 위한 가이드 js (사용하지 않는 js)
const temp =
  {
    "extends": [
      "stylelint-config-standard-scss",
      "stylelint-config-prettier"
    ],
    "plugins": [
      "stylelint-scss",
      "stylelint-order"
    ],
    "rules": {
      // true : 사용 여부
      // always or never: 유무

      // scss와 유사한 달러 변수의 통일된 패턴 지정.
      // ex) 카멜, 케밥 혼합하여 사용불가
      // 옵션 : regex or string
      "scss/dollar-variable-pattern": null,

      //들여쓰기 간격
      "indentation": 2,

      // 문자열에 작은따옴표 또는 큰따옴표 지정.
      // ex) content: '내용';
      // 옵션 : single(작) or double(큰)
      "string-quotes": "single",

      // 중복 선택자 사용 여부 설정.
      // ex) .t1, .t2, t1 ( true 설정시 오류o ) / .t1 { .t1 {} } ( 오류아님 )
      "no-duplicate-selectors": true,

      // 헥사코드 소문자, 대문자 기본 설정
      // 옵션: lower(소문자) or upper(대문자)
      "color-hex-case": "lower",

      // 헥사코드의 길이 기본 설정
      // 옵션: short(ex. #fff ) or long(ex. #ffffff)
      "color-hex-length": "short",

      // 색상의 이름 지정 사용 여부 설정
      // ex. color: black; ( 오류아님 ) or never ( 색상의 이름을 지정해서는 안됨 / color: black; 오류o )
      // 옵션: always-where-possible( 색상은 항상 이름을 지정해야 함
      "color-named": "never",

      // 색상 기능 표기법
      // 옵션 : modern or legacy
      "color-function-notation": "modern",

      // 선택자 뒤에 공백 유무 설정
      // 옵션: always( ex. a + b ) or never ( ex. a+b )
      "selector-combinator-space-after": "always",

      // 속성 값 따옴표 유무 설정
      //  옵션: always( [target='_blank'] ) or never ( [target=blank] )
      "selector-attribute-quotes": "always",

      // 연산자 앞에 공백 유무 설정
      // 옵션: always( [target =_blank] ) or never( [target=_blank] )
      "selector-attribute-operator-space-before": "never",

      // 연산자 뒤에 공백 유무 여부 설정
      // 옵션: always( [target= _blank] ) or never( [target=_blank] )
      "selector-attribute-operator-space-after": "never",

      // 연산자 안에 공백 유무 설정
      // 옵션: always( [ target= _blank ] ) or never( [target=_blank] )
      "selector-attribute-brackets-space-inside": "never",

      // 스타일 안의 맨 마지막 코드 뒤에 세미콜론 유무 설정
      // 옵션: always( background: orange; color: pink; ) or never( background: orange; color: pink )
      "declaration-block-trailing-semicolon": "always",

      // 콜론 앞의 공백 유무 설정
      // 옵션: always( color : pink or color :pink ) or never( color: pink or color:pink )
      "declaration-colon-space-before": "never",

      // 콜론 뒤의 공백 유무 설정
      // 옵션: always( color : pink or color: pink ) or never( color :pink or color:pink )
      "declaration-colon-space-after": "always",

      // 비표준 공급업체( 크로스 브라우징 ) 접두어 사용 여부 설정.
      // ex) -webkit-transform: scale(1); ( true 설정시 오류o ) / transform: scale(1) ( 오류아님 )
      // 옵션: true
      "property-no-vendor-prefix": null,

      // 스타일 값에 대한 비표준 공급업체( 크로스 브라우징 ) 접두어 사용 여부 설정
      // ex) display: -webkit-flex; ( true 설정시 오류o ) / display: flex; ( 오류아님 )
      // 옵션: true
      "value-no-vendor-prefix": null,

      // 1보다 작은 소수에 0의 유무 설정
      // 옵션: always( line-height: 0.5; ) or never ( line-height: .5; )
      "number-leading-zero": "always",

      // 숫자 최대 정밀도
      // 옵션: 허용되는 최대 소수 자릿수
      "number-max-precision": 8,

      // url 사용 시 따옴표 유무 설정
      // 옵션: always( background: url('x.jpg'); ) or never( background: url(x.jpg); )
      "function-url-quotes": "always",

      // font-family의 이름 따옴표 유무 설정
      // 옵션: always-unless-keyword ( 모든 font-family에 이름이 있어야 함 / font-family: "Times New Roman", "Times", serif; ) or always-where-required ( 따옴표가 필요한 경우에만 사용하고, 나머지는 사용안함 / font-family: 'Times New Roman', Times, serif; )
      //       or always-where-recommended ( 권장 되는 경우에만 필요하고, 다른 경우에는 허용하지 않음 / ex1. font-family: "MyFontVersion6", "sake_case_font"; ex2. font-family: Arial, sans-serif; ex3. font: 1em 'Times New Roman', Times, serif; )
      "font-family-name-quotes": "always-where-recommended",

      // 주석 내부의 공백 유무 설정
      // 옵션: always( /* comment */ ) or never( /*comment*/ )
      "comment-whitespace-inside": "always",

      // 주석 앞에 빈 줄 유무 설정
      // 옵션: always ( a {}           or   never ( a {}
      //                                           /* comment */
      //              /* comment */ )
      "comment-empty-line-before": "always",

      // at(@) 비표준 공급업체( 크로스 브라우징 ) 접두사 사용 여부 설정
      // 옵션: true ( @-webkit-keyframes { 0% { top: 0; } } )
      "at-rule-no-vendor-prefix": null,

      // at(@) 이름의 대소문자 지정 여부
      // 옵션 : lower( 소문자. @charset 'UTF-8'; ) or upper( 대문자. @CHARSET 'UTF-8'; )
      "at-rule-name-case": "lower",

      // at(@) 이름의 뒤의 공백 유무 설정
      // 옵션: always( 항상 "하나"의 공백이 있어야함. ex. @charset "UTF-8"; ) or always-single-line( 뒤에 공백이 있어야하는 것은 동일하나, 2줄 가능. ex. @media(min-width: 700px) and ( 한줄띄기 ) (orientation: portrait) {} )
      "at-rule-name-space-after": "always",

      // at(@) 규칙에서 세미콜론 앞의 하나의 공백 유무 설정
      // 옵션: always( @import "components/buttons" ; ) or never( @import "components/buttons"; )
      "at-rule-semicolon-space-before": "never",

      // 적용된 스타일들 사이에 한줄 공백 유무 설정
      // 옵션: always( 항상 한줄 띄어쓰기 ) or never ( 한줄 공백 불가 ) or always-multi-line ( a { ( 한줄띄기 ) } 방식을 사용하나, 사이에 항상 한줄 띄어쓰기 ) or never-multi-line ( a { ( 한줄띄기 ) } 방식을 사용하나, 사이에 한줄 공백 불가 )
      // 선택적 보조 옵션(except 앞부분 설정): after-rule, after-single-line-comment, inside-block-and-after-rule, inside-block, first-nested
      // 선택적 보조 옵션(except 뒷부분 설정): after-comment, first-nested, inside-block
      // 상세url : https://stylelint.io/user-guide/rules/rule-empty-line-before/
      "rule-empty-line-before": ["always-multi-line", {
        "except": ["after-single-line-comment", "first-nested"]
      }],

      // 가상 클래스에서 내부 스타일 공백 여부 설정
      // 옵션: always( input:not( [type="submit"] ) {} ) or never( input:not([type="submit"]) {} )
      "selector-pseudo-class-parentheses-space-inside": "always",

      // 가상 요소의 비표준 공급업체( 크로스 브라우징 ) 사용 여부 설정
      // 옵션: true ( ex. input::-moz-placeholder {} ( true 설정시 오류o ) / input::placeholder {} ( 오류아님 ) )
      "selector-no-vendor-prefix": null,

      // @media의 범위 연산자 앞에 공백 유무 설정
      // 옵션: always( 범위 연산자 앞에는 항상 공백이 있어야함. @media (width >= 600px) {} or @media (width >=600px) {} ) or never( 범위 연산자 앞에는 항상 공백이 없어야함. @media (width>=600px) {} or @media (width>= 600px) {} )
      "media-feature-range-operator-space-before": "always",

      // @media의 범위 연산자 뒤에 공백 유무 설정
      // 옵션: always( 범위 연산자 뒤에는 항상 공백이 있어야함. @media (width >= 600px) {} or @media (width>= 600px) {} ) or never( 범위 연산자 앞에는 항상 공백이 없어야함. @media (width>=600px) {} or @media (width >=600px) {} )
      "media-feature-range-operator-space-after": "always",

      // @media의 괄호 안 공백 유무 설정
      // 옵션: always( @media ( max-width: 300px ) {} ) or never( @media (max-width: 300px) {} )
      "media-feature-parentheses-space-inside": "always",

      // @media의 비표준 공급업체( 크로스 브라우징 ) 사용 여부 설정
      // 옵션: true ( ex. @media (-webkit-min-device-pixel-ratio: 1) {} ( true 설정시 오류o) / @media (max-resolution: 900dpi) {} ( 오류아님 ) )
      "media-feature-name-no-vendor-prefix": null,

      // @media의 콜론 앞 공백 유무 설정
      // 옵션: always( 콜론 앞에는 항상 공백이 있어야함. @media (max-width : 600px) {} or @media (max-width :600px) {} ) or never( 콜론 앞에는 항상 공백이 없어야함. @media (max-width: 600px) {} or @media (max-width:600px) {} )
      "media-feature-colon-space-before": "never",

      // @media의 콜론 뒤 공백 유무 설정
      // 옵션: always( 콜론 뒤에는 항상 공백이 있어야함. @media (max-width : 600px) {} or @media (max-width: 600px) {} ) or never( @media (max-width :600px) {} or @media (max-width:600px) {} )
      "media-feature-colon-space-after": "always",

      // 키프레임 블록 내에서 중복 선택기를 허용하지 않습니다.
      "keyframe-block-no-duplicate-selectors": null,

      // 스타일 빈줄 공백 갯수 제한 설정
      // 0일 경우 ex) a {
      //
      //                 padding: 10px
      //              }
      // -> 위의 경우 빈줄이 1개 포함되었으므로 오류로 간주
      "value-list-max-empty-lines": 0,

      // 스타일 빈줄 공백 유무 설정
      // 옵션: always( 빈줄 공백이 있어야함 ) or never( 빈줄 공백을 허용하지 않음 )
      "declaration-empty-line-before": "never",

      // 빈블록 사용 여부 설정
      // 옵션: true( a {} or  a { } ( true 설정시 오류o ) )
      "block-no-empty": true,

      // 스타일 중복값 사용 여부 설정
      // 옵션: true ( a { margin: 1px 1px; } or a { margin: 1px 1px 1px 1px; } ( true 설정시 오류o ) / a { margin: 1px; } ( 오류아님 ) )
      "shorthand-property-no-redundant-values": true,

      // 내림차순 특이성 없음
      "no-descending-specificity": null,

      "order/order": [
        "custom-properties",
        "dollar-variables",
        "declarations",
        "at-rules"
      ],
      "order/properties-alphabetical-order": true,

      // color 색상값에 소수점 사용 number, 퍼센트 사용 percentage
      "alpha-value-notation": "number"
    }
  }

const otherMemo =
  {
    "rules": {
      // 동일한 @import를 중복 선언 사용 여부 설정
      // 옵션: true ( @import "a.css"; @import "a.css"; ( ture 설정시 오류o ) )
      // no-duplicate-at-import-rules: true

      // calc 사용 시 연산자 앞뒤의 공백의 공통화 사용 여부 설정
      // 옵션: true ( a { top: calc(1px+2px); } or a { top: calc(1px+ 2px); } ( true 설정시 오류o) / a { top: calc(1px + 2px); } or  a { top: calc(calc(1em*2)/3); } ( 오류x ) )
      // function-calc-no-unspaced-operator: true

      // css 변수 작성 시, var 누락 사용 여부 설정
      // 옵션: true ( a { color: --foo; } ( true 설정시 오류o ) /  a { color: var(--foo); } ( 오류아님 ) )
      // custom-property-no-missing-var-function: true

      // gradient 사용 시 비표준 방향값 사용 여부 설정
      // 옵션: true ( .foo { background: linear-gradient(top, #fff, #000); } ( true 설정시 오류o ) / .foo { background: linear-gradient(to top, #fff, #000); } ( 오류아님 ) )
      // function-linear-gradient-no-nonstandard-direction: true

      // !important 사용 여부 설정
      // 옵션: true ( a { color: pink !important; } ( true 설정시 !important만 사용해도 오류o ) )
      // declaration-no-important: true

      // 허용되는 단위 옵션 설정
      // unit-allowed-list
      // array|string: ["array", "of", "units"]|"unit"
      // ex. ["px", "em", "deg"] / 단위 설정 시, 설정되어 있지 않은 단위로 작성시 오류o
      // 상세url : https://stylelint.io/user-guide/rules/unit-allowed-list

      // style depth(N) 설정
      // int: 숫자
      // ex. int: 2 ( depth 2까지만 허용 )
      // 상세url : https://stylelint.io/user-guide/rules/max-nesting-depth#options

    }
  }
