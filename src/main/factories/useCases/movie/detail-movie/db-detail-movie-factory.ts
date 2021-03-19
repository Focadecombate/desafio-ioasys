import { DbDetailMovie } from '../../../../../data/usecases/detail-movie/db-detail-movie'
import { DetailMovie } from '../../../../../domain/usecases/detail-movie'
import { MoviePrismaRepository } from '../../../../../infra/database/prisma/movie-repository/movie'

export const makeDbDetailMovie = (): DetailMovie => {
  const moviePrismaRepository = new MoviePrismaRepository()
  return new DbDetailMovie(moviePrismaRepository)
}
