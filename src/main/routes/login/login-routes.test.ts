import { hash } from 'bcrypt'
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

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password',
          passwordConfirmation: 'valid_password'
        })
        .expect(200)
    })
  })
  describe('POST /login', () => {
    test('should return 200 on login if is ok', async () => {
      const password = await hash('123', 12)
      await prismaHelper.prismaClient.user.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@email.com',
          password
        }
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: '123'
        })
        .expect(200)
    })
    test('should return 401 on login if password is wrong', async () => {
      const password = await hash('123', 12)
      await prismaHelper.prismaClient.user.create({
        data: {
          name: 'valid_name',
          email: 'valid_email@email.com',
          password
        }
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: '1234'
        })
        .expect(401)
    })
    test('should return 400 on login if account dont exists', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@email.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
