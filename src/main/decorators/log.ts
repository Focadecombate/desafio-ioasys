import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator<T> implements Controller<T> {
  private readonly controller: Controller<T>;

  constructor (controller: Controller<T>) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<T | Error>> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
