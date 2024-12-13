import { type HttpRequest, type HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response = {
      statusCode: 0,
      body: new Error()
    }

    if (!httpRequest.body.name) {
      response = {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      response = {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    return response
  }
}
