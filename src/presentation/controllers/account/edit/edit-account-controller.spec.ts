import { EditAccount } from '../../../../domain/usecases/edit-account'
import { MissingParamError } from '../../../errors'
import { AccountModel, badRequest, HttpRequest, serverError, Validation } from '../../login/signup/signup-protocols'
import { EditAccountController } from './edit-account-controller'

const makeFakeRequest = (): HttpRequest => ({
  accountId: 'any_id',
  body: {
    email: 'any_email@mail.com'
  }
})
const makeEditAccountStub = (): EditAccount => {
  class EditAccountStub implements EditAccount {
    edit (accountId: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new EditAccountStub()
}
const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}
const makeSut = () => {
  const editAccountStub = makeEditAccountStub()
  const validationStub = makeValidationStub()
  return {
    sut: new EditAccountController(validationStub, editAccountStub),
    validationStub,
    editAccountStub
  }
}

describe('Edit Account Controller', () => {
  test('should call editAccount with correct values', async () => {
    const { sut, editAccountStub } = makeSut()
    const addSpy = jest.spyOn(editAccountStub, 'edit')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().accountId, makeFakeRequest().body)
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
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validationSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
