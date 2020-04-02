# Trip App Server

## To-do

- [x] DB 만들기

- [x] Middleware 설치하기

### 2020-03-31

- KMC

  - 서버 -> 라우터(호출) -> 컨트롤러(정의)

- KJH
  - customer 테이블에 order_count 속성 추가 (주문번호 생성 시 기준값)

### 2020-04-01

- KJH
  - routes.js 삭제 (URL에 자바스크립트 값 사용할 일이 없음)
  - routes.js 변수들 .env로 이동
  - server.js / customerRouter.js / customerController.js 정리 (함수 정의, 호출 나눔)
  - 환경변수명, 함수명 임의로 부여 함 (논의 후 수정해야 함.)

### 2020-04-02

- KJH
  - product 테이블 널 임시허용(DATA 테스트 하기 위함)
