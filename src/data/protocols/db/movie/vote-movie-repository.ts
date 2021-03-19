import { MovieModel } from '../../../../domain/models/movie'
import { VoteMovieModel } from '../../../../domain/usecases/vote-movie'

export interface VoteMovieRepository {
  vote(movieData: VoteMovieModel): Promise<MovieModel>
}
