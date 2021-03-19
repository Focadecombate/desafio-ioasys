import { EditAccountModel } from '../../../domain/usecases/edit-account'
import { EditAccountRepository } from '../../protocols/db/account/edit-account-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbEditAccount } from './db-edit-account'

const makeEditedAccount = ():AccountModel => ({
  email: 'any_email2@mail.com',
  name: 'any_name',
  password: 'any_password',
  isActive: true,
  id: 'any_id',
  role: 'user'
})

const makeEditAccountRepositoryStub = (): EditAccountRepository => {
  class EditAccountRepositoryStub implements EditAccountRepository {
    async edit (accountId: string, editAccountModel: EditAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeEditedAccount()))
    }
  }
  return new EditAccountRepositoryStub()
}

interface SutReturn {
  sut: DbEditAccount,
  editAccountRepositoryStub: EditAccountRepository
}

const makeSut = (): SutReturn => {
  const editAccountRepositoryStub = makeEditAccountRepositoryStub()
  const sut = new DbEditAccount(editAccountRepositoryStub)
  return { sut, editAccountRepositoryStub }
}

describe('DbEditAccount Usecase', () => {
  test('should throw if EditAccountRepository throws', async () => {
    const { sut, editAccountRepositoryStub } = makeSut()
    jest.spyOn(editAccountRepositoryStub, 'edit')
      .mockRejectedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.edit('any_account_id', { email: 'any_email2@mail.com' })
    expect(promise).rejects.toThrow()
  })
  test('should call EditAccountRepository with correct value', async () => {
    const { sut, editAccountRepositoryStub } = makeSut()
    const editSpy = jest.spyOn(editAccountRepositoryStub, 'edit')
    await sut.edit('any_account_id', { email: 'any_email2@mail.com' })
    expect(editSpy).toHaveBeenCalledWith('any_account_id', { email: 'any_email2@mail.com' })
  })
})
