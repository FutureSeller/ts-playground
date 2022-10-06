import { MacbookBuilder } from '..'
import { MacbookBuilder as EnhancedMacbookBuilder } from '../enhance'

describe('builder pattern', () => {
  describe('MacbookBuilder', () => {
    test('make object with builder', () => {
      const macbuilder = new MacbookBuilder()
      const mac1 = macbuilder.setCore(4).setCpu('M1').setRam(8).setSsdCapacity(512).build()

      expect(mac1.toString()).toEqual('M1:4:8:512')
    })
  })

  describe('EnhancedMacbookBuilder', () => {
    test('make object with builder', () => {
      const macbuilder = new EnhancedMacbookBuilder()
      const mac1 = macbuilder.setCore(4).setCpu('M1').setRam(8).setSsdCapacity(512).build()

      expect(mac1.toString()).toEqual('M1:4:8:512')
    })
  })
})
