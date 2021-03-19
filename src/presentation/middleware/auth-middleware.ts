import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDenied, ServerError } from '../errors'
import { forbidden, ok, serverError } from '../helper/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const accessToken = httpRequest.headers?.authorization
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return ok({ userId: account.id })
        }
      }
      return forbidden(new AccessDenied())
    } catch (error) {
      return serverError(new ServerError(''))
    }
  }
}
