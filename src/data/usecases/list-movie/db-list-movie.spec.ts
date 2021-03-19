import { DbListMovie } from './db-list-movie'
import { ListMoviesModel } from '../../../domain/usecases/list-movies'
import { MovieModel } from '../../../domain/models/movie'
import { ListMovieRepository } from '../../protocols/db/movie/list-movie-repository'

const makeFakeRequest = (): ListMoviesModel => ({
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: ['any_actor_name']
})
const makeFakeMovieData = (): MovieModel => ({
  id: 'any_movie_id',
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor', id: 'any_actor_id', movieId: 'any_movie_id' }]
})
const makeListMovieRepositoryStub = (): ListMovieRepository => {
  class ListMovieRepositoryStub implements ListMovieRepository {
    list (movieData: ListMoviesModel): Promise<MovieModel[]> {
      return new Promise(resolve => resolve([makeFakeMovieData()]))
    }
  }
  return new ListMovieRepositoryStub()
}
const makeSut = () => {
  const listMovieRepositoryStub = makeListMovieRepositoryStub()
  return {
    sut: new DbListMovie(listMovieRepositoryStub),
    listMovieRepositoryStub
  }
}
describe('DbListMovie Usecase', () => {
  test('should call AddMovieRepository with correct values', async () => {
    const { sut, listMovieRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listMovieRepositoryStub, 'list')
    await sut.list(makeFakeRequest())
    expect(listSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
  test('should throw if listMovieRepository throws', () => {
    const { sut, listMovieRepositoryStub } = makeSut()
    jest.spyOn(listMovieRepositoryStub, 'list')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.list(makeFakeRequest())
    expect(promise).rejects.toThrow()
  })
})
