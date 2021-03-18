import { AccountPrismaRepository, BcryptAdapter, DbAddAccount } from '../../controllers/signup/protocols/signup-protocols'

export const makeAddAccount = () => {
  const salt = 12
  const addAccountRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bcryptAdapter, addAccountRepository)
}
