import { AddAccountModel, AddAccount, AccountModel, EmailValidator, HttpRequest } from './signup-protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors/'
import { SignupController } from './signup'
import { badRequest, ok } from '../../helper/httpHelper'

interface SutReturn {
  sut: SignupController,
  emailValidatorStub: EmailValidator,
  AddAcountStub: AddAccount
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
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorSub()
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
  const emailValidatorStub = makeEmailValidator()
  const AddAcountStub = makeAddAcountStub()
  const signupController = new SignupController(emailValidatorStub, AddAcountStub)
  return {
    sut: signupController,
    emailValidatorStub,
    AddAcountStub
  }
}

describe('Signup Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
  test('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })
  test('should return 400 if password and passwordConfirmation are different', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password1'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error('passwords dont match')))
  })
  test('should return 400 if email is invalid', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  test('should pass the correct email to email validator', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })
  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error('')
      })

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(''))
  })
  test('should call AddAccount with correct values', async () => {
    const { sut, AddAcountStub } = makeSut()

    const addAcountSpy = jest.spyOn(AddAcountStub, 'add')

    await sut.handle(makeHttpRequest())
    expect(addAcountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })
  test('should return 500 if AddAccount throws', async () => {
    const { sut, AddAcountStub } = makeSut()

    jest.spyOn(AddAcountStub, 'add')
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
})
