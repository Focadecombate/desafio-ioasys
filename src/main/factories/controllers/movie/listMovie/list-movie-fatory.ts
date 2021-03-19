import { ListMovieController } from '../../../../../presentation/controllers/movie/list/list-movies-controller'
import { makeLogDecorator } from '../../../decorators/log-factory'
import { makeDbListMovie } from '../../../useCases/movie/list-movies/db-list-movie-factory'
import { Controller } from '../../login/signup/protocols/signup-protocols'

export const makeListMovieController = (): Controller<any> => {
  const controller = new ListMovieController(makeDbListMovie())
  return makeLogDecorator(controller)
}
