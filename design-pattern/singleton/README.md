# singleton

- 하나의 인스턴스만 두고 전역에서 접근 가능한 클래스 혹은 객체. 앱 전역에서 공유되기 때문에 전역 상태 관리하기 적합
- 메모리는 많이 아낌
- 실행 순서가 중요해짐
  - 테스트를 할 때 들어있는 값을 초기화해줘야하거나,
  - 버그를 재현할 때 까다로울 수 있음
