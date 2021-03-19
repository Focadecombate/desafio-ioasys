import { DbAddMovie } from '../../../../../data/usecases/add-movie/db-add-movie'
import { AddMovie } from '../../../../../domain/usecases/add-movie'
import { MoviePrismaRepository } from '../../../../../infra/database/prisma/movie-repository/movie'

export const makeDbMovie = (): AddMovie => {
  const moviePrismaRepository = new MoviePrismaRepository()
  return new DbAddMovie(moviePrismaRepository)
}
