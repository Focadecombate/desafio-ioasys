import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './signup-protocols'
import { badRequest, forbidden, serverError } from '../../helper/http/httpHelper'
import { SignupDTO } from './signup.dto'
import { Authentication } from '../login/login-protocols'
import { EmailInUseError } from '../../errors'

export class SignupController implements Controller<{ accessToken: string }> {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<{ accessToken: string } | Error>> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, name, password } = httpRequest.body as SignupDTO

      const account = await this.addAccount.add({ email, name, password })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return {
        statusCode: 200,
        body: { accessToken }
      }
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
