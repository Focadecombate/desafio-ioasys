import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidator
} from './login-validation-protocol'
import { makeLoginValidation } from './login-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorSub()
}

jest.mock('../../../presentation/helper/validators/validation-composite')
describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidation('email', makeEmailValidator())
    ])
  })
})
