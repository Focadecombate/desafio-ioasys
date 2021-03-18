import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse<Error> => (
  {
    statusCode: 400,
    body: error
  }
)
export const serverError = (error: Error): HttpResponse<Error> => (
  {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
)
export const ok = <T>(data: T): HttpResponse<T> => (
  {
    statusCode: 200,
    body: data
  }
)
