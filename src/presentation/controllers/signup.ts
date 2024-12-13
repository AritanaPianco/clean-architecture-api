import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response = {
      statusCode: 0,
      body: new Error()
    }

    if (!httpRequest.body.name) {
      response = {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      response = {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return response
  }
}
