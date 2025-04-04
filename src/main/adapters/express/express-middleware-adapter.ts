import { type Middleware, type HttpRequest } from '../../../presentation/protocols'
import { type NextFunction, type Request, type Response } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const customHttpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(customHttpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
