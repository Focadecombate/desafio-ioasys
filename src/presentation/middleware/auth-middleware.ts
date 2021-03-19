import { AccessDenied } from '../errors'
import { forbidden } from '../helper/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    return new Promise(resolve => resolve(forbidden(new AccessDenied())))
  }
}
