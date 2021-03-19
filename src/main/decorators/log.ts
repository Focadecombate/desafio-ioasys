import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator<T> implements Controller<T> {
  private readonly controller: Controller<T>;
  private readonly logErrorRepository: LogErrorRepository;

  constructor (controller: Controller<T>, logErrorRepository: LogErrorRepository) {
    this.logErrorRepository = logErrorRepository
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<T | Error>> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500 && httpResponse.body instanceof Error) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
