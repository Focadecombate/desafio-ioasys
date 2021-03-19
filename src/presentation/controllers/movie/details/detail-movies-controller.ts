import { Controller, HttpRequest, HttpResponse } from './detail-movie-controller-protocols'
import { badRequest, ok, serverError, Validation } from '../../login/signup/signup-protocols'
import { NotFoundError } from '../../../errors/notFound-error'
import { DetailMovie } from '../../../../domain/usecases/detail-movie'

export class DetailMovieController implements Controller<any> {
  constructor (
    private readonly validation: Validation,
    private readonly detailMovie: DetailMovie
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const { title }: { title: string } = httpRequest.params

      const error = this.validation.validate({ title })
      if (error) {
        return badRequest(error)
      }

      const movies = await this.detailMovie.detail({ title })

      if (!movies) {
        return badRequest(new NotFoundError('movie'))
      }

      return ok(movies)
    } catch (error) {
      return serverError(error)
    }
  }
}
