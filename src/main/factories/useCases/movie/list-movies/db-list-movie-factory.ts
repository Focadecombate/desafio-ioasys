import { DbListMovie } from '../../../../../data/usecases/list-movie/db-list-movie'
import { ListMovies } from '../../../../../domain/usecases/list-movies'
import { MoviePrismaRepository } from '../../../../../infra/database/prisma/movie-repository/movie'

export const makeDbListMovie = (): ListMovies => {
  const moviePrismaRepository = new MoviePrismaRepository()
  return new DbListMovie(moviePrismaRepository)
}
