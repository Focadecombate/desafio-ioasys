import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/load-account-by-token-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  isActive: true,
  isAdmin: false,
  password: 'hashed_password'
})
const makeDecryperStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new DecrypterStub()
}
const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
const makeSut = () => {
  const decrypterStub = makeDecryperStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  return {
    sut: new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub),
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}
describe('DbLoadAccountByToken UseCase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('should call LoadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
  test('should return null if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })
  test('should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    expect(promise).rejects.toThrowError()
  })
  test('should throw if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    expect(promise).rejects.toThrowError()
  })
})
