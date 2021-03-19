import { AccountModel } from '../models/account'

export interface EditAccount {
  edit(accountId: string): Promise<AccountModel>
}
