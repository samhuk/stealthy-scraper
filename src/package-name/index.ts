import { PackageName, PackageNameOptions } from './types'

export const createPackageName = (options: PackageNameOptions): PackageName => ({
  sum: options.a + options.b,
})
