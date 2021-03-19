import { EditAccountModel } from '../../../../domain/usecases/edit-account'
import { AccountModel } from '../../../usecases/add-account/db-add-account-protocols'

export interface EditAccountRepository {
  edit(accountId: string, editAccountModel:EditAccountModel): Promise<AccountModel>
}
