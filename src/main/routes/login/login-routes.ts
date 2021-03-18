import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeSignupController } from '../../factorys/signup'
import { makeLoginController } from '../../factorys/login'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
