import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDenied } from '../errors'
import { forbidden } from '../helper/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const accessToken = httpRequest.headers?.authorization
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDenied())
  }
}
