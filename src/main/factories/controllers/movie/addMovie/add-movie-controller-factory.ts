import { AddMovieController } from '../../../../../presentation/controllers/movie/add-movie/add-movie'
import { makeLogDecorator } from '../../../decorators/log-factory'
import { makeDbMovie } from '../../../useCases/movie/add-movie/db-add-movie-factory'
import { Controller } from '../../login/signup/protocols/signup-protocols'
import { makeAddMovieValidation } from './add-movie-validation-factory'

export const makeMovieController = (): Controller<any> => {
  const controller = new AddMovieController(makeAddMovieValidation(), makeDbMovie())
  return makeLogDecorator(controller)
}
