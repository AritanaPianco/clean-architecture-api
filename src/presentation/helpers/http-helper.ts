import { ServerError } from '../errors'
import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack as string)
  }
}
export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}
