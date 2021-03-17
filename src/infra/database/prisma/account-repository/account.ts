import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { prisma } from '../utils/prisma-client'

export class AccountPrismaRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const { email, name, password } = account
    const addedAccount = await prisma.user.create({
      data: {
        email,
        name,
        password
      }
    })
    return new Promise(resolve => resolve(addedAccount))
  }
}
