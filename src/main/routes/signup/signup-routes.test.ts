import request from 'supertest'
import { prismaHelper } from '../../../infra/database/prisma/utils/prisma-client'
import app from '../../config/app'
describe('Signup Routes', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    prismaHelper.prismaClient.user.deleteMany({
      where: {
        email: {
          contains: 'any'
        }
      }
    })
  })
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect()
  })
  test('should return an account on success', async () => {
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
