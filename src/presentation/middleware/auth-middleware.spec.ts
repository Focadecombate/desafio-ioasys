import { forbidden, ok, serverError } from '../helper/http/httpHelper'
import { AccessDenied, ServerError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { HttpRequest, AccountModel, LoadAccountByToken } from './auth-middleware-protocols'

const makeFakeAccount = (): AccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  id: 'valid_id',
  isActive: true,
  role: 'user'
})
const makeFakeRequest = (): HttpRequest => ({
  headers: {
    authorization: 'any_token'
  }
})
const makeLoadAccoundByTokenStub = () => {
  class LoadAccoundByTokenSub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccoundByTokenSub()
}
const makeSut = (role?: string) => {
  const loadAccountByTokenStub = makeLoadAccoundByTokenStub()
  return {
    sut: new AuthMiddleware(loadAccountByTokenStub, role),
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('should return 403 if no authorization exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })
  test('should call LoadAccoundByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })
  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })
  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ userId: makeFakeAccount().id }))
  })
  test('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new ServerError('')))
      )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })
})
