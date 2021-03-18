import { DbAuthentication } from '../../../data/usecases/authenticate/db-authentication'
import { JwtAdapter } from '../../../infra/cryptography/jwt/jwtAdapter'
import { LoginController } from '../../../presentation/controllers/login/login'
import {
  AccountPrismaRepository,
  BcryptAdapter,
  Controller,
  AccountModel,
  LogControllerDecorator,
  LogPrismaRepository
} from './login-protocols'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = (): Controller<AccountModel> => {
  const salt = 12
  const secretKey = 'secret_key'
  const jwtAdapter = new JwtAdapter(secretKey)
  const accountRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAuthentication = new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter)
  const loginController = new LoginController(makeLoginValidation(), dbAuthentication)
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(loginController, logPrismaRepository)
}
