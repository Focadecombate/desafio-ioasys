import { makeDbAuthentication } from '../../useCases/dbAuthentication/db-authentication-factory'
import {
  AccountPrismaRepository,
  BcryptAdapter,
  SignupController,
  DbAddAccount,
  Controller,
  LogControllerDecorator,
  LogPrismaRepository
} from './protocols/signup-protocols'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller<{ accessToken: string }> => {
  const salt = 12
  const addAccountRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const validationComposite = makeSignupValidation()
  const signupController = new SignupController(dbAddAccount, validationComposite, makeDbAuthentication())
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(signupController, logPrismaRepository)
}
