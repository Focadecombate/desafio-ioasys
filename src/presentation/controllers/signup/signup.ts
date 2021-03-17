import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount, AccountModel } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helper/httpHelper'
import { SignupDTO } from './signup.dto'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse<AccountModel | Error> {
    try {
      const requiredFields: (keyof SignupDTO)[] = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new Error('passwords dont match'))
      }

      const { email, name, password } = httpRequest.body as SignupDTO

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({ email, name, password })

      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
