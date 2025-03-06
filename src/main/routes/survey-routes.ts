import { type Router } from 'express'
import { adaptRouter } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { auth } from '../middlewares/auth'
import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/survey', adminAuth, adaptRouter(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRouter(makeLoadSurveysController()))
}
