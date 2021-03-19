
import { Controller, HttpRequest, HttpResponse, ok, serverError } from '../../login/signup/signup-protocols'
import { EditAccount } from '../../../../domain/usecases/edit-account'

export class EditAccountController implements Controller<any> {
  constructor (
    private readonly editAccount: EditAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const id = httpRequest?.accountId
      const account = await this.editAccount.edit(id)
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
