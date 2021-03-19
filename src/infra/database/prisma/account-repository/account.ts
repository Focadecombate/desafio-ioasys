import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { EditAccountRepository } from '../../../../data/protocols/db/account/edit-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
import { DisableAccountRepository } from '../../../../data/usecases/disable-account/db-disable-account-protocols'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { EditAccountModel } from '../../../../domain/usecases/edit-account'
import { prisma } from '../utils/prisma-client'

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, DisableAccountRepository, EditAccountRepository {
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

  async disable (accountId: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: accountId
      },
      data: {
        isActive: false
      }
    })
  }

  async edit (accountId: string, editAccountModel: EditAccountModel): Promise<AccountModel> {
    if (editAccountModel.email) {
      const conflict = await prisma.user.findUnique({
        where: { email: editAccountModel.email }
      })
      if (conflict) {
        return null
      }
    }
    const editedAccount = await prisma.user.update({
      data: editAccountModel,
      where: {
        id: accountId
      }
    })
    return editedAccount
  }
}
