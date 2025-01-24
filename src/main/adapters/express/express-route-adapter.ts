import { type Controller, type HttpRequest } from '../../../presentation/protocols'
import { type Request, type Response } from 'express'

export const adaptRouter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const customHttpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(customHttpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
