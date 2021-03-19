import { InvalidParamError } from '../../../presentation/errors'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'

export class OptionalEmailValidation implements Validation {
  private readonly emailValidator: EmailValidator
  private readonly fieldName: string
  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return
    }
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
