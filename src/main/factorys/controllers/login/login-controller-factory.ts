import { LoginController } from '../../../../presentation/controllers/login/login'
import {
  Controller,
  AccountModel
} from './protocols/login-protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../useCases/dbAuthentication/db-authentication-factory'

export const makeLoginController = (): Controller<AccountModel> => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication())
}
