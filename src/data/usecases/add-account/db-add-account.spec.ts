import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

const makeEncryptStub = (): Encrypter => {
  class EncryptStub {
    encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('#hash'))
    }
  }
  return new EncryptStub()
}

interface SutReturn {
  sut: DbAddAccount,
  encryptStub: Encrypter
}

const makeSut = (): SutReturn => {
  const encryptStub = makeEncryptStub()
  const sut = new DbAddAccount(encryptStub)
  return { sut, encryptStub }
}

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
