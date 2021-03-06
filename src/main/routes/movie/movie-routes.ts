import { Router } from 'express'
import { adaptMiddleware } from '../../adapters/express-middleware-adapter'
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeMovieController } from '../../factories/controllers/movie/addMovie/add-movie-controller-factory'
import { makeListMovieController } from '../../factories/controllers/movie/listMovie/list-movie-fatory'
import { makeVoteMovieController } from '../../factories/controllers/movie/voteMovie/vote-movie-fatory'
import { makeDetailMovieController } from '../../factories/controllers/movie/detail/detail-movie-fatory'
import { makeAuthMiddleware } from '../../factories/middleware/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const userAuth = adaptMiddleware(makeAuthMiddleware('user'))
  router.post('/movie', adminAuth, adaptRoute(makeMovieController()))
  router.get('/movie', adaptRoute(makeListMovieController()))
  router.post('/movie/vote/:title', userAuth, adaptRoute(makeVoteMovieController()))
  router.get('/movie/details/:title', adaptRoute(makeDetailMovieController()))
}
