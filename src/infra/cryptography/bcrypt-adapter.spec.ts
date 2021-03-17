import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

interface SutReturn {
  sut: BcryptAdapter,
  salt: number
}

const makeSut = (): SutReturn => {
  const salt = 12
  return {
    sut: new BcryptAdapter(salt),
    salt
  }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('should return a hash on success', async () => {
    const { sut } = makeSut()
    const hashedPassword = await sut.encrypt('any_value')
    expect(hashedPassword).toBe('hash')
  })
  test('should pass the exception to caller', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const hashedPasswordPromise = sut.encrypt('any_value')
    expect(hashedPasswordPromise).rejects.toThrow()
  })
})
