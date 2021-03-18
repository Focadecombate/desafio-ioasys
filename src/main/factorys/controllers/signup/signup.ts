import { makeAddAccount } from '../../useCases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../useCases/dbAuthentication/db-authentication-factory'
import {
  SignupController,
  Controller
} from './protocols/signup-protocols'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller<{ accessToken: string }> => {
  return new SignupController(makeAddAccount(), makeSignupValidation(), makeDbAuthentication())
}
