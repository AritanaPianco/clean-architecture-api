import { type Router } from 'express'
import { adaptRouter } from '../adapters/express/express-route-adapter'
import { makeSignupController } from '../factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignupController()))
  router.post('/login', adaptRouter(makeLoginController()))
}
