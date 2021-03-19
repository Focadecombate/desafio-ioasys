import {
  InBetweenFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from './protocols/vote-validation-protocol'
import { makeVoteValidation } from './vote-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')
describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeVoteValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('title'),
      new RequiredFieldValidation('grade'),
      new InBetweenFieldValidation('grade', { min: 0, max: 4 })
    ])
  })
})
