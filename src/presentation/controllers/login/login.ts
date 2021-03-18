import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helper/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'
import { LoginDTO } from './login.dto'

export class LoginController implements Controller<any> {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    const requiredFields: (keyof LoginDTO)[] = ['email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }

    return new Promise((resolve) => {
      resolve(ok({}))
    })
  }
}
