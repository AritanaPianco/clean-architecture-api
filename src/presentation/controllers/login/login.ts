import { badRequest, serverError } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let response: HttpResponse = {
      statusCode: 200,
      body: null
    }
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        response = await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        response = await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        response = await new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
      return response
    } catch (error) {
      return serverError(error)
    }
  }
}
