import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface testBody {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const makeControllerStub = <T>() => {
  class ControllerStub<httpRequest> implements Controller<httpRequest> {
    handle (httpRequest: HttpRequest): Promise<HttpResponse<httpRequest | Error>> {
      return new Promise((resolve, reject) => {
        const httpResponse: HttpResponse<httpRequest> = {
          statusCode: 200,
          body: httpRequest.body
        }
        resolve(httpResponse)
      })
    }
  }
  return new ControllerStub<T>()
}

const makeSut = () => {
  const controllerStub = makeControllerStub<testBody>()
  return { sut: new LogControllerDecorator(controllerStub), controllerStub }
}

describe('Log Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })
  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: httpRequest.body
    })
  })
})
