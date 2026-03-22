# Test 

## Testing Tool
 - jest 
 
## API
 - API 가 정상적으로 호출 되는가
 - 성공/실패에 응답에 따른 분기 처리가 올바른가
 - 에러 핸들링이 정상적으로 작동 하는가    

# 컴포넌트 
 - 컴포넌트가 정상적으로 마운트 되는가
 - props / state 변화에 따라 UI가 올바르게 변경되는가
 - store 상태 변경이 의도대로 동작하는가
 - hook 내부 로직이 정상적으로 실행되는가

## Test Scope 
- app/(pages): 페이지 단위 렌더링 및 라우팅 테스트
- entities: 도메인 모델 및 비즈니스 로직 테스트
- features: 사용자 인터랙션 및 기능 단위 테스트
- shared
  - api: API 호출 및 응답 처리 테스트
  - hook: 커스텀 훅 동작 테스트
  - store: 상태 관리 로직 테스트
  - ui: 공통 UI 컴포넌트 테스트