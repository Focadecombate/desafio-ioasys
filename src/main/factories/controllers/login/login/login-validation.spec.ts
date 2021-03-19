import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidator
} from './protocols/login-validation-protocol'
import { makeLoginValidation } from './login-validation-factory'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorSub()
}

jest.mock('../../../../../validation/validators/validation-composite')
describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidation('email', makeEmailValidator())
    ])
  })
})
