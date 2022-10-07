import { MyMaybe } from '../../implement-utility-types'

interface Device {
  cpu: 'Intel' | 'M1' | 'M2'
  core: 4 | 8
  ram: 8 | 16 | 32
  ssdCapacity: 256 | 512 | 1024
}

interface HardwareConstructor {
  new (args?: Device): Device
}

export const Macbook = function Macbook(this: Device, args?: Device) {
  this.cpu = args?.cpu || 'Intel'
  this.core = args?.core || 4
  this.ram = args?.ram || 8
  this.ssdCapacity = args?.ssdCapacity || 512
} as unknown as HardwareConstructor

export const Imac = function Imac(this: Device, args?: Device) {
  this.cpu = args?.cpu || 'Intel'
  this.core = args?.core || 8
  this.ram = args?.ram || 16
  this.ssdCapacity = args?.ssdCapacity || 1024
} as unknown as HardwareConstructor

export const Ipad = function Ipad(this: Device, args?: Device) {
  this.cpu = args?.cpu || 'Intel'
  this.core = args?.core || 4
  this.ram = args?.ram || 8
  this.ssdCapacity = args?.ssdCapacity || 256
} as unknown as HardwareConstructor

const device = { Macbook, Imac, Ipad }
type DeviceType = keyof typeof device

export const deviceFactory = {
  createDevice: (type: DeviceType, args?: Device) => {
    const DeviceCtor = device[type]
    return new DeviceCtor(args)
  },
}
