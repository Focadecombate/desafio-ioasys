import {
  RequiredFieldValidation,
  ValidationComposite
} from './protocols/detail-validation-protocol'
import { makeVoteValidation } from './detail-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')
describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeVoteValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('title')
    ])
  })
})
