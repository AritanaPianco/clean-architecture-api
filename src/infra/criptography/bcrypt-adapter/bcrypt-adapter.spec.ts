// implementação do protocolo Hasher
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashedValue'))
  },
  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 8
  const sut = new BcryptAdapter(salt)
  return {
    sut,
    salt
  }
}

describe('Bcrypt Adapter', () => {
  test('should call hash with correct value', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const hashedValue = await sut.hash('any_value')
    expect(hashedValue).toBe('hashedValue')
  })
  test('should throw if hash throws', async () => {
    const { sut } = makeSut()
    const hashed = jest.spyOn(bcrypt, 'hash') as jest.Mock
    hashed.mockRejectedValueOnce(new Error())
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
  test('should call comparer with correct value', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
  test('should return true when comparer succeeds', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })
  test('should return false when compare fails', async () => {
    const { sut } = makeSut()
    type mockCompareImplementation = (value: string, hash: string) => Promise<boolean>
    (bcrypt.compare as mockCompareImplementation) = jest.fn(async () => { return await Promise.resolve(false) })
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
  test('should throw if compare throws', async () => {
    const { sut } = makeSut()
    type mockCompareImplementation = (value: string, hash: string) => Promise<boolean | Error>
    (bcrypt.compare as mockCompareImplementation) = jest.fn(async () => { return await new Promise((resolve, reject) => reject(new Error())) })
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
