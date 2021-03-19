import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDenied } from '../errors'
import { forbidden, ok } from '../helper/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const accessToken = httpRequest.headers?.authorization
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return ok({ userId: account.id })
      }
    }
    return forbidden(new AccessDenied())
  }
}
