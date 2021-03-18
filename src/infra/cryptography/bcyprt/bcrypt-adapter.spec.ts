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
  },
  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }

}))

describe('Bcrypt Adapter', () => {
  test('should call hash with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const hashedPassword = await sut.encrypt('any_value')
    expect(hashedPassword).toBe('hash')
  })
  test('hash should pass the exception to caller', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const hashedPasswordPromise = sut.encrypt('any_value')
    expect(hashedPasswordPromise).rejects.toThrow()
  })
  test('should call compare with correct values', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
  test('compare should pass the exception to caller', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const hashedPasswordPromise = sut.compare('any_value', 'any_hash')
    expect(hashedPasswordPromise).rejects.toThrow()
  })
  test('should return valid if compare is valid', async () => {
    const { sut } = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })
  test('should return valid if compare is valid', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
