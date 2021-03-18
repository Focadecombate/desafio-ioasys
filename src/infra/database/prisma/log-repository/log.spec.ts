import { prismaHelper } from '../utils/prisma-client'
import { LogPrismaRepository } from './log'

describe('Log Prisma Repository', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    await prismaHelper.prismaClient.error.deleteMany({})
  })
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect()
  })
  test('should create an error log on success', async () => {
    const sut = new LogPrismaRepository()
    await sut.logError('any_stack')
    const error = await prismaHelper.prismaClient.error.findFirst({
      where: { stack: 'any_stack' }
    })
    const count = await prismaHelper.prismaClient.error.count()

    expect(error.stack).toEqual('any_stack')
    expect(count).toEqual(1)
  })
})
