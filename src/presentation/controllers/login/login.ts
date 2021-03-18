import { MissingParamError } from '../../errors'
import { badRequest } from '../../helper/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller<any> {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    return new Promise((resolve) => {
      resolve(badRequest(new MissingParamError('email')))
    })
  }
}