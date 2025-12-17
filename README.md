#Discover Exhibitions

## 전시정보를 제공하는 사이트 입니다.

## 개발 환경
 - node@20.18.3
 - pnpm@10.2.0

## 기술 스택 
 - 프레임워크 : Next.js@16.0.10
 - 상태 관리 : react-query, zustand
 - UI / 스타일링 : styled-components
 - 언어 : TypeScript

## 아키텍처 및 전략 
 - 라우트 구조(app) 와 UI 컴포넌트 구조(component) 를 1:1로 대응
 - 역할 분리형, 재사용 가능성 컴포넌트 패턴 (Index.tsx, _html.ts, 그외 부속 컴포넌트)
 - React Query Hydration을 활용한 SSR + CSR 하이브리드 패턴 (index, 상세페이지)
 - 스크롤 위치 및 브라우저 사이즈에 따른 조건부 UI 랜더링 (index)
 - 검색 전용 페이지를 분리하지 않고, React Query의 queryKey 변경을 통해 동일한 목록 뷰에서 검색 결과를 처리

## 주요 특징 
 - 반응형 웹
 - 컴포넌트 기반 설계
 - Intercepting Route를 활용한 상세 페이지 모달 팝업 UI 구현
 - 공공데이터포털 open api 사용
 - 검색어 입력시 Debounce 를 적용해 검색 입력에 따른 불필요한 API 호출 최소화
   (검색어 입력후 0.5 초간 반응이 없으면 검색 API 호출)


## 웹의 기능 
