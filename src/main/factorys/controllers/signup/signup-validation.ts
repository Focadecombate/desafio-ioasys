
import {
  SignupDTO,
  CompareFieldValidation,
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
  EmailValidatorAdapter
} from './protocols/signup-validation-protocol'

export const makeSignupValidation = (): ValidationComposite => {
  const requiredFields: (keyof SignupDTO)[] = ['name', 'email', 'password', 'passwordConfirmation']

  const validation: Validation[] = requiredFields.map(item => new RequiredFieldValidation(item))

  validation.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
