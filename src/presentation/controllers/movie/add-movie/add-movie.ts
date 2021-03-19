import { Controller, HttpRequest, HttpResponse, Validation, AddMovie } from './add-movie-controller-protocols'
import { badRequest, noContent, serverError } from '../../login/signup/signup-protocols'
import { AddMovieDTO } from './add-movie.dto'
export class AddMovieController implements Controller<any> {
  constructor (
    private readonly validation: Validation,
    private readonly addMovie: AddMovie
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { authorName, description, published, title } = httpRequest.body as AddMovieDTO
      await this.addMovie.add({
        authorName,
        description,
        published,
        title
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
