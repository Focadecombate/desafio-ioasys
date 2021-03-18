import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  AccountModel,
  Validation
} from './signup-protocols'
import { badRequest, serverError } from '../../helper/http/httpHelper'
import { SignupDTO } from './signup.dto'

export class SignupController implements Controller<AccountModel> {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<AccountModel | Error>> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, name, password } = httpRequest.body as SignupDTO

      const account = await this.addAccount.add({ email, name, password })

      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
