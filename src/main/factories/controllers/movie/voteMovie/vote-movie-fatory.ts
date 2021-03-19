import { VoteMovieController, makeLogDecorator } from './protocols/vote-protocols'
import { Controller } from '../../login/signup/protocols/signup-protocols'
import { makeVoteValidation } from './vote-validation-factory'
import { makeDbVoteMovie } from '../../../useCases/movie/vote-movie/db-vote-movie-factory'

export const makeVoteMovieController = (): Controller<any> => {
  const controller = new VoteMovieController(makeVoteValidation(), makeDbVoteMovie())
  return makeLogDecorator(controller)
}
