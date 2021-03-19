
import { badRequest, Controller, HttpRequest, HttpResponse, noContent, serverError } from '../../login/signup/signup-protocols'
import { DisableAccount } from '../../../../domain/usecases/disable-account'
import { NotFoundError } from '../../../errors/notFound-error'

export class DisableAccountController implements Controller<any> {
  constructor (
    private readonly disableAccount: DisableAccount
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const id = httpRequest?.accountId
      if (id) {
        await this.disableAccount.disable(id)
        return noContent()
      }
      return badRequest(new NotFoundError('Account id'))
    } catch (error) {
      return serverError(error)
    }
  }
}
