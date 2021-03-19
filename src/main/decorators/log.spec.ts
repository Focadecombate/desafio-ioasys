import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { serverError } from '../../presentation/helper/http/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}
const makeControllerStub = () => {
  class ControllerStub<httpRequest> implements Controller<httpRequest> {
    handle (httpRequest: HttpRequest): Promise<HttpResponse<httpRequest | Error>> {
      return new Promise((resolve, reject) => {
        const httpResponse: HttpResponse<any> = {
          statusCode: 200,
          body: {
            name: 'Gustavo'
          }
        }
        resolve(httpResponse)
      })
    }
  }
  return new ControllerStub<any>()
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

interface SutReturn {
  sut: LogControllerDecorator<any>,
  controllerStub: Controller<any>,
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutReturn => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  return { sut: new LogControllerDecorator(controllerStub, logErrorRepositoryStub), controllerStub, logErrorRepositoryStub }
}

describe('Log Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })
  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Gustavo'
      }
    })
  })
  test('should call LogError Repository with corret error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
