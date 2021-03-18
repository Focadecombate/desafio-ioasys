import { Validation } from '../../../protocols'
import { AddMovieController } from './add-movie'
import { HttpRequest } from './add-movie-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    description: 'any_description',
    published: false,
    authorName: 'any_author'
  }
})
const makeValidatorStub = () => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeSut = () => {
  const validationStub = makeValidatorStub()
  return {
    sut: new AddMovieController(validationStub),
    validationStub
  }
}
describe('Add Movie Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})
