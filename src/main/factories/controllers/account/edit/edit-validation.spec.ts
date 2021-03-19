import { EmailValidatorAdapter, OptionalCompareFieldValidation, OptionalEmailValidation, ValidationComposite } from '../../login/login/protocols/login-validation-protocol'
import { makeEditValidation } from './edit-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')
describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeEditValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new OptionalEmailValidation('email', new EmailValidatorAdapter()),
      new OptionalCompareFieldValidation('password', 'passwordConfirmation')
    ])
  })
})
