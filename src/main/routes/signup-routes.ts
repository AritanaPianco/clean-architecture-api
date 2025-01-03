import { type Router } from 'express'
import { makeSignupController } from '../factories/signup'
import { adaptRouter } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignupController()))
}
