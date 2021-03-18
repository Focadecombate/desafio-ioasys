
import {
  LoginDTO,
  EmailValidation,
  RequiredFieldValidation,
  Validation,
  ValidationComposite,
  EmailValidatorAdapter
} from './login-validation-protocol'

export const makeLoginValidation = (): ValidationComposite => {
  const requiredFields: (keyof LoginDTO)[] = ['email', 'password']

  const validation: Validation[] = requiredFields.map(item => new RequiredFieldValidation(item))

  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
