import { AccountPrismaRepository } from '../../infra/database/prisma/account-repository/account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { SignupController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../util/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { Controller } from '../../presentation/protocols'
import { AccountModel } from '../../presentation/controllers/signup/signup-protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller<AccountModel> => {
  const salt = 12
  const addAccountRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signupController = new SignupController(emailValidator, dbAddAccount)
  return new LogControllerDecorator(signupController)
}
