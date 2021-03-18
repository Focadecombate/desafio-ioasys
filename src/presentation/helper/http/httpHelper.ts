import { ServerError, UnauthorizedError } from '../../errors/'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse<Error> => (
  {
    statusCode: 400,
    body: {
      name: error.name,
      message: error.message
    }
  }
)
export const forbidden = (error: Error): HttpResponse<Error> => (
  {
    statusCode: 403,
    body: error
  }
)
export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
export const ok = <T>(data: T): HttpResponse<T> => (
  {
    statusCode: 200,
    body: data
  }
)
