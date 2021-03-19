import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { prismaHelper } from '../../../infra/database/prisma/utils/prisma-client'
import app from '../../config/app'
describe('Login Routes', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    await prismaHelper.prismaClient.user.deleteMany()
  })
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect()
  })

  describe('POST /account', () => {
    test('should disable admin if a account is an admin', async () => {
      await prismaHelper.prismaClient.user.create({
        data: {
          id: 'any_id',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'hashed_password',
          role: 'admin'
        }
      })

      const accessToken = sign({ id: 'any_id' }, 'secret_key')

      await request(app)
        .delete('/api/account')
        .set('authorization', accessToken)
        .send()

      const user = await prismaHelper.prismaClient.user.findFirst({
        where: {
          email: 'valid_email@email.com'
        }
      })
      expect(user.role).toBe('admin')
      expect(user.isActive).toBe(false)
    })
    test('should disable user if a account is an user', async () => {
      await prismaHelper.prismaClient.user.create({
        data: {
          id: 'any_id',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'hashed_password'
        }
      })
      const accessToken = sign({ id: 'any_id' }, 'secret_key')

      await request(app)
        .delete('/api/account')
        .set('authorization', accessToken)
        .send()

      const user = await prismaHelper.prismaClient.user.findFirst({
        where: {
          email: 'valid_email@email.com'
        }
      })
      expect(user.role).toBe('user')
      expect(user.isActive).toBe(false)
    })
  })
})
