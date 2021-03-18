import { LogPrismaRepository } from '../../../infra/database/prisma/log-repository/log'
import { Controller } from '../../../presentation/protocols/controller'
import { LogControllerDecorator } from '../../decorators/log'

export const makeLogDecorator = (controller: Controller<any>) => {
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(controller, logPrismaRepository)
}
