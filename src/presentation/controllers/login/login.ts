import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helper/httpHelper'
import { LoginDTO } from './login.dto'

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

      const { email, password } = httpRequest.body as LoginDTO

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
