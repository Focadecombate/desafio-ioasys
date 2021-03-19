import { AccountModel } from '../models/account'

export interface EditAccountModel {
  email?: string,
  name?: string,
  role?: string,
  password?:string,
  passwordConfirmation?:string,
}

export interface EditAccount {
  edit(accountId: string, editAccountModel: EditAccountModel): Promise<AccountModel>
}
