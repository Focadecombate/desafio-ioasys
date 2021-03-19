import { makeLogDecorator } from './protocols/detail-protocols'
import { Controller } from '../../login/signup/protocols/signup-protocols'
import { makeVoteValidation } from './detail-validation-factory'
import { DetailMovieController } from '../../../../../presentation/controllers/movie/details/detail-movies-controller'
import { makeDbDetailMovie } from '../../../useCases/movie/detail-movie/db-detail-movie-factory'

export const makeDetailMovieController = (): Controller<any> => {
  const controller = new DetailMovieController(makeVoteValidation(), makeDbDetailMovie())
  return makeLogDecorator(controller)
}
