import { badRequest, serverError } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type EmailValidator } from '../signup/signup-protocols'
import { type Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
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
      await this.authentication.auth(email, password)
      return response
    } catch (error) {
      return serverError(error)
    }
  }
}
