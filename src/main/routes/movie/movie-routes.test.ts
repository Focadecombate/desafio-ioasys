import request from 'supertest'
import { prismaHelper } from '../../../infra/database/prisma/utils/prisma-client'
import app from '../../config/app'
describe('Movie Routes', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    await prismaHelper.prismaClient.user.deleteMany()
  })
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect()
  })

  describe('POST /movie', () => {
    test('should return 204 on movie', async () => {
      await request(app)
        .post('/api/movie')
        .send({
          title: 'any_title',
          genre: 'any_genre',
          actors: [{ name: 'any_actor_name' }],
          diretor: 'any_director'
        })
        .expect(204)
    })
  })
})
