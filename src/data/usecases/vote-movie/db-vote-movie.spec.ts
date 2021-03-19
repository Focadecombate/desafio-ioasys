import { DbVoteMovie } from './db-vote-movie'
import { VoteMovieRepository, MovieModel } from './db-vote-movie-protocols'
import { VoteMovieModel } from '../../../domain/usecases/vote-movie'

const makeFakeMovieData = (): MovieModel => ({
  id: 'any_movie_id',
  title: 'any_title',
  diretor: 'any_description',
  genre: 'any_genre',
  actors: [{ name: 'any_actor', id: 'any_actor_id', movieId: 'any_movie_id' }],
  votes: [{ userId: 'any_user_id', id: 'any_vote_id', grade: 4 }]
})
const makeVoteMovie = (): VoteMovieModel => ({
  title: 'any_title',
  grade: 4
})
const makeVoteMovieRepositoryStub = (): VoteMovieRepository => {
  class VoteMovieRepositoryStub implements VoteMovieRepository {
    vote (movieData: VoteMovieModel): Promise<MovieModel> {
      return new Promise(resolve => resolve(makeFakeMovieData()))
    }
  }
  return new VoteMovieRepositoryStub()
}
const makeSut = () => {
  const voteMovieRepositoryStub = makeVoteMovieRepositoryStub()
  return {
    sut: new DbVoteMovie(voteMovieRepositoryStub),
    voteMovieRepositoryStub
  }
}
describe('DbListMovie Usecase', () => {
  test('should call AddMovieRepository with correct values', async () => {
    const { sut, voteMovieRepositoryStub } = makeSut()
    const voteSpy = jest.spyOn(voteMovieRepositoryStub, 'vote')
    await sut.vote(makeVoteMovie())
    expect(voteSpy).toHaveBeenCalledWith(makeVoteMovie())
  })
  test('should throw if voteMovieRepository throws', () => {
    const { sut, voteMovieRepositoryStub } = makeSut()
    jest.spyOn(voteMovieRepositoryStub, 'vote')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.vote(makeVoteMovie())
    expect(promise).rejects.toThrow()
  })
})
