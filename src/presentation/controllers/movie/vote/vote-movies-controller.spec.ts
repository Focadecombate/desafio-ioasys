import { badRequest, ok, serverError, Validation } from '../../login/signup/signup-protocols'
import { VoteMovieController } from './vote-movies-controller'
import { } from '../../../../domain/models/movie'
import { VoteMovie, VoteMovieModel, MovieModel, HttpRequest } from './vote-movie-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    title: 'any_title'
  },
  body: {
    grade: 4
  }
})
const makeFakeMovie = (): MovieModel => ({
  id: 'any_movie_id',
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor', id: 'any_actor_id', movieId: 'any_movie_id' }],
  votes: [{ grade: 4, id: 'any_vote_id', userId: 'any_user_id' }]
})
const makeValidatorStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeVoteMovieStub = (): VoteMovie => {
  class VoteMovieStub implements VoteMovie {
    async vote (data: VoteMovieModel): Promise<MovieModel> {
      return new Promise(resolve => resolve(makeFakeMovie()))
    }
  }
  return new VoteMovieStub()
}
const makeSut = () => {
  const validationStub = makeValidatorStub()
  const voteMovieStub = makeVoteMovieStub()
  return {
    sut: new VoteMovieController(validationStub, voteMovieStub),
    validationStub,
    voteMovieStub
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
    const { sut, voteMovieStub } = makeSut()
    const voteSpy = jest.spyOn(voteMovieStub, 'vote')
    await sut.handle(makeFakeRequest())
    expect(voteSpy).toHaveBeenCalledWith({ title: 'any_title', grade: 4 })
  })
  test('should return 500 if voteMovie throws', async () => {
    const { sut, voteMovieStub } = makeSut()

    jest.spyOn(voteMovieStub, 'vote')
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
