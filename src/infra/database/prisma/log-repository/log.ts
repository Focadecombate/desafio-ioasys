import { LogErrorRepository } from '../../../../data/protocols/db/log/log-error-repository'
import { prisma } from '../utils/prisma-client'

export class LogPrismaRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await prisma.error.create({ data: { stack } })
  }
}
