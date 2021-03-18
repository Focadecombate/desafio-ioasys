import { AccountPrismaRepository } from '../../infra/database/prisma/account-repository/account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { SignupController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { Controller } from '../../presentation/protocols'
import { AccountModel } from '../../presentation/controllers/signup/signup-protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogPrismaRepository } from '../../infra/database/prisma/log-repository/log'
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
