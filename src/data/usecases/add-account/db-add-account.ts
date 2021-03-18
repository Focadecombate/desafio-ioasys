import { AddAccountRepository } from '../../protocols/db/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Encrypter, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const foundAccount = await this.loadAccountByEmailRepository.loadByEmail(account.email)
    if (foundAccount) {
      return null
    }
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const addedAccount = await this.addAccountRepository.add({ ...account, password: hashedPassword })
    return addedAccount
  }
}
