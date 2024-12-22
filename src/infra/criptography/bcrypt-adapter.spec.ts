// implementação do protocolo Encrypter
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashedValue'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const salt = 8
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('should return a hash on success', async () => {
    const salt = 8
    const sut = new BcryptAdapter(salt)
    const hashedValue = await sut.encrypt('any_value')
    expect(hashedValue).toBe('hashedValue')
  })
})
