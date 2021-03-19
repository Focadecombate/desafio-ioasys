import { InvalidParamError } from '../../../presentation/errors'
import { Validation } from '../../../presentation/protocols/validation'

interface Range {
  min: number,
  max: number
}

export class InBetweenFieldValidation implements Validation {
  private readonly fieldName: string
  private readonly range: Range
  constructor (fieldName: string, range: Range) {
    this.fieldName = fieldName
    this.range = range
  }

  validate (input: any): Error {
    if (input[this.fieldName] < this.range.min || input[this.fieldName] > this.range.max) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
