import { AddMovieModel, AddMovieRepository } from './db-add-movie-protocols'
import { DbAddMovie } from './db-add-movie'

const makeFakeMovieData = (): AddMovieModel => ({
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor' }]
})
const makeMovieRepositoryStub = (): AddMovieRepository => {
  class AddMovieRepositoryStub implements AddMovieRepository {
    add (movieData: AddMovieModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddMovieRepositoryStub()
}
const makeSut = () => {
  const addMovieRepositoryStub = makeMovieRepositoryStub()
  return {
    sut: new DbAddMovie(addMovieRepositoryStub),
    addMovieRepositoryStub
  }
}
describe('DbAddMovie Usecase', () => {
  test('should call AddMovieRepository with correct values', async () => {
    const { sut, addMovieRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMovieRepositoryStub, 'add')
    await sut.add(makeFakeMovieData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeMovieData())
  })
  test('should throw if AddMovieRepository throws', () => {
    const { sut, addMovieRepositoryStub } = makeSut()
    jest.spyOn(addMovieRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeMovieData())
    expect(promise).rejects.toThrow()
  })
})
