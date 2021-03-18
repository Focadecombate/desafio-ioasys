import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { prisma } from '../utils/prisma-client'

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const { email, name, password } = account
    const addedAccount = await prisma.user.create({
      data: {
        email,
        name,
        password
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
}
