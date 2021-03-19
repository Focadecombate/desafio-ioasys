
import { Controller, HttpRequest, HttpResponse, noContent, serverError } from '../../login/signup/signup-protocols'
import { DisableAccount } from '../../../../domain/usecases/disable-account'

export class DisableAccountController implements Controller<any> {
  constructor (
    private readonly disableAccount: DisableAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const id = httpRequest?.accountId
      await this.disableAccount.disable(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
