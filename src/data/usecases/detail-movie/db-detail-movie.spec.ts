import { DbDetailMovie } from './db-detail-movie'
import { DetailMovieRepository, DetailiedMovieModel, DetailMovieModel } from './db-detail-movie-protocols'

const makeFakeMovieData = (): DetailiedMovieModel => ({
  id: 'any_movie_id',
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor', id: 'any_actor_id', movieId: 'any_movie_id' }],
  votes: [{ userId: 'any_user_id', id: 'any_vote_id', grade: 4 }],
  averageGrade: 4
})
const makeDetailMovie = (): DetailMovieModel => ({
  title: 'any_title'
})
const makeDetailMovieRepositoryStub = (): DetailMovieRepository => {
  class DetailMovieRepositoryStub implements DetailMovieRepository {
    detail (movieData: DetailMovieModel): Promise<DetailiedMovieModel> {
      return new Promise(resolve => resolve(makeFakeMovieData()))
    }
  }
  return new DetailMovieRepositoryStub()
}
const makeSut = () => {
  const detailMovieRepositoryStub = makeDetailMovieRepositoryStub()
  return {
    sut: new DbDetailMovie(detailMovieRepositoryStub),
    detailMovieRepositoryStub
  }
}
describe('DbListMovie Usecase', () => {
  test('should call AddMovieRepository with correct values', async () => {
    const { sut, detailMovieRepositoryStub } = makeSut()
    const detailSpy = jest.spyOn(detailMovieRepositoryStub, 'detail')
    await sut.detail(makeDetailMovie())
    expect(detailSpy).toHaveBeenCalledWith(makeDetailMovie())
  })
  test('should throw if voteMovieRepository throws', () => {
    const { sut, detailMovieRepositoryStub } = makeSut()
    jest.spyOn(detailMovieRepositoryStub, 'detail')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.detail(makeDetailMovie())
    expect(promise).rejects.toThrow()
  })
})
