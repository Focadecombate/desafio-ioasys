import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeSignupController } from '../../factories/controllers/signup'
import { makeLoginController } from '../../factories/controllers/login'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
