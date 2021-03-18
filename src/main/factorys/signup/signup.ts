import {
  AccountPrismaRepository,
  BcryptAdapter,
  SignupController,
  DbAddAccount,
  Controller,
  AccountModel,
  LogControllerDecorator,
  LogPrismaRepository
} from './signup-protocols'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller<AccountModel> => {
  const salt = 12
  const addAccountRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const validationComposite = makeSignupValidation()
  const signupController = new SignupController(dbAddAccount, validationComposite)
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(signupController, logPrismaRepository)
}
