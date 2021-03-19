import { Controller, HttpRequest, HttpResponse } from './vote-movie-controller-protocols'
import { badRequest, ok, serverError, Validation } from '../../login/signup/signup-protocols'
import { NotFoundError } from '../../../errors/notFound-error'
import { VoteMovie } from '../../../../domain/usecases/vote-movie'

export class VoteMovieController implements Controller<any> {
  constructor (
    private readonly validation: Validation,
    private readonly voteMovies: VoteMovie
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const { title }: { title: string } = httpRequest.params
      const { grade }: { grade: number } = httpRequest.body

      const error = this.validation.validate({ title, grade })
      if (error) {
        return badRequest(error)
      }

      const movies = await this.voteMovies.vote({ title, grade })

      if (!movies) {
        return badRequest(new NotFoundError('movie'))
      }

      return ok(movies)
    } catch (error) {
      return serverError(error)
    }
  }
}
