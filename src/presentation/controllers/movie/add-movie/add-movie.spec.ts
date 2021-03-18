import { HttpRequest, AddMovie, AddMovieModel, Validation } from './add-movie-controller-protocols'
import { badRequest } from '../../login/signup/signup-protocols'
import { AddMovieController } from './add-movie'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    description: 'any_description',
    published: false,
    authorName: 'any_author'
  }
})
const makeValidatorStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeAddMovieStub = (): AddMovie => {
  class AddMovieStub implements AddMovie {
    async add (data: AddMovieModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddMovieStub()
}
const makeSut = () => {
  const validationStub = makeValidatorStub()
  const addMovieStub = makeAddMovieStub()
  return {
    sut: new AddMovieController(validationStub, addMovieStub),
    validationStub,
    addMovieStub
  }
}
describe('Add Movie Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  test('should return 400 if validations fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('should call addMovie with correct values', async () => {
    const { sut, addMovieStub } = makeSut()
    const addSpy = jest.spyOn(addMovieStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})
