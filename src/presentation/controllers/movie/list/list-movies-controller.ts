import { Controller, HttpRequest, HttpResponse, ListMovies, ListMoviesModel } from './list-movie-controller-protocols'
import { badRequest, ok, serverError } from '../../login/signup/signup-protocols'
import { NotFoundError } from '../../../errors/notFound-error'

export class ListMovieController implements Controller<any> {
  constructor (
    private readonly listMovies: ListMovies
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const { actors, diretor, genre, title } = httpRequest.query as ListMoviesModel

      const movies = await this.listMovies.list({
        actors,
        diretor,
        genre,
        title
      })

      if (movies.length === 0) {
        return badRequest(new NotFoundError('movie'))
      }

      return ok(movies)
    } catch (error) {
      return serverError(error)
    }
  }
}
