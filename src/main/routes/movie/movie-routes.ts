import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeMovieController } from '../../factories/controllers/movie/addMovie/add-movie-controller-factory'

export default (router: Router): void => {
  router.post('/movie', adaptRoute(makeMovieController()))
}
