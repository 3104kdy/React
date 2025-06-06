#감정 일기장 개발

프로젝트 개발 순서
1 페이지 라우팅
2 글로벌 레이아웃 설정
3 공통 컴포넌트 구현
4 개별 페이지 및 내부 기능 구현

1. 라우팅 기능 활용

- MPA를 사용하지 않음 (원본을 제거하고, 새로운 페이지르 렌더링함)
- SPA를 활용함 (single page application) : 다수의 사용자가 접속해도 페이지 이동이 매끄럽고 효율적임
  > 페이지는 오직 하나밖에 없음
  > 자바 스크립트 파일은 존재함 JSX ,component 등등
  > index.html 파일 하나만 존재함 (아무것도 렌더링 안함)
  > 컴포넌트나 기능들을 묶어서 브라우저에 전달 (번들파일)
  > vite에 의해 하나의 자바스크립트 파일로 번들링 됨
  > 브라우저에서 화면을 직접 렌더링하는걸 = '클라이언트 사이드 렌더링'
  > 번들 파일이 리액트 앱이라고 불리는 것

==> index.html 하나의 페이지만 사용
==> 실제 컴포넌트들을 묶은 번들을 브라우저에 전달
==> 전달받은 컴포넌트들을 직접 브라우저에 렌더링, 페이지가 실제로 렌더링
==> 번들 파일은 리액트로 작성된 모든 파일들이 담겨있기 때문에, 리액트 app 이라고 부를 수 있음

서버에게 추가적인 요청을 하지 않음 (페이지 렌더링 관련을 리액트 앱 내부에서 처리)

- 모든 페이지와 컴포넌트의 정보가 다 포함되어 있기 때문이다.

라우팅으로 사용할 라이브러리 : reactRouter (npm i react-router-dom)

// Routes 컴포넌트 안에는 Route만 넣을 수 있음
// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
// 4, "/\*" : 잘못된 경로에 대한 NotFound 페이지

2. index.css 에는 전반적인 디자인을 세팅한다.
   폰트 및 전체에 적용되는 기본적인 디자인 세팅

#root {
background-color: white;
max-width: 600px;
width: 100%;
margin: 0 auto;
min-height: 100vh; // 여기서 말하는 vh는 현재 브라우저의 스크린 높이 (viewport height)
height: 100%;
box-shadow: rgba(100,100,100,0.2) 0px 0px 29px 0px;
}

3. 공통 컴포넌트 구현

- Button 컴포넌트 구현
- Header 컴포넌트 구현
  1. .Header > div{
     display: flex;
     }
     > > 해당 문법은 헤더 스타일 아래에 있는 모든 div 속성의 디자인을 정의하는 것
  2. justify-content: center;
     > > display 가 flex인 속성 안에서, 자식들이 배치되는 위치를 설정하는 것 (center는 가운데)
- DiaryList 컴포넌트 구현
- DiaryItem 컴포넌트 구현

########################
절대 경로 기능 추가

1. jsconfig.json 파일 추가

• 프로젝트 루트 디렉토리에 jsconfig.json 파일을 생성합니다.

2. vite.config.js 파일에서 다음과 같이 설정합니다:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
resolve: {
alias: [{ find: '@', replacement: '/src' }], // '@'를 '/src' 폴더로 대체
},
})

resolve 부분 추가
