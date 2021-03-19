import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { prismaHelper } from '../../../infra/database/prisma/utils/prisma-client'
import app from '../../config/app'
describe('Movie Routes', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    await prismaHelper.prismaClient.user.deleteMany({})
    await prismaHelper.prismaClient.actors.deleteMany({})
    await prismaHelper.prismaClient.movie.deleteMany({})
  })
  afterAll(async () => {
    await prismaHelper.prismaClient.$disconnect()
  })

  describe('POST /movie', () => {
    test('should return 403 on movie', async () => {
      await request(app)
        .post('/api/movie')
        .send({
          title: 'any_title',
          genre: 'any_genre',
          actors: [{ name: 'any_actor_name' }],
          diretor: 'any_director'
        })
        .expect(403)
    })
    test('should return 204 on movie if user is an admin', async () => {
      const password = await hash('123', 12)
      await prismaHelper.prismaClient.user.create({
        data: {
          id: 'any_id',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password,
          role: 'admin'
        }
      })

      const accessToken = sign({ id: 'any_id' }, 'secret_key')

      await request(app)
        .post('/api/movie')
        .set('authorization', accessToken)
        .send({
          title: 'any_title',
          genre: 'any_genre',
          actors: [{ name: 'any_actor_name' }],
          diretor: 'any_director'
        })
        .expect(204)
    })
  })
  describe('GET /movie', () => {
    test('should return 200 and a movie on success', async () => {
      await prismaHelper.prismaClient.movie.create({
        data: {
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title',
          actors: {
            create: {
              name: 'any_actor_name'
            }
          }
        },
        include: {
          actors: true
        }
      })
      const { body } = await request(app)
        .get('/api/movie')
        .query({ title: 'any_title' })
        .expect(200)

      expect(body).toBeTruthy()
    })
    test('should return 400 if there is no movie', async () => {
      await request(app)
        .get('/api/movie')
        .query({ title: 'any_title' })
        .expect(400)
    })
  })
})
