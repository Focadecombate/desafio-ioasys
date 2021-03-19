
import { makeLogDecorator } from '../../../decorators/log-factory'
import { DisableAccountController } from '../../../../../presentation/controllers/account/disable/disable-account-controller'
import { Controller } from '../../../../../presentation/protocols'
import { DbDisableAccount } from '../../../../../data/usecases/disable-account/db-disable-account'
import { AccountPrismaRepository } from '../../login/login/protocols/login-protocols'

export const makeDisableController = (): Controller<any> => {
  const disableAccountRepository = new AccountPrismaRepository()
  const disableAccount = new DbDisableAccount(disableAccountRepository)
  const controller = new DisableAccountController(disableAccount)
  return makeLogDecorator(controller)
}
