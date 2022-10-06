import { MyMaybe, MyNonFunctionProperties } from '../../implement-utility-types'

// Reference: https://siosio3103.medium.com/typescript-%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4-0-builder-%EB%B9%8C%EB%8D%94-%ED%8C%A8%ED%84%B4-90552ae0b763
type IBuilder<T> = {
  [Key in keyof MyNonFunctionProperties<T> as Key extends string ? `set${Capitalize<Key>}` : never]: (
    arg: T[Key]
  ) => IBuilder<T>
}

class BuilderBase<T> {
  public receiver: T

  constructor(ctor: new () => T) {
    this.receiver = new ctor()
  }

  build(): T {
    return this.receiver
  }
}

class Macbook {
  cpu: MyMaybe<'Intel' | 'M1' | 'M2'> = null
  core: MyMaybe<4 | 8> = null
  ram: MyMaybe<8 | 16 | 32> = null
  ssdCapacity: MyMaybe<256 | 512 | 1024> = null

  toString() {
    return `${this.cpu}:${this.core}:${this.ram}:${this.ssdCapacity}`
  }
}

export class MacbookBuilder extends BuilderBase<Macbook> implements IBuilder<Macbook> {
  constructor() {
    super(Macbook)
  }

  setCpu(arg: Macbook['cpu']) {
    this.receiver.cpu = arg
    return this
  }
  setCore(arg: Macbook['core']) {
    this.receiver.core = arg
    return this
  }
  setRam(arg: Macbook['ram']) {
    this.receiver.ram = arg
    return this
  }
  setSsdCapacity(arg: Macbook['ssdCapacity']) {
    this.receiver.ssdCapacity = arg
    return this
  }
}
