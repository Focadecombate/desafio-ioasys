import { LoginController } from '../../../../presentation/controllers/login/login'
import {
  Controller,
  AccountModel,
  LogControllerDecorator,
  LogPrismaRepository
} from './protocols/login-protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../useCases/dbAuthentication/db-authentication-factory'

export const makeLoginController = (): Controller<AccountModel> => {
  const dbAuthentication = makeDbAuthentication()
  const loginController = new LoginController(makeLoginValidation(), dbAuthentication)
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(loginController, logPrismaRepository)
}
