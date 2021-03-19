import { MoviePrismaRepository } from './movie'
import { prismaHelper } from '../utils/prisma-client'
describe('', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })
  beforeEach(async () => {
    await prismaHelper.prismaClient.actors.deleteMany({})
    await prismaHelper.prismaClient.vote.deleteMany({})
    await prismaHelper.prismaClient.movie.deleteMany({})
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
  describe('List()', () => {
    test('should list an movie by director', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director2',
          genre: 'any_genre',
          title: 'any_title2'
        }
      })
      const listMovies = await sut.list({
        diretor: 'any_director'
      })
      expect(listMovies).toHaveLength(1)
    })
    test('should list an movie by genre', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre2',
          title: 'any_title2'
        }
      })
      const listMovies = await sut.list({
        genre: 'any_genre'
      })
      expect(listMovies).toHaveLength(1)
    })
    test('should list an movie by actor name', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name2'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title2'
        }
      })
      const listMovies = await sut.list({
        actors: ['any_actor_name']
      })
      expect(listMovies).toHaveLength(1)
    })
    test('should list movies by actor name with more than one actor name', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name2'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title2'
        }
      })
      const listMovies = await sut.list({
        actors: ['any_actor_name', 'any_actor_name2']
      })
      expect(listMovies).toHaveLength(2)
    })
    test('should list all movies', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title2'
        }
      })
      const listMovies = await sut.list({})
      expect(listMovies).toHaveLength(2)
    })
    test('should list an movie by title', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title2'
        }
      })
      const listMovies = await sut.list({
        title: 'any_title'
      })
      expect(listMovies).toHaveLength(1)
    })
  })
  describe('Vote()', () => {
    test('should vote in an movie on success', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      const movie = await sut.vote({
        grade: 4,
        title: 'any_title'
      })
      expect(movie.votes).toBeTruthy()
      expect(movie.votes).toHaveLength(1)
    })
  })
  describe('Detail()', () => {
    test('should return an detailed movie on success', async () => {
      const sut = new MoviePrismaRepository()
      await prismaHelper.prismaClient.movie.create({
        data: {
          actors: {
            create: {
              name: 'any_actor_name'
            }
          },
          diretor: 'any_director',
          genre: 'any_genre',
          title: 'any_title'
        }
      })
      await sut.vote({
        grade: 4,
        title: 'any_title'
      })
      await sut.vote({
        grade: 3,
        title: 'any_title'
      })
      const detail = await sut.detail({
        title: 'any_title'
      })
      expect(detail).toBeTruthy()
      expect(detail.averageGrade).toBe(3.5)
    })
  })
})
