import { MissingParamError } from '../../errors/missing-param-error'
import { BadRequest } from '../../helper/badRequest'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { SignupDTO } from './signup.dto'

export class SignupController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields: (keyof SignupDTO)[] = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field))
      }
    }
    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return BadRequest(new Error('passwords dont match'))
    }
  }
}
