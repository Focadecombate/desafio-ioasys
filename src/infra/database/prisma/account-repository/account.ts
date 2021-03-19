import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/load-account-by-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { prisma } from '../utils/prisma-client'

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const { email, name, password, role } = account
    const addedAccount = await prisma.user.create({
      data: {
        email,
        name,
        password,
        role
      }
    })
    return addedAccount
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const account = await prisma.user.findFirst({
      where: {
        email
      }
    })
    return account
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const account = await prisma.user.findFirst({
      where: {
        id: token,
        role
      }
    })
    return account
  }
}
