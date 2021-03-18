import { Authentication, EmailValidator, HttpRequest } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helper/httpHelper'
import { LoginController } from './login'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})
const makeEmailValidator = (): EmailValidator => {
  class EmaiValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmaiValidatorStub()
}
const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise((resolve) => resolve('token'))
    }
  }

  return new AuthenticationStub()
}
const makeSut = () => {
  const emailValidatorStub = makeEmailValidator()
  const authenticationStub = makeAuthentication()
  return {
    sut: new LoginController(emailValidatorStub, authenticationStub),
    emailValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
  test('should return 400 if a invalidEmail is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  test('should return 500 if emailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(
      () => {
        throw new Error('')
      }
    )

    const promise = await sut.handle(makeFakeHttpRequest())
    expect(promise).toEqual(serverError(new Error('')))
  })
  test('should call email validator with the right email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeFakeHttpRequest())
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')

    const { email, password } = makeFakeHttpRequest().body

    await sut.handle(makeFakeHttpRequest())
    expect(authSpy).toBeCalledWith(email, password)
  })
  test('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve) => {
      resolve(null)
    }))

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
  test('should return 200 if a user is authorized', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'token' }))
  })
  test('should return 500 if authenticationStub throws', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error(''))
      })
    )

    const promise = await sut.handle(makeFakeHttpRequest())
    expect(promise).toEqual(serverError(new Error('')))
  })
})
