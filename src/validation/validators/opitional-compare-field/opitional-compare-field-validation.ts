import { InvalidParamError } from '../../../presentation/errors'
import { Validation } from '../../../presentation/protocols/validation'

export class OptionalCompareFieldValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string
  constructor (fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): Error {
    if (!input[this.fieldName] && !input[this.fieldToCompareName]) {
      return
    }
    if (!input[this.fieldName] || !input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
