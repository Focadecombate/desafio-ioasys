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

  describe('Delete /account', () => {
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
  describe('Put /account', () => {
    test('should edit account if user is auth and new email is not on use', async () => {
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
        .put('/api/account')
        .set('authorization', accessToken)
        .send({
          email: 'valid_email2@email.com'
        })
        .expect(200)

      const user = await prismaHelper.prismaClient.user.findFirst({
        where: {
          email: 'valid_email2@email.com'
        }
      })
      expect(user).toBeTruthy()
    })
    test('should not edit account if user is auth and new email is in use', async () => {
      await prismaHelper.prismaClient.user.create({
        data: {
          id: 'any_id',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'hashed_password'
        }
      })
      await prismaHelper.prismaClient.user.create({
        data: {
          id: 'any_id2',
          name: 'valid_name',
          email: 'valid_email2@email.com',
          password: 'hashed_password'
        }
      })

      const accessToken = sign({ id: 'any_id' }, 'secret_key')

      await request(app)
        .put('/api/account')
        .set('authorization', accessToken)
        .send({
          email: 'valid_email2@email.com'
        })
        .expect(409)

      const user = await prismaHelper.prismaClient.user.findFirst({
        where: {
          id: 'any_id'
        }
      })
      expect(user.email).toBe('valid_email@email.com')
    })
  })
})
