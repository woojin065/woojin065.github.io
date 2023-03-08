---
layout: single
title: "📢 프로젝트 Vue.js 컨벤션"
toc: true
toc_sticky: true
toc_label: "프로젝트 컨벤션 by Vue.js"
categories: js
excerpt: "꼭 기억해둘것!!"
tag: [js]
---

<aside>
⚠️ **협업을 하기에 앞서 서로 소통하는 방법의 정의가 필요하다 판단하여 컨벤션을 구축함**
</aside>

# 01. Commit 컨벤션

<aside>
💡 최소한의 단위로 Commit을 쪼개서 올리는것을 전재로 함 (함수, 기능단위)

</aside>

```jsx
// 구분 [종류] 내용
F [ADD] **파일에 새로운 기능 추가
EF [MOD] 일렉트론 main.js에 **기능 수정
```

- 구분
  - F : FrontEnd
  - B: BackEnd
  - E: Electron
  - A: All
- 종류
  - [ADD] : 새로운 기능 추가, 함수 추가 등
  - [MOD] : 기존 내용에서 수정
  - [FIX] : 버그 픽스
  - [DEL] : 기존 내용 삭제, 기능 삭제 등
  - [DOC] : md 추가, doc 추가 등
- 내용
  - 한줄로 표현할 수 있는 간단한 내용

# 02. Branch 컨벤션

<aside>
💡 각 기능 개발마다, ISSUE마다 하나의 Branch를 나누어 개발, Merge는 Master Branch에 하는것을 전재로 함

</aside>

```jsx
// /브랜치종류/구분-내용

/feat/ef-electron-test
/feat/f-ui-develop
/fix/a-debug
/issue/ef-electron-error
```

- 브랜치 종류
  - /feat : 기능 개발
  - /fix : 수정, 버그 fix
  - /issue : Issue에 올릴 브랜치
- 구분
  - f : FrontEnd
  - b : BackEnd
  - e : Electron
  - a : All
- 내용
  - 한번에 알아볼 수 있는 직관적인 내용

# 03. ISSUE 컨벤션

<aside>
💡 GitHub의 CI/CD의 ISSUE를 사용하여 ISSUE 핸들링

</aside>

```jsx
// MR OPEN
// 구분 [종류] 내용
// 구분에 해결할사람의 구분자를 넣어둠
// ex) F가 B에게 요청해서 해결해야함 -> B [REQ] ***요청 -> B에서 해결 후 MR
B [MOD] /analyzer/launch API 변경 요청
A [ISSUE] Ready시 CPU 사용량 100%되는 문제

// Tag는 종류에 따라 작성
// MR 템플릿 http://gitlab.mkon/drivingex/drivingex-lm/-/issues/2 참고

기존
[ 내용 ]

수정
[ 내용 ]

// 으로 MR을 보냄

// MR Close
// Open한 MR에 Comment를 남긴 후 Close
```

# 04. Google Style Guide(js) 사용

```jsx
> npx eslint --init

? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style

? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? ...
  React
> Vue.js
  None of these

? Does your project use TypeScript? » No

? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node

? How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style

? Which style guide do you want to follow? ...
  Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
> Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
```

## 1. `.eslintrc.js` 수정

```jsx
// eslintrc.js

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "google"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    requireJsdoc: false,
  },
};

// prettier 랑 충돌 시 우선 순위 설정

// npm install eslint-plugin-prettier eslint-config-prettier --save-dev

//{
//    plugins: ["prettier"],
//    extends: ["plugin:prettier/recommended"],
//    rules: {
//        "prettier/prettier": "error"
//    }
//}
```

## 2. Prettier 설치

```bash
npm install --save-dev --save-exact prettier
```

이후 .prettierrc.js 파일 최상위에 생성

```jsx
// .prettierrc.js

module.exports = {
  arrowParens: "always", // 화살표 함수 괄호 사용 방식
  bracketSpacing: false, // 객체 리터럴에서 괄호에 공백 삽입 여부
  endOfLine: "if", // EoF 방식, OS별로 처리 방식이 다름
  htmlWhitespaceSensitivity: "css", // HTML 공백 감도 설정
  jsxBracketSameLine: false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  jsxSingleQuote: true, // JSX에 singe 쿼테이션 사용 여부
  printWidth: 80, //  줄 바꿈 할 폭 길이
  proseWrap: "never", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  quoteProps: "as-needed", // 객체 속성에 쿼테이션 적용 방식
  semi: true, // 세미콜론 사용 여부
  singleQuote: true, // single 쿼테이션 사용 여부
  tabWidth: 2, // 탭 너비
  trailingComma: "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  useTabs: false, // 탭 사용 여부
  vueIndentScriptAndStyle: false, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
  requirePragma: false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  insertPragma: false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
};
```

## 3. extentions

![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/0.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/1.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/3.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/4.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/2.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/5.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/6.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/7.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/8.png)
![image](../../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/9.png)

---

### 3.1 추천확장

![image](../../images/../kim-song-jun.github.io/images/2023-03-06-convention.md/10.png)

# 05. Naming Convention

모든 규칙은 google js style guide와 vue.js style guide 를 참조하고 따름

## Naming

1. Package names: `lowerCamelCase` ex) `my.exampleCode.deepSpace`
2. Class names: `UpperCamelCase` ex) `ImmutableList`
3. Method names: `lowerCamelCase` ex) `setFoo(value)`
4. Constant names: `CANSTANT_CASE`
5. Non-constant field names: `lowerCamelCase` ex) `computedValues`
6. Parameter names: `lowerCamelCase`
7. Local variable names: `lowerCamelCase`

## By Vue

[https://v2.vuejs.org/v2/style-guide/?redirect=true#Priority-B-Rules-Strongly-Recommended-Improving-Readability](https://v2.vuejs.org/v2/style-guide/?redirect=true#Priority-B-Rules-Strongly-Recommended-Improving-Readability) 참조, B 까지 꼭 지켜야
