import { HttpRequest, ListMovies } from './list-movie-controller-protocols'
import { ok, serverError } from '../../login/signup/signup-protocols'
import { ListMovieController } from './list-movies-controller'
import { ListMoviesModel } from '../../../../domain/usecases/list-movies'
import { MovieModel } from '../../../../domain/models/movie'

const makeFakeRequest = (): HttpRequest => ({
  query: {
    title: 'any_title',
    diretor: 'any_description',
    genre: 'any_genre',
    actors: [{ name: 'any_actor' }]
  }
})
const makeFakeMovie = (): MovieModel => ({
  id: 'any_movie_id',
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor', id: 'any_actor_id', movieId: 'any_movie_id' }]
})
const makeListMovieStub = (): ListMovies => {
  class ListMovieStub implements ListMovies {
    async list (data: ListMoviesModel): Promise<MovieModel[]> {
      return new Promise(resolve => resolve([makeFakeMovie(), makeFakeMovie()]))
    }
  }
  return new ListMovieStub()
}
const makeSut = () => {
  const listMovieStub = makeListMovieStub()
  return {
    sut: new ListMovieController(listMovieStub),
    listMovieStub
  }
}
describe('Add Movie Controller', () => {
  test('should call listMovie with correct values', async () => {
    const { sut, listMovieStub } = makeSut()
    const listSpy = jest.spyOn(listMovieStub, 'list')
    await sut.handle(makeFakeRequest())
    expect(listSpy).toHaveBeenCalledWith(makeFakeRequest().query)
  })
  test('should return 500 if listMovie throws', async () => {
    const { sut, listMovieStub } = makeSut()

    jest.spyOn(listMovieStub, 'list')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('')))
      )

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('')))
  })
  test('should return 200 and a list of movies on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok([makeFakeMovie(), makeFakeMovie()]))
  })
})
