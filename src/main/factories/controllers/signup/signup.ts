import { makeAddAccount } from '../../useCases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../useCases/dbAuthentication/db-authentication-factory'
import {
  SignupController,
  Controller
} from './protocols/signup-protocols'
import { makeSignupValidation } from './signup-validation'
import { makeLogDecorator } from '../../decorators/log-factory'

export const makeSignupController = (): Controller<{ accessToken: string }> => {
  const controller = new SignupController(makeAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogDecorator(controller)
}
