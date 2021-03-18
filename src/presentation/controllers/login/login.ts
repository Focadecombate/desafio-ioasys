import { Authentication, AuthenticationModel, Controller, HttpRequest, HttpResponse, Validation } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helper/http/httpHelper'

export class LoginController implements Controller<{ accessToken: string }> {
  private readonly validation: Validation
  private readonly authentication: Authentication
  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const authentication = httpRequest.body as AuthenticationModel

      const accessToken = await this.authentication.auth(authentication)

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
