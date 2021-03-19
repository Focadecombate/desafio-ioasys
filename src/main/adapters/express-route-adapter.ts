import { Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'
import { customRequest } from './express-middleware-adapter'

export const adaptRoute = <T>(controller: Controller<T>) => {
  return async (req: customRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      accountId: req?.accountId,
      query: req.query,
      params: req.params
    }
    const { body, statusCode } = await controller.handle(httpRequest)
    if (statusCode === 200 || statusCode <= 299) {
      return res.status(statusCode).json(body)
    }
    res.status(statusCode).json({
      ...body
    })
  }
}
