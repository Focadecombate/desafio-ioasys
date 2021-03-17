import { PrismaClient } from '@prisma/client'

export class PrismaHelper {
  readonly prismaClient: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prismaClient = prisma
  }

  async connect () {
    await this.prismaClient.$connect()
  }
}
