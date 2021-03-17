import { AddAccountRepository } from '../../protocols/add-account-repository'
import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountModel, Encrypter } from './db-add-account-protocols'

const makeEncryptStub = (): Encrypter => {
  class EncryptStub {
    encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('#hash'))
    }
  }
  return new EncryptStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount: AccountModel = {
        name: 'valid_name',
        email: 'valid_email',
        password: '#hash',
        id: 'valid_id'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutReturn {
  sut: DbAddAccount,
  encryptStub: Encrypter,
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutReturn => {
  const encryptStub = makeEncryptStub()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)
  return { sut, encryptStub, addAccountRepositoryStub }
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
  test('should pass encrypter exception to caller', async () => {
    const { sut, encryptStub } = makeSut()

    jest.spyOn(encryptStub, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const accountPromisse = sut.add(accountData)
    await expect(accountPromisse).rejects.toThrow()
  })
  test('should call AddAccountRepository with correct data', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: '#hash'
    })
  })
  test('should pass AddAccountRepository exception to caller', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const accountPromisse = sut.add(accountData)
    await expect(accountPromisse).rejects.toThrow()
  })
  test('should return a account on success', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const accountPromisse = await sut.add(accountData)
    await expect(accountPromisse).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: '#hash'
    })
  })
})
