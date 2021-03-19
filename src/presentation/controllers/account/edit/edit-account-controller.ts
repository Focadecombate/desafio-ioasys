
import { badRequest, conflict, Controller, HttpRequest, HttpResponse, ok, serverError, Validation } from '../../login/signup/signup-protocols'
import { EditAccount } from '../../../../domain/usecases/edit-account'

export class EditAccountController implements Controller<any> {
  constructor (
    private readonly validation: Validation,
    private readonly editAccount: EditAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const id = httpRequest?.accountId
      const error = this.validation.validate(httpRequest.body)
      if (!error) {
        const account = await this.editAccount.edit(id, httpRequest.body)
        if (!account) {
          return conflict()
        }
        return ok(account)
      }
      return badRequest(error)
    } catch (error) {
      return serverError(error)
    }
  }
}
