import { createPackageName } from '.'

describe('package-name', () => {
  describe('createPackageName', () => {
    const fn = createPackageName

    test('basic test', () => {
      expect(fn({ a: 1, b: 2 })).toEqual({ sum: 3 })
    })
  })
})
