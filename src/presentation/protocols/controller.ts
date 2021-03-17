import { HttpRequest, HttpResponse } from './http'

export interface Controller<T> {
  handle(httpRequest: HttpRequest): Promise<HttpResponse<T | Error>>
}
