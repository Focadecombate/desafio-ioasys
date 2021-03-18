import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = <T>(controller: Controller<T>) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const { body, statusCode } = await controller.handle(httpRequest)
    if (statusCode === 200) {
      return res.status(statusCode).json(body)
    }
    res.status(statusCode).json({
      ...body
    })
  }
}
