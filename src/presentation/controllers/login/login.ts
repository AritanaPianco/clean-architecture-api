import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let response: HttpResponse = {
      statusCode: 200,
      body: null
    }
    if (!httpRequest.body.email) {
      response = await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!httpRequest.body.password) {
      response = await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    return response
  }
}
