import { AccountPrismaRepository } from './account'
import { prismaHelper } from '../utils/prisma-client'
describe('', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    await prismaHelper.prismaClient.user.deleteMany({})
  })
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect()
  })
  test('should return an account on add success', async () => {
    const sut = new AccountPrismaRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
  test('should return an account on loadByEmail success', async () => {
    const sut = new AccountPrismaRepository()
    await sut.add({
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
  test('should return null if loadByEmail fails', async () => {
    const sut = new AccountPrismaRepository()

    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeFalsy()
  })
})
