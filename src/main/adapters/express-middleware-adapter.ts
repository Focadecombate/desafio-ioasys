import { NextFunction, Request, Response } from 'express'
import { HttpRequest, Middleware } from '../../presentation/protocols'

export interface customRequest extends Request {
  accountId?: string
}

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: customRequest, res: Response, Next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const { body, statusCode } = await middleware.handle(httpRequest)

    if (statusCode === 200) {
      req.accountId = body.accountId
      return Next()
    }
    res.status(statusCode).json({
      ...body
    })
  }
}
