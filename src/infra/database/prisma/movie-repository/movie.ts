import { AddMovieRepository } from '../../../../data/protocols/db/movie/add-movie-repository'
import { ListMovieRepository, ListMoviesModel, MovieModel } from '../../../../data/usecases/list-movie/db-list-movie-protocols'
import { AddMovieModel } from '../../../../domain/usecases/add-movie'
import { prisma } from '../utils/prisma-client'

export class MoviePrismaRepository implements AddMovieRepository, ListMovieRepository {
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

  async list (movie: ListMoviesModel): Promise<MovieModel[]> {
    const { actors, diretor, genre, title } = movie

    const actorNames = actors?.map(item => item.name) as string[]

    const listMovies = await prisma.movie
      .findMany({
        where: {
          OR: {
            genre,
            diretor,
            title,
            actors: {
              some: {
                name: {
                  in: actorNames
                }
              }
            }
          }
        },
        include: {
          actors: true
        }
      })
    return listMovies
  }
}
