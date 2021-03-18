
import { SignupDTO } from '../../presentation/controllers/signup/signup.dto'
import { CompareFieldValidation } from '../../presentation/helper/validators/compare-field/compare-field-validation'
import { EmailValidation } from '../../presentation/helper/validators/email-validation/email-validation'
import { RequiredFieldValidation } from '../../presentation/helper/validators/required-field/required-field-validation'
import { Validation } from '../../presentation/protocols/validation'
import { ValidationComposite } from '../../presentation/helper/validators/validation-composite'
import { EmailValidatorAdapter } from '../../util/email-validator-adapter'

export const makeSignupValidation = (): ValidationComposite => {
  const requiredFields: (keyof SignupDTO)[] = ['name', 'email', 'password', 'passwordConfirmation']

  const validation: Validation[] = requiredFields.map(item => new RequiredFieldValidation(item))

  validation.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validation.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validation)
}
