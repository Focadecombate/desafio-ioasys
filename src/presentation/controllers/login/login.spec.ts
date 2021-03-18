import { Authentication, HttpRequest } from './login-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helper/http/httpHelper'
import { LoginController } from './login'
import { Validation } from '../../protocols/validation'

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})
const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise((resolve) => resolve('token'))
    }
  }

  return new AuthenticationStub()
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
  const validationStub = makeValidationStub()
  const authenticationStub = makeAuthentication()
  return {
    sut: new LoginController(validationStub, authenticationStub),
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockImplementationOnce(
      () => {
        throw new Error('')
      }
    )

    const promise = await sut.handle(makeFakeHttpRequest())
    expect(promise).toEqual(serverError(new Error('')))
  })
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validationSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakeHttpRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeHttpRequest().body)
  })
  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
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
