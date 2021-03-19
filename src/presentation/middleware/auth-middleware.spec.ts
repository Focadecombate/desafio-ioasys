import { forbidden } from '../helper/http/httpHelper'
import { AccessDenied } from '../errors'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('should return 403 if no authorization exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })
})
