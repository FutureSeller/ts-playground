type Maybe<T> = T | null

export class Macbook {
  cpu: Maybe<'Intel' | 'M1' | 'M2'>
  core: Maybe<4 | 8>
  ram: Maybe<8 | 16 | 32>
  ssdCapacity: Maybe<256 | 512 | 1024>

  constructor(builder: MacbookBuilder) {
    this.cpu = builder.cpu
    this.core = builder.core
    this.ram = builder.ram
    this.ssdCapacity = builder.ssdCapacity
  }

  toString() {
    return `${this.cpu}:${this.core}:${this.ram}:${this.ssdCapacity}`
  }
}

export class MacbookBuilder {
  cpu: Maybe<'Intel' | 'M1' | 'M2'> = null
  core: Maybe<4 | 8> = null
  ram: Maybe<8 | 16 | 32> = null
  ssdCapacity: Maybe<256 | 512 | 1024> = null

  setCpu(arg: MacbookBuilder['cpu']) {
    this.cpu = arg
    return this
  }

  setCore(arg: MacbookBuilder['core']) {
    this.core = arg
    return this
  }

  setRam(arg: MacbookBuilder['ram']) {
    this.ram = arg
    return this
  }

  setSsdCapacity(arg: MacbookBuilder['ssdCapacity']) {
    this.ssdCapacity = arg
    return this
  }

  build() {
    return new Macbook(this)
  }
}
