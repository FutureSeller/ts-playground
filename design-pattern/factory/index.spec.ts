import { deviceFactory, Macbook, Imac } from '.'

describe('factory', () => {
  test('get device from factory', () => {
    const myMacbook = deviceFactory.createDevice('Macbook', {
      core: 4,
      cpu: 'Intel',
      ram: 8,
      ssdCapacity: 256,
    })
    expect(myMacbook).toEqual(new Macbook({ core: 4, cpu: 'Intel', ram: 8, ssdCapacity: 256 }))

    const myImac = deviceFactory.createDevice('Imac')
    expect(myImac).toEqual(new Imac())
  })
})
