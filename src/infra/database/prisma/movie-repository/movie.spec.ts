import { MoviePrismaRepository } from './movie'
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
  describe('Add()', () => {
    test('should add an movie on success', async () => {
      const sut = new MoviePrismaRepository()
      await sut.add({
        actors: [{ name: 'any_actor_name' }],
        diretor: 'any_director',
        genre: 'any_genre',
        title: 'any_title'
      })
      const movie = prismaHelper.prismaClient.movie.findFirst({
        where: {
          title: 'any_title'
        }
      })
      expect(movie).toBeTruthy()
    })
  })
})
