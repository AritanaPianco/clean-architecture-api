import { type Router } from 'express'
import { adaptRouter } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/survey', adaptRouter(makeAddSurveyController()))
}
