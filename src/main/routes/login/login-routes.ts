import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeSignupController } from '../../factorys/controllers/signup'
import { makeLoginController } from '../../factorys/controllers/login'
import { makeLogDecorator } from '../../factorys/decorators/log-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeLogDecorator(makeSignupController())))
  router.post('/login', adaptRoute(makeLogDecorator(makeLoginController())))
}
