import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { type Controller, type HttpRequest, type HttpResponse } from '../add-survey/add-survey-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return await new Promise(resolve => resolve(ok(surveys)))
    } catch (error) {
      return serverError(new Error())
    }
  }
}
