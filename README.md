#Discover Exhibitions

## 전시정보를 제공하는 사이트 입니다.
https://next-exhibition.vercel.app/

## 개발 환경
 - node@20.18.3
 - pnpm@10.2.0

## 기술 스택 
 - 프레임워크 : Next.js@16.0.10
 - 상태 관리 : react-query, zustand
 - UI / 스타일링 : styled-components
 - 언어 : TypeScript

## 아키텍처 : FSD
 - entities : 전시 도메인 API, 최소 단위 UI
 - features : 검색/공유 등 사용자 행동 단위 기능 + zustand store
 - widgets : 페이지를 구성하는 조립 단위 UI

## 전략 
 _ App Router 기반 구조 설계 : page.tsx(서버 컴포넌트), _view.tsx(클라이언트 컴포넌트), layout.tsx(root) 로 렌더링 책임 분리
 - index.tsx(UI), _html.ts(styled-components) 구조로 스타일, 로직 결합 최소화
 - React Query Hydration을 활용한 SSR + CSR 하이브리드 패턴 (index, 상세페이지)
 - 스크롤 위치 및 브라우저 사이즈에 따른 조건부 UI 렌더링 (index)
 - 검색 전용 페이지를 분리하지 않고, React Query의 queryKey 변경을 통해 동일한 목록 뷰에서 검색 결과를 처리
 - generateMetadata를 활용한 페이지 단위 동적 SEO 메타데이터 구성

## 주요 특징 
 - 반응형 웹
 - 컴포넌트 기반 설계
 - Intercepting Route를 활용한 상세 페이지 모달 팝업 UI 구현
 - 공공데이터포털 open api 사용
 - 페이지 전환/검색/추가 데이터 요청 등 주요 비동기 흐름을 Zustand로 전역 상태화하여 일관된 로딩 UI 제공
 - 여러 UI 컴포넌트에서 동일한 검색어 입력값을 참조해야 해, Zustand로 검색 상태를 전역 관리하여 검색어 상태 공유
 - 검색어 입력시 Debounce 를 적용해 검색 입력에 따른 불필요한 API 호출 최소화
   (검색어 입력후 0.5 초간 반응이 없으면 검색 API 호출)

