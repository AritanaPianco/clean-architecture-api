import { type Validation } from '../../login/login-controller-protocols'
import { type Controller, type HttpRequest, type HttpResponse, type AddSurvey } from './add-survey-protocols'
import { badRequest, serverError } from '../../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers
      })
      return await new Promise(resolve => resolve(null!))
    } catch (error) {
      return serverError(error)
    }
  }
}
