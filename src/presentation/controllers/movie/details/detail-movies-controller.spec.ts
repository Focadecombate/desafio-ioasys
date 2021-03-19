import { badRequest, ok, serverError, Validation } from '../../login/signup/signup-protocols'
import { DetailMovieController } from './detail-movies-controller'
import { DetailiedMovieModel } from '../../../../domain/models/movie'
import { DetailMovie, DetailMovieModel, HttpRequest } from './detail-movie-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    title: 'any_title'
  }
})
const makeFakeMovie = (): DetailiedMovieModel => ({
  id: 'any_movie_id',
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor', id: 'any_actor_id', movieId: 'any_movie_id' }],
  votes: [{ grade: 4, id: 'any_vote_id', userId: 'any_user_id' }],
  averageGrade: 4
})
const makeValidatorStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeDetailMovieStub = (): DetailMovie => {
  class DetailMovieStub implements DetailMovie {
    async detail (data: DetailMovieModel): Promise<DetailiedMovieModel> {
      return new Promise(resolve => resolve(makeFakeMovie()))
    }
  }
  return new DetailMovieStub()
}
const makeSut = () => {
  const validationStub = makeValidatorStub()
  const detailMovieStub = makeDetailMovieStub()
  return {
    sut: new DetailMovieController(validationStub, detailMovieStub),
    validationStub,
    detailMovieStub
  }
}
describe('Add Movie Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    const { body, params } = makeFakeRequest()
    expect(validateSpy).toHaveBeenCalledWith({ ...body, ...params })
  })
  test('should return 400 if validations fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('should call voteMovie with correct values', async () => {
    const { sut, detailMovieStub } = makeSut()
    const voteSpy = jest.spyOn(detailMovieStub, 'detail')
    await sut.handle(makeFakeRequest())
    expect(voteSpy).toHaveBeenCalledWith({ title: 'any_title' })
  })
  test('should return 500 if voteMovie throws', async () => {
    const { sut, detailMovieStub } = makeSut()

    jest.spyOn(detailMovieStub, 'detail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error('')))
      )

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error('')))
  })
  test('should return 200 and a movie on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeMovie()))
  })
})
