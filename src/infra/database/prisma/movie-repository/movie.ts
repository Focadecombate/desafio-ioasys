import { AddMovieRepository } from '../../../../data/protocols/db/movie/add-movie-repository'
import { AddMovieModel } from '../../../../domain/usecases/add-movie'
import { prisma } from '../utils/prisma-client'

export class MoviePrismaRepository implements AddMovieRepository {
  async add (movie: AddMovieModel): Promise<null> {
    const { actors, diretor, genre, title } = movie
    await prisma.movie.create({
      data: {
        title,
        diretor,
        genre,
        actors: {
          create: actors
        }
      },
      include: {
        actors: true
      }
    })
    return null
  }
}
