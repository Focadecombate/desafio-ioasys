import { Router } from 'express'
import { adaptMiddleware } from '../../adapters/express-middleware-adapter'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeMovieController } from '../../factories/controllers/movie/addMovie/add-movie-controller-factory'
import { makeListMovieController } from '../../factories/controllers/movie/listMovie/list-movie-fatory'
import { makeAuthMiddleware } from '../../factories/middleware/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/movie', adminAuth, adaptRoute(makeMovieController()))
  router.get('/movie', adaptRoute(makeListMovieController()))
}
