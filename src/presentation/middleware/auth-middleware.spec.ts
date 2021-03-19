import { forbidden } from '../helper/http/httpHelper'
import { AccessDenied } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'
import { HttpRequest } from '../protocols'

const makeFakeAccount = (): AccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  id: 'valid_id',
  isActive: true,
  isAdmin: false
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
const makeSut = () => {
  const loadAccountByTokenStub = makeLoadAccoundByTokenStub()
  return {
    sut: new AuthMiddleware(loadAccountByTokenStub),
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
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })
})
