import { Controller, AccountModel } from './protocols/login-protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../useCases/dbAuthentication/db-authentication-factory'
import { makeLogDecorator } from '../../decorators/log-factory'
import { LoginController } from '../../../../presentation/controllers/login/login/login'

export const makeLoginController = (): Controller<AccountModel> => {
  const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
  return makeLogDecorator(controller)
}
