import { DbAuthentication } from '../../../../data/usecases/authenticate/db-authentication'
import { JwtAdapter } from '../../../../infra/cryptography/jwt/jwtAdapter'
import { AccountPrismaRepository, BcryptAdapter } from '../../controllers/login/protocols/login-protocols'

export const makeDbAuthentication = (): DbAuthentication => {
  const accountRepository = new AccountPrismaRepository()
  const salt = 12
  const secretKey = 'secret_key'
  const jwtAdapter = new JwtAdapter(secretKey)
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter)
}
