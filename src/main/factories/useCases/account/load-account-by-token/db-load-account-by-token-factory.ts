import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account'
import { LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt/jwtAdapter'
import { AccountPrismaRepository } from '../../../controllers/login/login/protocols/login-protocols'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter('secret_key')
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPrismaRepository)
}
