module.exports = {
  env: {
    // 구성 파일 사용
    // browser: true,
    node: true,
    es2021: true,
    jquery: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended', // https://eslint.org/docs/latest/rules/ 에 있는 모든 기본 규칙 활성화
    'plugin:vue/vue3-essential', // vue 작업시 사용
    'plugin:prettier/recommended', // prettier 적용
  ],
  plugins: ['vue'], // vue 작업시 사용
  rules: {
    // "적용할 규칙 이름" : "off" (규칙 해제) or "warn" (경고) or "error" (오류)

    'no-undef': 'off', // 선언되지 않은 변수의 사용을 허용하지 않습니다
    'no-unused-vars': 'warn', // 사용하지 않는 변수를 허용하지 않습니다
    'spaced-comment': ['error', 'always'], // 주석에 적어도 하나의 공백이 필요합니다
    'comma-spacing': ['error', { before: false, after: true }], // 쉼표 뒤에 하나의 공백이 필요합니다
    indent: ['error', 2], // 들여쓰기수 2
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // true : 작은따옴표 or false : 큰따옴표
        endOfLine: 'auto', // vs코드 오류
      },
    ],
  },
};

/* 

// 항시 사용
'no-undef': 'off', // 선언되지 않은 변수의 사용을 허용하지 않습니다
'no-unused-vars': 'warn', // 사용하지 않는 변수를 허용하지 않습니다
'spaced-comment': ['error', 'always'], // 주석에 적어도 하나의 공백이 필요합니다
'comma-spacing': ['error', { before: false, after: true }], // 쉼표 뒤에 하나의 공백이 필요합니다
indent: ['error', 2], // 들여쓰기수 2
'prettier/prettier': [
  'error',
  {
    singleQuote: true, // true : 작은따옴표 or false : 큰따옴표
    endOfLine: 'auto', // vs코드 오류
  },
],

// 배포시 추가
'no-console': 'error', // console 사용을 금지합니다
'no-empty-function': 'error', // 빈 함수를 허용하지 않습니다

// 신규 구축시 추가
eqeqeq: 'error', // === 및 !==를 사용해야 합니다

*/

/* 규칙 설명 */

// curly (모든 제어문에 일관된 중괄호 스타일 적용)

// eqeqeq (=== 및 !==를 사용해야 합니다)

// "no-console" (console 사용금지)

// "no-empty-function" (빈 함수를 허용하지 않습니다)

// "no-var" (var 사용을 금지합니다)

// "prefer-template" (문자열 연결대신 템플릿 리터럴을 사용하게합니다)

// "spaced-comment" (주석에 일관된 간격을 적용합니다)
// 옵션: "always" or "never" (적어도 하나의 공백이 있어야 함 or 공백이 없어야 함)

/* 레이아웃 관련 규칙 */

// "indent" (들여쓰기 수를 지정합니다)
// "indent": ["error", 2]

// "comma-dangle"
// 옵션: never (후행에 쉼표를 적용하지않습니다)
// 옵션: { always : never } (후행에 쉼표를 적용하지않습니다)

// "comma-spacing" (쉼표 앞과 뒤에 일관된 간격을 적용합니다)
// 옵션: { "before": false - 기본값 } (쉼표 앞에 공백을 허용하지 않습니다.)
// 옵션: { "before": true } (쉼표 앞에 하나 이상의 공백이 필요합니다.)
// 옵션: { "after": true - 기본값 } (쉼표 뒤에 하나 이상의 공백이 필요합니다.)
// 옵션: { "after": false } (쉼표 뒤에 공백을 허용하지 않습니다.)
