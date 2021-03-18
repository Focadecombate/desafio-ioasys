import {
  CompareFieldValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidator
} from './protocols/signup-validation-protocol'
import { makeSignupValidation } from './signup-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorSub()
}
jest.mock('../../../../presentation/helper/validators/validation-composite')
describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignupValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldValidation('password', 'passwordConfirmation'),
      new EmailValidation('email', makeEmailValidator())
    ])
  })
})
