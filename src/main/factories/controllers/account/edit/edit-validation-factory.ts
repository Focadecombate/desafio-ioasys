import { EmailValidatorAdapter, OptionalCompareFieldValidation, OptionalEmailValidation, ValidationComposite } from '../../login/login/protocols/login-validation-protocol'

export const makeEditValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new OptionalEmailValidation('email', new EmailValidatorAdapter()),
    new OptionalCompareFieldValidation('password', 'passwordConfirmation')
  ])
}
