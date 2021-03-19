
import { makeLogDecorator } from '../../../decorators/log-factory'
import { Controller } from '../../../../../presentation/protocols'
import { AccountPrismaRepository } from '../../login/login/protocols/login-protocols'
import { DbEditAccount } from '../../../../../data/usecases/edit-account/db-edit-account'
import { EditAccountController } from '../../../../../presentation/controllers/account/edit/edit-account-controller'
import { makeEditValidation } from './edit-validation-factory'

export const makeEditController = (): Controller<any> => {
  const editAccountRepository = new AccountPrismaRepository()
  const editAccount = new DbEditAccount(editAccountRepository)
  const controller = new EditAccountController(makeEditValidation(), editAccount)
  return makeLogDecorator(controller)
}
