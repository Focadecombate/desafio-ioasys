import { EditAccount } from '../../../../domain/usecases/edit-account'
import { AccountModel, HttpRequest, serverError } from '../../login/signup/signup-protocols'
import { EditAccountController } from './edit-account-controller'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_id'
})

const makeEditAccountStub = (): EditAccount => {
  class EditAccountStub implements EditAccount {
    edit (accountId: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new EditAccountStub()
}

const makeSut = () => {
  const editAccountStub = makeEditAccountStub()
  return {
    sut: new EditAccountController(editAccountStub),
    editAccountStub
  }
}

describe('Edit Account Controller', () => {
  test('should call editAccount with correct values', async () => {
    const { sut, editAccountStub } = makeSut()
    const addSpy = jest.spyOn(editAccountStub, 'edit')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().accountId)
  })
  test('should return 500 if editAccount throws', async () => {
    const { sut, editAccountStub } = makeSut()

    jest.spyOn(editAccountStub, 'edit')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('')))
      )

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('')))
  })
})
