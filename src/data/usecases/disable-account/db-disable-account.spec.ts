import { DisableAccountRepository } from '../../protocols/db/account/disable-account-repository'
import { DbDisableAccount } from './db-disable-account'

const makeDisableAccountRepositoryStub = (): DisableAccountRepository => {
  class DisableAccountRepositoryStub implements DisableAccountRepository {
    async disable (accountId: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new DisableAccountRepositoryStub()
}

interface SutReturn {
  sut: DbDisableAccount,
  disableAccountRepositoryStub: DisableAccountRepository
}

const makeSut = (): SutReturn => {
  const disableAccountRepositoryStub = makeDisableAccountRepositoryStub()
  const sut = new DbDisableAccount(disableAccountRepositoryStub)
  return { sut, disableAccountRepositoryStub }
}

describe('DbDisableAccount Usecase', () => {
  test('should throw if DisableAccountRepository throws', async () => {
    const { sut, disableAccountRepositoryStub } = makeSut()
    jest.spyOn(disableAccountRepositoryStub, 'disable')
      .mockRejectedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.disable('any_account_id')
    expect(promise).rejects.toThrow()
  })
  test('should call DisableAccountRepository with correct value', async () => {
    const { sut, disableAccountRepositoryStub } = makeSut()
    const disableSpy = jest.spyOn(disableAccountRepositoryStub, 'disable')
    await sut.disable('any_account_id')
    expect(disableSpy).toHaveBeenCalledWith('any_account_id')
  })
})
