# builder

- 객체 표현과 생성과정을 분리한 것
- 생성자의 parameter가 많거나 (흠... 글쎄? 객체로 묶으면 되지않나? 프로퍼티가 엄청 많을 경우?)

  - `new Macbook(1,2,2,2,2,2,2,2,2,2)`
  - `new Macbook({ cpu: 1, core: 1, ram: 1, ssdCapacity: 1, ....rest })`
  - `builder.setCpu().setCore().setRam().setSsdCapacity().setColor().setBlabla()`

- cli로 설정값을 받아서 객체를 생성할때 괜찮아보이고..
- 필수값입력은 builder에서, 파생된 값 생성은 모델에서라면 이해가 좀 되는 것 같기도 하고. 그래도 글쎄.. 너무 verbose하다.
