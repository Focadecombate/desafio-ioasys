import { MovieModel } from '../models/movie'

export interface VoteMovieModel {
  title: string,
  grade: number
}

export interface VoteMovie {
  vote(voteMovie: VoteMovieModel): Promise<MovieModel>
}
