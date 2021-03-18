import { AddAccountModel, AddAccount, AccountModel, HttpRequest, Validation } from './signup-protocols'
import { MissingParamError, ServerError } from '../../errors/'
import { SignupController } from './signup'
import { badRequest, ok } from '../../helper/httpHelper'

interface SutReturn {
  sut: SignupController,
  addAcountStub: AddAccount,
  validationStub: Validation
}
const makeHttpRequest = (): HttpRequest => (
  {
    body: {
      email: 'any_mail@mail.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
)
const makeFakeAccount = (): AccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  id: 'valid_id'
})
const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}
const makeAddAcountStub = (): AddAccount => {
  class AddAcountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AddAcountStub()
}
const makeSut = (): SutReturn => {
  const addAcountStub = makeAddAcountStub()
  const validationStub = makeValidationStub()
  const signupController = new SignupController(addAcountStub, validationStub)
  return {
    sut: signupController,
    addAcountStub,
    validationStub
  }
}

describe('Signup Controller', () => {
  test('should call AddAccount with correct values', async () => {
    const { sut, addAcountStub } = makeSut()

    const addAcountSpy = jest.spyOn(addAcountStub, 'add')

    await sut.handle(makeHttpRequest())
    expect(addAcountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })
  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAcountStub } = makeSut()

    jest.spyOn(addAcountStub, 'add')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()))
      })

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(''))
  })
  test('should return 200 if data is valid', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validationSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeHttpRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeHttpRequest().body)
  })
  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
