import { EditAccount, EditAccountModel } from '../../../domain/usecases/edit-account'
import { EditAccountRepository } from '../../protocols/db/account/edit-account-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'

export class DbEditAccount implements EditAccount {
  constructor (
    private readonly editAccountRepository: EditAccountRepository
  ) { }

  async edit (accountId: string, editAccountModel: EditAccountModel): Promise<AccountModel> {
    const editedAccount = await this.editAccountRepository.edit(accountId, editAccountModel)
    return editedAccount
  }
}
