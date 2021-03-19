import { VoteMovieModel } from '../../../domain/usecases/vote-movie'
import { VoteMovieRepository, VoteMovie, MovieModel } from './db-vote-movie-protocols'

export class DbVoteMovie implements VoteMovie {
  constructor (private readonly voteMovieRepository: VoteMovieRepository) { }
  async vote (data: VoteMovieModel): Promise<MovieModel> {
    const movievote = await this.voteMovieRepository.vote(data)
    return new Promise(resolve => resolve(movievote))
  }
}
