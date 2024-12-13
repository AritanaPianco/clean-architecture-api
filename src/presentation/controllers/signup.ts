import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response = {
      statusCode: 0,
      body: new Error()
    }

    if (!httpRequest.body.name) {
      response = badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      response = badRequest(new MissingParamError('email'))
    }

    return response
  }
}
