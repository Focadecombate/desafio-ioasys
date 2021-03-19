import { DbVoteMovie } from '../../../../../data/usecases/vote-movie/db-vote-movie'
import { VoteMovie } from '../../../../../domain/usecases/vote-movie'
import { MoviePrismaRepository } from '../../../../../infra/database/prisma/movie-repository/movie'

export const makeDbVoteMovie = (): VoteMovie => {
  const moviePrismaRepository = new MoviePrismaRepository()
  return new DbVoteMovie(moviePrismaRepository)
}
