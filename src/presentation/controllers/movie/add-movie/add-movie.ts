import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse } from './add-movie-controller-protocols'

export class AddMovieController implements Controller<any> {
  constructor (private readonly validation: Validation) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    this.validation.validate(httpRequest.body)
    return new Promise((resolve) => resolve(null))
  }
}
