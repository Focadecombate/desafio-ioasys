import { RequiredFieldValidation, ValidationComposite } from '../../login/login/protocols/login-validation-protocol'
import { makeAddMovieValidation } from './add-movie-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')
describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddMovieValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('title'),
      new RequiredFieldValidation('actors'),
      new RequiredFieldValidation('diretor'),
      new RequiredFieldValidation('genre')
    ])
  })
})
