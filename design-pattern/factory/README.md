# factory

- 객체를 만드는 디자인 패턴 중 하나
- `factory`라는 객체(or 클래스)의 메서드에 적절한 값을 넣으면, 상응하는 객체를 인스턴스로 만들어줌
- builder랑 다른 점은, 한방에 만들어 준다는 점.
- 그럼 언제 사용해야하지?
  - 어떤 객체를 만들어야할지 모를때. (런타임에 생성된다는 뜻)
  - 객체를 직접 만드는 비용이 비쌀때. (e.g., 사전 작업이나 의존성이 필요한 작업을 수행한 뒤 만들어야할 때)
  - 결국은, DRY(Don't Reapeat Yourself). SRP(Single Responsibility Principle)을 지키라는 것
- 사실 내가 만든 예제는 너무 간단하고, https://dev.to/jsmanifest/the-power-of-factory-design-pattern-in-javascript-2bf8 를 한번 읽어보는 것이 좋을 것 같다.
