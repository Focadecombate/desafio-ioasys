import { AddMovieRepository } from '../../../../data/protocols/db/movie/add-movie-repository'
import { DetailMovieModel, DetailMovieRepository } from '../../../../data/usecases/detail-movie/db-detail-movie-protocols'
import { DetailiedMovieModel, ListMovieRepository, ListMoviesModel, MovieModel } from '../../../../data/usecases/list-movie/db-list-movie-protocols'
import { VoteMovieModel, VoteMovieRepository } from '../../../../data/usecases/vote-movie/db-vote-movie-protocols'
import { AddMovieModel } from '../../../../domain/usecases/add-movie'
import { prisma } from '../utils/prisma-client'

export class MoviePrismaRepository implements AddMovieRepository, ListMovieRepository, VoteMovieRepository, DetailMovieRepository {
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
                  in: actors
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

  async vote (movie: VoteMovieModel): Promise<MovieModel> {
    const { grade, title } = movie
    const updatedMovie = await prisma.movie.update({
      data: {
        votes: {
          create: {
            grade
          }
        }
      },
      where: {
        title
      },
      include: {
        actors: true,
        votes: true
      }
    })
    return updatedMovie
  }

  async detail (movie: DetailMovieModel): Promise<DetailiedMovieModel> {
    const { title } = movie
    const detailedMovie = await prisma.movie.findUnique({
      where: { title },
      include: {
        actors: true,
        votes: true
      }
    })
    const { votes } = detailedMovie

    const averageGrade = votes.reduce((prev, curr) => prev += curr.grade, 0) / votes.length

    return { ...detailedMovie, averageGrade }
  }
}
